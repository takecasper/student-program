'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
// import { standardQuestions } from '../constants/questions';
import Image from 'next/image';
import QuestionDrawer from './QuestionDrawer';

const SnapshotForm = () => {
  const [selectedTest, setSelectedTest] = useState<'CASPER' | 'SNAPSHOT'>('CASPER');
  const [editingTest, setEditingTest] = useState<number | null>(null);
  const [testNames, setTestNames] = useState(['Test 1', 'Test 2']);
  const [numberOfQuestions, setNumberOfQuestions] = useState('3');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [introVideo, setIntroVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTestClick = (index: number) => {
    setEditingTest(index);
  };

  const handleNameChange = (index: number, newName: string) => {
    const newTestNames = [...testNames];
    newTestNames[index] = newName;
    setTestNames(newTestNames);
  };

  const handleNameBlur = () => {
    setEditingTest(null);
  };

  const handleAddTest = () => {
    const newTestNumber = testNames.length + 1;
    setTestNames([...testNames, `Test ${newTestNumber}`]);
    setEditingTest(testNames.length);
  };

  const handleQuestionClick = (index: number) => {
    setSelectedQuestionIndex(index);
    setIsDrawerOpen(true);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIntroVideo(file);
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
    }
  };

  const handleVideoClick = () => {
    fileInputRef.current?.click();
  };

  const renderStandardQuestions = () => {
    const questions = [];
    for (let i = 0; i < parseInt(numberOfQuestions); i++) {
      questions.push(
        <div
          key={i}
          className="flex gap-2 items-center justify-center border-2 border-dashed rounded-[10px] w-[400px] cursor-pointer hover:bg-gray-50"
          onClick={() => handleQuestionClick(i)}
        >
          <Button variant="link">
            <Image src="/svgs/plus.svg" alt="plus" width={16} height={16} />
          </Button>
        </div>,
      );
    }
    return questions;
  };

  return (
    <div className="w-full h-screen">
      <QuestionDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        numberOfQuestions={parseInt(numberOfQuestions)}
      />
      <div className="space-y-4 pb-4  pl-4">
        <h1 className="text-[16px] font-semibold">PROGRAM 1 SETTINGS</h1>
        <div className="flex gap-2">
          <Button
            variant={selectedTest === 'CASPER' ? 'default' : 'outline'}
            className={cn(
              'h-[30px] hover:bg-[#364699] cursor-pointer hover:text-white rounded-full px-6',
              {
                'bg-[#364699] text-white': selectedTest === 'CASPER',
              },
            )}
            onClick={() => setSelectedTest('CASPER')}
          >
            CASPER
          </Button>
          <Button
            variant={selectedTest === 'SNAPSHOT' ? 'default' : 'outline'}
            className={cn(
              'h-[30px] hover:bg-[#364699] cursor-pointer hover:text-white rounded-full px-6',
              {
                'bg-[#364699] text-white': selectedTest === 'SNAPSHOT',
              },
            )}
            onClick={() => setSelectedTest('SNAPSHOT')}
          >
            SNAPSHOT
          </Button>
        </div>
        <div className="flex w-full ">
          {/* left content */}
          <div className="w-[350px] min-w-[350px] py-4 pr-6 border-r border-gray-200">
            <div className="font-medium text-[#333333DE] text-sm">
              <h1 className="text-[16px] font-semibold">Test Configuration</h1>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {testNames.map((name, index) => (
                    <button
                      key={index}
                      className="text-xs text-white bg-[#364699] rounded-full px-4 py-1 w-[80px]"
                      onClick={() => handleTestClick(index)}
                    >
                      {name}
                    </button>
                  ))}
                  <button
                    className="text-xs text-gray-500 rounded-full px-4 py-1 border border-dashed border-gray-300 w-[80px]"
                    onClick={handleAddTest}
                  >
                    +
                  </button>
                </div>
                {editingTest !== null && (
                  <input
                    type="text"
                    value={testNames[editingTest]}
                    onChange={e => handleNameChange(editingTest, e.target.value)}
                    onBlur={handleNameBlur}
                    className="text-xs border border-gray-300 px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                    autoFocus
                  />
                )}
              </div>
              <div className="flex items-center justify-between space-y-2 pt-4">
                <Label className="text-sm text-[#333333DE] font-normal">Number of Questions</Label>
                <Select defaultValue="3" onValueChange={value => setNumberOfQuestions(value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-10">
                <h1>Time and Flow</h1>
              </div>
              <div className="flex items-center justify-between space-y-2 pt-4">
                <Label className="text-sm text-[#333333DE] font-normal">
                  Thinking Time per Question
                </Label>
                <Select defaultValue="0">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0:00 min</SelectItem>
                    <SelectItem value="30">0:30 min</SelectItem>
                    <SelectItem value="60">1:00 min</SelectItem>
                    <SelectItem value="90">1:30 min</SelectItem>
                    <SelectItem value="120">2:00 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Response Time */}
              <div className="flex items-center justify-between space-y-2 pt-4">
                <Label className="text-sm text-[#333333DE] font-normal">
                  Response Time per Question
                </Label>
                <Select defaultValue="120">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">1:00 min</SelectItem>
                    <SelectItem value="120">2:00 min</SelectItem>
                    <SelectItem value="180">3:00 min</SelectItem>
                    <SelectItem value="240">4:00 min</SelectItem>
                    <SelectItem value="300">5:00 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Time Between Questions */}
              <div className="flex items-center justify-between space-y-2 pt-4">
                <Label className="text-sm text-[#333333DE] font-normal">
                  Time Between Questions
                </Label>
                <Select defaultValue="15">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 sec</SelectItem>
                    <SelectItem value="30">30 sec</SelectItem>
                    <SelectItem value="45">45 sec</SelectItem>
                    <SelectItem value="60">60 sec</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between space-y-2 pt-4">
                <Label className="text-sm text-[#333333DE] font-normal">Break Options</Label>
                <Select defaultValue="15">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 sec</SelectItem>
                    <SelectItem value="30">30 sec</SelectItem>
                    <SelectItem value="45">45 sec</SelectItem>
                    <SelectItem value="60">60 sec</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* center content */}
          <div className="flex-1 p-4 min-w-0">
            <div className="flex justify-end">
              <Button variant="default" className="rounded-full bg-[#364699]">
                Preview
              </Button>
            </div>
            {selectedTest === 'SNAPSHOT' ? (
              <div className="flex flex-col items-start gap-10 space-y-6">
                <div className="flex flex-col gap-2  flex-1">
                  <h1>Intro</h1>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleVideoUpload}
                    accept="video/*"
                    className="hidden"
                  />
                  {videoPreview ? (
                    <div className="relative w-[400px]">
                      <video src={videoPreview} controls className="w-full rounded-[10px]" />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setVideoPreview(null);
                          setIntroVideo(null);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center border-2 border-dashed rounded-[10px] w-[350px] h-[150px] bg-gray-100 cursor-pointer hover:bg-gray-50"
                      onClick={handleVideoClick}
                    >
                      <div className="text-center">
                        <Image
                          src="/svgs/plus.svg"
                          alt="plus"
                          width={24}
                          height={24}
                          className="mx-auto mb-2"
                        />
                        <p className="text-gray-500">Upload Intro Video</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2  flex-1">
                  <h1>Add Questions</h1>
                  {renderStandardQuestions()}
                </div>
              </div>
            ) : (
              <div className="space-y-6">{/* CASPER content */}</div>
            )}
          </div>
        </div>

        {/* right content - question details */}
        {/* {selectedQuestion && selectedSource !== 'mix' && (
          <aside className="w-[300px] p-4 border-l border-gray-200">
            <div className="space-y-4">
              <h2 className="text-[16px] font-semibold">Select Question {selectedQuestion.id}</h2>
              <p>Standard Question Bank (6)</p>
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center py-2 pl-2 gap-2 border border-gray-200 rounded-lg bg-white"
                >
                  <div className="flex items-center justify-center h-[46px] w-[56px] bg-[#F5F5F5] rounded-md">
                    <Image src="/svgs/play.svg" alt="Play video" width={32} height={32} />
                  </div>
                  <div>
                    <p className="text-sm text-[#333333DE]">{selectedQuestion.question}</p>
                    <div className="flex gap-1">
                      {selectedQuestion.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={cn(
                            'text-white text-xs px-2 py-0.5 rounded',
                            tag === 'Communication' ? 'bg-[#00BFB3]' : 'bg-[#F5A623]',
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )} */}
      </div>
    </div>
  );
};

export default SnapshotForm;
