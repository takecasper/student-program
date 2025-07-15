import React, { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface QuestionDrawerProps {
  open: boolean;
  onClose: () => void;
  numberOfQuestions: number;
}

// Mock question data with video URLs
const mockQuestions = [
  {
    id: 1,
    question: 'In what ways do you contribute to a positive school environment?',
    videoUrl: '/video.mp4',
    tags: ['Communication', 'Empathy'],
  },
  {
    id: 2,
    question: 'What makes you a good fit for this school?',
    videoUrl: '/video.mp4',
    tags: ['Communication', 'Clinical'],
  },
  {
    id: 3,
    question: 'Describe a challenging situation you faced.',
    videoUrl: '/video.mp4',
    tags: ['Adaptability', 'Problem Solving'],
  },
];

const QuestionDrawer = ({ open, onClose, numberOfQuestions }: QuestionDrawerProps) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customTab, setCustomTab] = useState<'video' | 'text'>('video');
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [modalVideo, setModalVideo] = useState<{ id: number; question: string } | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Handler to reset custom mode (e.g., on cancel)
  const handleCancelCustom = () => {
    setIsCustomMode(false);
  };

  const handlePlayVideo = (questionId: number) => {
    const question = mockQuestions.find(q => q.id === questionId);
    if (question) {
      setModalVideo({ id: questionId, question: question.question });
      setPlayingVideo(questionId);
      onClose(); // Close the drawer when video is played
    }
  };

  const handleVideoEnded = () => {
    setPlayingVideo(null);
    setModalVideo(null);
  };

  const handleFullscreen = (questionId: number) => {
    const video = videoRefs.current[questionId];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  const toggleQuestionExpansion = (questionId: number) => {
    setExpandedQuestions(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId],
    );
  };

  const closeModal = () => {
    setModalVideo(null);
    setPlayingVideo(null);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-[550px] !max-w-none">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-left">
              {isCustomMode ? 'ADD CUSTOM QUESTION' : 'From Question Bank'}
            </SheetTitle>
            {!isCustomMode && (
              <>
                <div className="flex items-center gap-2">
                  <Tabs defaultValue="english">
                    <TabsList className="w-full">
                      <TabsTrigger value="english" className="w-full">
                        ENLISH
                      </TabsTrigger>
                      <TabsTrigger value="french" className="w-full">
                        FRENCH
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex items-center justify-between">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Competency Focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Communication</SelectItem>
                      <SelectItem value="text">Adaptability</SelectItem>
                      <SelectItem value="video">Cultural Competence</SelectItem>
                      <SelectItem value="video">Passion for learning</SelectItem>
                      <SelectItem value="video">Empathy</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    className="bg-[#364699] text-white"
                    onClick={() => setIsCustomMode(true)}
                  >
                    Add Custom
                    <Image src="/svgs/plus.svg" alt="plus" width={16} height={16} />
                  </Button>
                </div>
              </>
            )}
          </SheetHeader>

          {!isCustomMode ? (
            <>
              <div className="space-y-4">
                {mockQuestions.slice(0, numberOfQuestions).map(question => {
                  const isExpanded = expandedQuestions.includes(question.id);
                  return (
                    <div key={question.id} className="border rounded-lg p-4 bg-white">
                      {/* Video Player - Only Visible When Expanded */}
                      {isExpanded && (
                        <div className="relative mb-4">
                          <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden relative">
                            <video
                              ref={el => {
                                videoRefs.current[question.id] = el;
                              }}
                              className="w-full h-full object-cover"
                              onEnded={handleVideoEnded}
                              controls
                            >
                              <source src={question.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>

                            {/* Play Button Overlay */}
                            {playingVideo !== question.id && (
                              <button
                                onClick={() => handlePlayVideo(question.id)}
                                className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30 hover:bg-opacity-40 transition-all"
                              >
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M8 5v14l11-7z" fill="white" />
                                  </svg>
                                </div>
                              </button>
                            )}

                            {/* Fullscreen Button */}
                            <button
                              onClick={() => handleFullscreen(question.id)}
                              className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded text-white hover:bg-opacity-70"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Question Header - Always Visible */}
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 5v14l11-7z" fill="currentColor" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{question.question}</p>
                          <div className="flex gap-2 mt-1">
                            {question.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`px-2 py-0.5 text-xs rounded-md ${
                                  index === 0
                                    ? 'text-white bg-[#00BFB3]'
                                    : 'text-black bg-[#F5A623]'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          className="p-2"
                          onClick={() => toggleQuestionExpansion(question.id)}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          >
                            <path d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="bg-[#364699]">Use</Button>
              </div>
            </>
          ) : (
            <>
              {/* Custom Question Form UI */}
              <div className="flex gap-2 mb-4">
                <Button
                  className={`rounded-full px-6 py-2 ${customTab === 'video' ? 'bg-[#364699] text-white' : 'bg-gray-100 text-gray-700'}`}
                  variant="outline"
                  onClick={() => setCustomTab('video')}
                >
                  VIDEO
                </Button>
                <Button
                  className={`rounded-full px-6 py-2 ${customTab === 'text' ? 'bg-[#364699] text-white' : 'bg-white text-gray-700'}`}
                  variant="outline"
                  onClick={() => setCustomTab('text')}
                >
                  TEXT BASED
                </Button>
              </div>

              {customTab === 'video' ? (
                <>
                  <div className="bg-gray-100 rounded-xl flex flex-col items-center justify-center h-48 mb-4">
                    <div className="flex flex-col items-center">
                      <Button variant="ghost" size="icon" className="mb-2">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 16v-8M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" />
                        </svg>
                      </Button>
                      <span className="text-gray-400">Upload Question Video</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Question Title"
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#364699]"
                  />
                  <div className="flex items-center justify-between">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Competency Focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Communication</SelectItem>
                        <SelectItem value="text">Adaptability</SelectItem>
                        <SelectItem value="video">Cultural Competence</SelectItem>
                        <SelectItem value="video">Passion for learning</SelectItem>
                        <SelectItem value="video">Empathy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  {/* Text-based Question Form */}
                  <div className="space-y-4">
                    {/* Intro Title Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intro Title
                      </label>
                      <input
                        type="text"
                        placeholder="Enter intro title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#364699]"
                      />
                    </div>

                    {/* Rich Text Editor Toolbar */}
                    <div className="border border-gray-300 rounded-t-[12px] p-3 bg-gray-50">
                      <div className="flex items-center gap-3 flex-wrap">
                        {/* Font Family */}
                        <select className="px-2 py-1 border border-gray-300 rounded text-sm bg-white">
                          <option>Lato</option>
                          <option>Arial</option>
                          <option>Times New Roman</option>
                        </select>

                        {/* Font Size */}
                        <select className="px-2 py-1 border border-gray-300 rounded text-sm bg-white">
                          <option>14</option>
                          <option>12</option>
                          <option>16</option>
                          <option>18</option>
                        </select>

                        {/* Text Color */}
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                        </button>

                        {/* Bold */}
                        <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>

                        {/* Underline */}
                        <button className="p-1 hover:bg-gray-200 rounded underline">U</button>

                        {/* Divider */}
                        <div className="w-px h-6 bg-gray-300"></div>

                        {/* Unordered List */}
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                          </svg>
                        </button>

                        {/* Ordered List */}
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="10" y1="6" x2="21" y2="6" />
                            <line x1="10" y1="12" x2="21" y2="12" />
                            <line x1="10" y1="18" x2="21" y2="18" />
                            <path d="M4 6h1v4H4z" />
                            <path d="M4 10h2" />
                            <path d="M5 18h2v-4h-2v4z" />
                            <path d="M4 14h2" />
                          </svg>
                        </button>

                        {/* Divider */}
                        <div className="w-px h-6 bg-gray-300"></div>

                        {/* Left Align */}
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="17" y1="10" x2="3" y2="10" />
                            <line x1="21" y1="6" x2="3" y2="6" />
                            <line x1="21" y1="14" x2="3" y2="14" />
                            <line x1="17" y1="18" x2="3" y2="18" />
                          </svg>
                        </button>

                        {/* Center Align */}
                        <button className="p-1 hover:bg-gray-200 rounded bg-blue-100">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="10" x2="6" y2="10" />
                            <line x1="21" y1="6" x2="3" y2="6" />
                            <line x1="21" y1="14" x2="3" y2="14" />
                            <line x1="18" y1="18" x2="6" y2="18" />
                          </svg>
                        </button>

                        {/* Right Align */}
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="21" y1="10" x2="7" y2="10" />
                            <line x1="21" y1="6" x2="3" y2="6" />
                            <line x1="21" y1="14" x2="3" y2="14" />
                            <line x1="21" y1="18" x2="7" y2="18" />
                          </svg>
                        </button>

                        {/* Justify */}
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="21" y1="10" x2="3" y2="10" />
                            <line x1="21" y1="6" x2="3" y2="6" />
                            <line x1="21" y1="14" x2="3" y2="14" />
                            <line x1="21" y1="18" x2="3" y2="18" />
                          </svg>
                        </button>

                        {/* Divider */}
                        <div className="w-px h-6 bg-gray-300"></div>

                        {/* Media/Image */}
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21,15 16,10 5,21" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Description Text Area */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="Enter your question description here..."
                        className="w-full h-32 px-4 py-2 border border-gray-300 rounded-b-[12px] focus:outline-none focus:ring-2 focus:ring-[#364699] resize-none"
                      />
                    </div>

                    {/* Competency Focus */}
                    <div className="border-t border-gray-300 pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Competency Focus
                      </label>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Skill" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Communication</SelectItem>
                          <SelectItem value="text">Adaptability</SelectItem>
                          <SelectItem value="video">Cultural Competence</SelectItem>
                          <SelectItem value="video">Passion for learning</SelectItem>
                          <SelectItem value="video">Empathy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline" onClick={handleCancelCustom}>
                  Cancel
                </Button>
                <Button className="bg-[#364699]">Save</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Modal Video Player */}
      {modalVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-4">
            {/* Header */}
            <div className="absolute top-4 left-4 z-10 text-white">
              <div className="text-sm opacity-80">From Question Bank</div>
              <div className="text-lg font-medium mt-1">{modalVideo.question}</div>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={modalVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                onEnded={handleVideoEnded}
                controls
              >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Fullscreen Button */}
              <button
                onClick={() => modalVideoRef.current?.requestFullscreen()}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded text-white hover:bg-opacity-70"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-12 p-2 bg-black bg-opacity-50 rounded text-white hover:bg-opacity-70"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionDrawer;
