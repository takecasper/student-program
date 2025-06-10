'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { standardQuestions } from '../constants/questions';
import { StandardQuestion } from '../types/snapshot';
import QuestionDrawer from './QuestionDrawer';

const SnapshotForm = () => {
  const [selectedSource, setSelectedSource] = useState('program');
  const [selectedTest, setSelectedTest] = useState<'CASPER' | 'SNAPSHOT'>('SNAPSHOT');
  const [selectedQuestion, setSelectedQuestion] = useState<StandardQuestion | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="space-y-6">
      <QuestionDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="flex gap-6">
        {/* left content */}
        <aside className="w-[250px] py-4 px-4 border-r border-gray-200">
          {/* Program 1 Settings */}
          <div className="space-y-4 pb-4">
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
          </div>

          <div className="font-medium text-[#333333DE] text-sm">
            <h1 className="text-[16px] font-semibold">Question Source</h1>
            <p className="text-[14px] font-normal text-[#333333DE]"> Video Scenario-Based</p>
          </div>

          <RadioGroup
            value={selectedSource}
            onValueChange={setSelectedSource}
            className="flex flex-col gap-4 pt-4 [&_[data-state=checked]]:bg-[#364699] [&_[data-state=checked]]:border-[#364699]"
          >
            <div className="flex items-center justify-between rounded-md border px-3 py-5 hover:bg-gray-50 group">
              <Label htmlFor="program" className="cursor-pointer group-hover:text-[#364699]">
                Program Questions
              </Label>
              <RadioGroupItem
                value="program"
                id="program"
                className="text-[#364699] border-[#364699]"
              />
            </div>
            <div className="flex items-center justify-between rounded-md border px-3 py-5 hover:bg-gray-50 group">
              <Label htmlFor="bank" className="cursor-pointer group-hover:text-[#364699]">
                Our Question Bank
              </Label>
              <RadioGroupItem value="bank" id="bank" className="text-[#364699] border-[#364699]" />
            </div>
            <div className="flex items-center justify-between rounded-md border px-3 py-5 hover:bg-gray-50 group">
              <Label htmlFor="mix" className="cursor-pointer group-hover:text-[#364699]">
                Mix of Snapshot + Program Questions
              </Label>
              <RadioGroupItem value="mix" id="mix" className="text-[#364699] border-[#364699]" />
            </div>
          </RadioGroup>
        </aside>

        {/* center content */}
        <div className="flex-1 p-4">
          {selectedTest === 'SNAPSHOT' ? (
            <div>
              <section>
                <h3 className="text-[16px] font-medium text-[#333333DE] mb-6">Time & Flow</h3>

                <div className="flex gap-10">
                  {/* Thinking Time */}
                  <div className="space-y-2">
                    <Label className="text-sm text-[#333333DE]">Thinking Time per Question</Label>
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
                  <div className="space-y-2">
                    <Label className="text-sm text-[#333333DE]">Response Time per Question</Label>
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
                  <div className="space-y-2">
                    <Label className="text-sm text-[#333333DE]">Time Between Questions</Label>
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

                  <div className="space-y-2">
                    <Label className="text-sm text-[#333333DE]">Pause/Break Options</Label>
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
              </section>

              {/* Question Grid */}
              <div className="pt-6">
                <h1>Standard Questions Selected</h1>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {selectedSource === 'mix' ? (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white flex flex-col items-center justify-center cursor-pointer hover:border-[#364699] transition-colors min-h-[200px]"
                      onClick={() => setIsDrawerOpen(true)}
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mb-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5V19M5 12H19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500">Add Program Question</p>
                    </div>
                  ) : (
                    standardQuestions.map(question => (
                      <div
                        key={question.id}
                        className={cn('relative group cursor-pointer', {
                          'ring-2 ring-[#364699]': selectedQuestion?.id === question.id,
                        })}
                        onClick={() => setSelectedQuestion(question)}
                      >
                        <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm h-full">
                          <div className="flex items-center justify-center h-[120px] bg-gray-200 rounded mb-4">
                            <Image src="/svgs/play.svg" alt="Play video" width={40} height={40} />
                          </div>
                          <div>
                            <h4 className="text-[#364699] text-sm font-medium">
                              Question {question.id}
                            </h4>
                            <p className="text-sm text-[#333333DE] mt-1">{question.question}</p>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {question.tags.map((tag, index) => (
                              <span
                                key={index}
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Edit question"
                        >
                          <Image src="/svgs/edit.svg" alt="Edit" width={16} height={16} />
                        </Button>
                      </div>
                    ))
                  )}
                </section>
              </div>
            </div>
          ) : (
            <div className="space-y-6">{/* CASPER content */}</div>
          )}
        </div>

        {/* right content - question details */}
        {selectedQuestion && selectedSource !== 'mix' && (
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
        )}
      </div>
    </div>
  );
};

export default SnapshotForm;
