/* VIDEO INTERVIEW CONFIGURATION PAGE */
'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import QuestionDrawer from '../components/QuestionDrawer';

const steps = [
  {
    title: 'Step 1: Test Content & Flow',
    description: 'Define how test results are categorized and distributed',
  },
  {
    title: 'Step 2: Introductory Material',
    description: 'Configure the introductory messages for your interview test.',
  },
  {
    title: 'Step 3: Question Bank',
    description: 'Manage settings for French language test support',
  },
  {
    title: 'Step 4: Concluding Material (Optional)',
    description: 'Configure the concluding messages for your interview test.',
  },
  { title: 'Step 5: Scheduling', description: 'Configure rules and options for fee waivers' },
  {
    title: 'Step 6: Score Delivery Settings',
    description: 'Configure rules and options for fee waivers',
  },
  {
    title: 'Step 7: Fee Waiver Configuration',
    description: 'Configure rules and options for fee waivers',
  },
];

function Step1({
  testName,
  setTestName,
  numQuestions,
  setNumQuestions,
  thinkingTime,
  setThinkingTime,
  responseTime,
  setResponseTime,
  breakOption,
  setBreakOption,
  breakDuration,
  setBreakDuration,
}: {
  testName: string;
  setTestName: (v: string) => void;
  numQuestions: string;
  setNumQuestions: (v: string) => void;
  thinkingTime: string;
  setThinkingTime: (v: string) => void;
  responseTime: string;
  setResponseTime: (v: string) => void;
  breakOption: boolean;
  setBreakOption: (v: boolean) => void;
  breakDuration: string;
  setBreakDuration: (v: string) => void;
}) {
  const numOptions = ['3', '4', '5', '6', '7', '8', '9', '10'];
  const timeOptions = ['0:00 min', '0:30 min', '1:00 min', '2:00 min', '3:00 min'];
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-2">Test Naming & Basic Settings</h3>
      <p className="text-gray-500 mb-6">Provide basic information to create your program</p>
      <div className="mb-4">
        <label className="block text-xs font-semibold mb-1">TEST NAME</label>
        <input
          className="w-full border rounded-[12px] px-3 py-2 text-sm"
          value={testName}
          onChange={e => setTestName(e.target.value)}
          placeholder="Interview Cycle 1"
        />
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">NUMBER OF QUESTIONS</label>
          <Select value={numQuestions} onValueChange={setNumQuestions}>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select number of questions" />
            </SelectTrigger>
            <SelectContent>
              {numOptions.map(opt => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">SESSION MODE</label>
          <Select>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select session mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Continuous (One Sitting)</SelectItem>
              <SelectItem value="2">Multiple Sessions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">THINKING TIME PER QUESTION</label>
          <Select value={thinkingTime} onValueChange={setThinkingTime}>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select thinking time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map(opt => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1">RESPONSE TIME PER QUESTION</label>
          <Select value={responseTime} onValueChange={setResponseTime}>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select response time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map(opt => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <label className="block text-xs font-semibold mb-1">BREAK OPTIONS</label>
        <button
          type="button"
          onClick={() => setBreakOption(!breakOption)}
          className={`w-10 h-6 rounded-full border transition-colors duration-200 ${breakOption ? 'bg-[#364699] border-[#364699]' : 'bg-gray-200 border-gray-300'}`}
        >
          {' '}
          <span
            className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${breakOption ? 'translate-x-4' : 'translate-x-1'}`}
          ></span>
        </button>
      </div>
      <div className="flex gap-4 w-full">
        <SelectGroup>
          <Select value={breakDuration} onValueChange={setBreakDuration}>
            <SelectLabel className="text-xs font-semibold mb-1 text-black">
              BREAK DURATION
            </SelectLabel>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select break duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Question 1</SelectItem>
              <SelectItem value="2">Question 2</SelectItem>
              <SelectItem value="3">Question 3</SelectItem>
              <SelectItem value="4">Question 4</SelectItem>
              <SelectItem value="5">Question 5</SelectItem>
            </SelectContent>
          </Select>
        </SelectGroup>
        <SelectGroup>
          <Select>
            <SelectLabel className="text-xs font-semibold mb-1 text-black">
              BREAK OPTIONS
            </SelectLabel>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select break options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
            </SelectContent>
          </Select>
        </SelectGroup>
      </div>
    </div>
  );
}

function Step2({
  useDefaultIntro,
  setUseDefaultIntro,
  customIntro,
  setCustomIntro,
}: {
  useDefaultIntro: boolean;
  setUseDefaultIntro: (v: boolean) => void;
  customIntro: File | null;
  setCustomIntro: (f: File | null) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [customIntroPreview, setCustomIntroPreview] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'text' | 'image'>('text');
  const [editorValue, setEditorValue] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices leo in molestie malesuada. Maecenas vitae suscipit lectus. Aliquam tempor metus nec semper interdum.\n\nMauris pretium lacus vitae orci sollicitudin viverra. Quisque blandit tempus urna, mollis molestie odio fringilla et.',
  );
  const [editorTitle, setEditorTitle] = useState('Interview - Cycle 1');

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', 'default-intro');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const data = e.dataTransfer.getData('text/plain');
    const files = e.dataTransfer.files;

    if (data === 'default-intro') {
      // Create a mock file object for the default intro
      const defaultIntroFile = new File([''], 'default-intro-video.jpg', { type: 'image/jpeg' });
      setCustomIntro(defaultIntroFile);
      setCustomIntroPreview('/video.jpg'); // Set the actual image preview
      setUseDefaultIntro(false);
    } else if (files && files.length > 0) {
      // Handle direct file drop
      const file = files[0];
      if (file.type.startsWith('video/') || file.type.startsWith('image/')) {
        setCustomIntro(file);

        // Use same logic as handleFileChange
        if (file.type.startsWith('video/')) {
          const videoUrl = URL.createObjectURL(file);
          setCustomIntroPreview(videoUrl);
        } else {
          const reader = new FileReader();
          reader.onload = e => {
            setCustomIntroPreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
        setUseDefaultIntro(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCustomIntro(file);

    if (file) {
      // For videos, use URL.createObjectURL for better performance
      if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        setCustomIntroPreview(videoUrl);
      } else {
        // For images, use FileReader
        const reader = new FileReader();
        reader.onload = e => {
          setCustomIntroPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setCustomIntroPreview(null);
    }
  };

  const isVideoFile = (file: File | null) => {
    return file && file.type.startsWith('video/');
  };

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-2">Introductory Material</h3>
      <p className="text-gray-500 mb-6">
        Configure the introductory messages for your interview test.
      </p>
      <div className="flex gap-8">
        {/* Default Intro */}
        <div className="flex-1 flex flex-col">
          <div className="font-semibold text-xs mb-1 flex items-center gap-2">
            <span>DEFAULT INTRO</span>
          </div>
          <div className="text-xs mb-2 flex items-center justify-between">
            <p>Introductory Video</p>
            <button
              type="button"
              onClick={() => {
                setUseDefaultIntro(true);
                if (customIntroPreview) {
                  setCustomIntro(null);
                  setCustomIntroPreview(null);
                }
              }}
              className={`w-10 h-6 rounded-full border transition-colors duration-200 ${useDefaultIntro ? 'bg-[#364699] border-[#364699]' : 'bg-gray-200 border-gray-300'}`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${useDefaultIntro ? 'translate-x-4' : 'translate-x-1'}`}
              ></span>
            </button>
          </div>
          <div className="flex items-center mb-2"></div>
          <div className="relative h-48">
            <img
              src="/video.jpg"
              alt="Default Intro"
              className={`rounded-lg w-full h-48 object-cover cursor-pointer transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onClick={() => setSheetOpen(true)}
            />
            <button className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-white rounded-full p-2 shadow">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" fill="#364699" />
                </svg>
              </span>
            </button>
            <div className="absolute top-2 left-2 bg-white rounded-[8px] px-3 py-1 text-xs font-semibold flex items-center ">
              Set as 1st
              {useDefaultIntro && (
                <span className="ml-2 w-3 h-3 bg-[#70C0B8] rounded-full inline-block"></span>
              )}
            </div>
            {customIntroPreview && (
              <div className="absolute bottom-2 left-2 bg-blue-500 text-white rounded-[8px] px-2 py-1 text-xs font-semibold">
                Copied ✓
              </div>
            )}
            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-[8px] px-2 py-1 text-xs font-semibold">
              Drag to copy
            </div>
          </div>
          {/* Sheet Sidebar */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="right" className="w-[650px] !max-w-none flex flex-col h-full">
              <SheetHeader>
                <SheetTitle>INTRODUCTORY</SheetTitle>
              </SheetHeader>
              {/* Tabs */}
              <div className="flex border-b mb-4 mt-2">
                {['video', 'text', 'image'].map(tab => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors duration-150 ${
                      activeTab === tab
                        ? 'border-[#364699] text-[#364699] bg-white'
                        : 'border-transparent text-gray-500 bg-gray-50'
                    }`}
                    onClick={() => setActiveTab(tab as 'video' | 'text' | 'image')}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto pb-32">
                {activeTab === 'text' && (
                  <div className="flex flex-col gap-4">
                    <input
                      className="border rounded px-3 py-2 text-sm mb-2"
                      value={editorTitle}
                      onChange={e => setEditorTitle(e.target.value)}
                    />
                    {/* Toolbar */}
                    <div className="flex items-center gap-2 mb-2">
                      <select className="border rounded px-2 py-1 text-xs">
                        <option>Lato</option>
                        <option>Arial</option>
                        <option>Roboto</option>
                      </select>
                      <select className="border rounded px-2 py-1 text-xs">
                        <option>14</option>
                        <option>16</option>
                        <option>18</option>
                      </select>
                      <button className="px-1 font-bold">A</button>
                      <button className="px-1 font-bold">B</button>
                      <button className="px-1 font-bold">U</button>
                      <button className="px-1">•</button>
                      <button className="px-1">1.</button>
                      <button className="px-1">≡</button>
                      <button className="px-1">≡</button>
                      <button className="px-1">≡</button>
                      <button className="px-1">🖼️</button>
                    </div>
                    <textarea
                      className="border rounded px-3 py-2 text-sm min-h-[120px]"
                      value={editorValue}
                      onChange={e => setEditorValue(e.target.value)}
                    />
                  </div>
                )}
                {activeTab === 'video' && (
                  <div className="flex flex-col gap-4">
                    {customIntro && isVideoFile(customIntro) ? (
                      <video
                        src={customIntroPreview || ''}
                        className="w-full h-64 object-cover rounded-lg border"
                        controls
                        preload="metadata"
                      />
                    ) : (
                      <label className="w-full h-64 bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center">
                          <svg
                            width="32"
                            height="32"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="mb-2 text-gray-400"
                          >
                            <path
                              d="M12 16V4m0 0l-4 4m4-4l4 4"
                              stroke="#A0AEC0"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <rect x="4" y="20" width="16" height="2" rx="1" fill="#A0AEC0" />
                          </svg>
                          <span className="text-gray-400 text-sm font-medium">
                            Upload Intro Video
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                    <input
                      className="border rounded px-3 py-2 text-sm mb-2"
                      placeholder="Video Title"
                      value={editorTitle}
                      onChange={e => setEditorTitle(e.target.value)}
                    />
                  </div>
                )}
                {activeTab === 'image' && (
                  <div className="flex flex-col gap-6">
                    {/* Upload Area */}
                    <div className="w-full h-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-300 cursor-pointer mb-2">
                      <div className="flex flex-col items-center">
                        <svg
                          width="32"
                          height="32"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="mb-2 text-gray-400"
                        >
                          <path
                            d="M12 16V4m0 0l-4 4m4-4l4 4"
                            stroke="#A0AEC0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect x="4" y="20" width="16" height="2" rx="1" fill="#A0AEC0" />
                        </svg>
                        <span className="text-gray-400 text-sm font-medium">
                          Upload Question Video
                        </span>
                      </div>
                    </div>
                    {/* Question Title */}
                    <input
                      className="border rounded-xl px-4 py-2 text-sm w-full"
                      placeholder="Question Title"
                    />
                    {/* Competency Focus */}
                    <div>
                      <label className="block text-xs font-semibold mb-1">Competency Focus</label>
                      <div className="flex items-center gap-2 w-full">
                        {/* Simple multi-select mockup */}
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center">
                            Communication <span className="ml-1 cursor-pointer">×</span>
                          </span>
                          <span className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center">
                            Empathy <span className="ml-1 cursor-pointer">×</span>
                          </span>
                        </div>
                        <button className="ml-auto border rounded-xl px-2 py-1 text-xs text-gray-500 flex items-center">
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <path
                              d="M7 10l5 5 5-5"
                              stroke="#A0AEC0"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Bottom Buttons */}
              <div className="flex justify-between items-center py-4 px-2 border-t bg-white absolute bottom-0 left-0 w-full">
                <SheetClose asChild>
                  <button className="px-4 py-2 rounded-full border text-gray-600">Back</button>
                </SheetClose>
                <button className="px-4 py-2 rounded-full bg-[#364699] text-white">Next</button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Custom Intro */}
        <div className="flex-1 flex flex-col">
          <div className="font-semibold text-xs mb-1">CUSTOM INTRO</div>
          <div className="text-xs mb-2">Upload video or image intro</div>
          <div className="flex-grow flex items-center">
            <div
              className={`block border-2 border-dashed rounded-lg w-full h-48 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50'
                  : customIntro
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                setSheetOpen(true);
              }}
            >
              {customIntroPreview ? (
                <div className="relative w-full h-full">
                  {isVideoFile(customIntro) ? (
                    <video
                      src={customIntroPreview}
                      className="w-full h-full object-cover rounded-lg"
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <>
                      <img
                        src={customIntroPreview}
                        alt="Custom Intro Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <div className="bg-white rounded-full p-2 shadow">
                          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" fill="#364699" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="absolute top-2 left-2 bg-green-500 text-white rounded-[8px] px-2 py-1 text-xs font-semibold">
                    Added
                  </div>
                  <div className="absolute top-2 right-2 bg-white text-gray-700 rounded-[8px] px-2 py-1 text-xs font-semibold">
                    {customIntro?.name || 'Default Intro'} {isVideoFile(customIntro) && '(Video)'}
                  </div>
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      // Clean up object URL if it's a video
                      if (customIntroPreview && customIntro && isVideoFile(customIntro)) {
                        URL.revokeObjectURL(customIntroPreview);
                      }
                      setCustomIntro(null);
                      setCustomIntroPreview(null);
                    }}
                    className="absolute bottom-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    title="Remove intro"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-4xl text-gray-300">+</span>
                  <span className="text-xs text-gray-400 mt-2">Upload video or image</span>
                  <span className="text-xs text-blue-500 mt-1">
                    Click to browse or drag files here
                  </span>
                </>
              )}
            </div>
            <input
              id="custom-intro-upload"
              type="file"
              accept="video/*,image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={useDefaultIntro}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({ questions }: { questions: string[]; setQuestions: (q: string[]) => void }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  // Open Sheet for editing or adding
  const handleCardClick = () => {
    setSheetOpen(true);
  };
  // Open Sheet for adding
  const handleAddClick = () => {
    setSheetOpen(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h3 className="text-xl font-bold mb-2">Question Bank</h3>
      <p className="text-gray-500 mb-6">Add and arrange the questions for your interview test.</p>
      <div className="font-semibold text-xs mb-2">ADD QUESTION</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            className="border-2 border-dashed border-gray-300 rounded-lg h-16 sm:h-20 lg:h-24 w-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl text-gray-300 focus:outline-none hover:border-gray-400 transition-colors"
            onClick={() => handleCardClick()}
          >
            {q ? (
              <span className="text-sm sm:text-base text-gray-700 px-2 text-center overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
                {q}
              </span>
            ) : (
              <span>+</span>
            )}
          </button>
        ))}
        {/* Plus Card for Add Custom Question */}
        <button
          type="button"
          className="border-2 border-dashed border-gray-300 rounded-lg h-16 sm:h-20 lg:h-24 w-full flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl text-gray-300 focus:outline-none hover:border-gray-400 transition-colors"
          onClick={handleAddClick}
        >
          <span>+</span>
        </button>
      </div>
      {/* Use the actual QuestionDrawer component for add/edit */}
      <QuestionDrawer
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        numberOfQuestions={questions.length}
        // Optionally, pass more props for editing/adding
      />
    </div>
  );
}

function Step4({
  concludingMaterial,
}: {
  concludingMaterial: string | null;
  setConcludingMaterial: (v: string | null) => void;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'text' | 'image'>('text');
  const [editorValue, setEditorValue] = useState('');
  const [editorTitle, setEditorTitle] = useState('');

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-2">Concluding Material</h3>
      <p className="text-gray-500 mb-6">Configure the messages for your interview test.</p>
      <button
        type="button"
        className="border-2 border-dashed border-gray-300 rounded-lg w-64 h-64 flex flex-col items-center justify-center bg-gray-50"
        onClick={() => setSheetOpen(true)}
      >
        {concludingMaterial ? (
          <span className="text-base text-gray-700 text-center">{concludingMaterial}</span>
        ) : (
          <span className="text-5xl text-gray-300">+</span>
        )}
      </button>
      {/* Sheet for Add/Edit Concluding Material (like INTRODUCTORY) */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-[650px] !max-w-none flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>CONCLUDING MATERIAL</SheetTitle>
          </SheetHeader>
          {/* Tabs */}
          <div className="flex border-b mb-4 mt-2">
            {['video', 'text', 'image'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors duration-150 ${
                  activeTab === tab
                    ? 'border-[#364699] text-[#364699] bg-white'
                    : 'border-transparent text-gray-500 bg-gray-50'
                }`}
                onClick={() => setActiveTab(tab as 'video' | 'text' | 'image')}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto pb-32">
            {activeTab === 'text' && (
              <div className="flex flex-col gap-4">
                <input
                  className="border rounded px-3 py-2 text-sm mb-2"
                  value={editorTitle}
                  onChange={e => setEditorTitle(e.target.value)}
                  placeholder="Concluding Title"
                />
                {/* Toolbar */}
                <div className="flex items-center gap-2 mb-2">
                  <select className="border rounded px-2 py-1 text-xs">
                    <option>Lato</option>
                    <option>Arial</option>
                    <option>Roboto</option>
                  </select>
                  <select className="border rounded px-2 py-1 text-xs">
                    <option>14</option>
                    <option>16</option>
                    <option>18</option>
                  </select>
                  <button className="px-1 font-bold">A</button>
                  <button className="px-1 font-bold">B</button>
                  <button className="px-1 font-bold">U</button>
                  <button className="px-1">•</button>
                  <button className="px-1">1.</button>
                  <button className="px-1">≡</button>
                  <button className="px-1">≡</button>
                  <button className="px-1">≡</button>
                  <button className="px-1">🖼️</button>
                </div>
                <textarea
                  className="border rounded px-3 py-2 text-sm min-h-[120px]"
                  value={editorValue}
                  onChange={e => setEditorValue(e.target.value)}
                  placeholder="Enter concluding message..."
                />
              </div>
            )}
            {activeTab === 'video' && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                Video preview here
              </div>
            )}
            {activeTab === 'image' && (
              <div className="flex flex-col gap-6">
                {/* Upload Area */}
                <div className="w-full h-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-300 cursor-pointer mb-2">
                  <div className="flex flex-col items-center">
                    <svg
                      width="32"
                      height="32"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="mb-2 text-gray-400"
                    >
                      <path
                        d="M12 16V4m0 0l-4 4m4-4l4 4"
                        stroke="#A0AEC0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect x="4" y="20" width="16" height="2" rx="1" fill="#A0AEC0" />
                    </svg>
                    <span className="text-gray-400 text-sm font-medium">Upload Question Video</span>
                  </div>
                </div>
                {/* Question Title */}
                <input
                  className="border rounded-xl px-4 py-2 text-sm w-full"
                  placeholder="Concluding Title"
                />
                {/* Competency Focus */}
                <div>
                  <label className="block text-xs font-semibold mb-1">Competency Focus</label>
                  <div className="flex items-center gap-2 w-full">
                    {/* Simple multi-select mockup */}
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center">
                        Communication <span className="ml-1 cursor-pointer">×</span>
                      </span>
                      <span className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center">
                        Empathy <span className="ml-1 cursor-pointer">×</span>
                      </span>
                    </div>
                    <button className="ml-auto border rounded-xl px-2 py-1 text-xs text-gray-500 flex items-center">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M7 10l5 5 5-5"
                          stroke="#A0AEC0"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Bottom Buttons */}
          <div className="flex justify-between items-center py-4 px-2 border-t bg-white absolute bottom-0 left-0 w-full">
            <SheetClose asChild>
              <button className="px-4 py-2 rounded-full border text-gray-600">Back</button>
            </SheetClose>
            <button className="px-4 py-2 rounded-full bg-[#364699] text-white">Next</button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Step5({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  capacity,
  setCapacity,
  slotDuration,
  setSlotDuration,
}: {
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  startTime: string;
  setStartTime: (v: string) => void;
  endTime: string;
  setEndTime: (v: string) => void;
  capacity: string;
  setCapacity: (v: string) => void;
  slotDuration: string;
  setSlotDuration: (v: string) => void;
}) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-bold mb-2">Schedule Test Dates & Slots</h3>
      <p className="text-gray-500 mb-6">Set and manage available test dates and time slots</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full border rounded-[12px] px-3 py-2 text-sm"
            min={startDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Start Time</label>
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="08:00">08:00 AM</SelectItem>
              <SelectItem value="09:00">09:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="13:00">01:00 PM</SelectItem>
              <SelectItem value="15:00">03:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">End Time</label>
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">09:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="14:00">02:00 PM</SelectItem>
              <SelectItem value="16:00">04:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold mb-1">CAPACITY</label>
          <Select value={capacity} onValueChange={setCapacity}>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select capacity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Unlimited">Unlimited</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">SLOT DURATION</label>
          <Select value={slotDuration} onValueChange={setSlotDuration}>
            <SelectTrigger className="w-full border rounded-[12px] px-3 py-2 text-sm">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="60 Min">60 Min</SelectItem>
              <SelectItem value="30 Min">30 Min</SelectItem>
              <SelectItem value="90 Min">90 Min</SelectItem>
              <SelectItem value="120 Min">120 Min</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-6 justify-end">
        <div className="flex items-center gap-2 border rounded-full px-4 py-2">
          <span className="text-sm">Preview Test</span>

          <span>
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
              <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                stroke="#364699"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" stroke="#364699" strokeWidth="2" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function Step6({
  ratingsEnabled,
  setRatingsEnabled,
  overrideRule,
  setOverrideRule,
  ratingOverrides,
  setRatingOverrides,
  previewTest6,
  setPreviewTest6,
}: {
  ratingsEnabled: boolean;
  setRatingsEnabled: (v: boolean) => void;
  overrideRule: string;
  setOverrideRule: (v: string) => void;
  ratingOverrides: boolean;
  setRatingOverrides: (v: boolean) => void;
  previewTest6: boolean;
  setPreviewTest6: (v: boolean) => void;
}) {
  return (
    <div className="w-full max-w-3xl">
      <h3 className="text-xl font-bold mb-2">Rating System</h3>
      <p className="text-gray-500 mb-6">Configure how applicant responses will be rated</p>
      <div className="flex gap-8 mb-6">
        {/* Question Order */}
        <div className="flex-1">
          <div className="font-semibold text-xs mb-2">QUESTION ORDER</div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className={`border rounded-[12px] w-full px-5 py-3 flex items-center gap-2 text-base ${ratingsEnabled ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setRatingsEnabled(true)}
            >
              {ratingsEnabled ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              <span className="font-medium">Enable Ratings</span>
            </button>
            <button
              type="button"
              className={`border rounded-[12px] w-full px-5 py-3 flex items-center gap-2 text-base ${!ratingsEnabled ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setRatingsEnabled(false)}
            >
              {!ratingsEnabled ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              <span className="font-medium">Disable Ratings</span>
            </button>
          </div>
          <label className="flex items-center gap-2 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={ratingOverrides}
              onChange={e => setRatingOverrides(e.target.checked)}
              className="accent-[#364699] w-4 h-4"
            />
            <span className="text-sm">Enable Rating Overrides</span>
          </label>
        </div>
        {/* Override Rules */}
        <div className="flex-1">
          <div className="font-semibold text-xs mb-2">OVERRIDE RULES</div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className={`border rounded-[12px] w-full px-5 py-3 flex items-center gap-2 text-base ${overrideRule === 'full-edit' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setOverrideRule('full-edit')}
            >
              {overrideRule === 'full-edit' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              <span className="font-medium">Full Edit Permission</span>
            </button>
            <button
              type="button"
              className={`border rounded-[12px] w-full px-5 py-3 flex items-center gap-2 text-base ${overrideRule === 'admin-approval' ? 'bg-[#f3f4f6] text-[#364699] border-[#364699] font-semibold' : 'text-[#6b7280] border-[#e5e7eb]'}`}
              onClick={() => setOverrideRule('admin-approval')}
            >
              {overrideRule === 'admin-approval' ? (
                <span className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              ) : (
                <span className="w-5 h-5 border border-[#d1d5db] rounded-full inline-block" />
              )}
              <span className="font-medium">Require Admin Approval</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-8 justify-end">
        <div className="flex items-center gap-2 border rounded-full px-4 py-2">
          <span className="text-sm">Preview Test</span>
          <button
            type="button"
            onClick={() => setPreviewTest6(!previewTest6)}
            className={`w-10 h-6 rounded-full border transition-colors duration-200 ${previewTest6 ? 'bg-[#364699] border-[#364699]' : 'bg-gray-200 border-gray-300'}`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ${previewTest6 ? 'translate-x-4' : 'translate-x-1'}`}
            ></span>
          </button>
          <span>
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
              <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                stroke="#364699"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="3" stroke="#364699" strokeWidth="2" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

// Add this new component after the Step functions and before the main component

export default function VideoInterviewConfigPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [testName, setTestName] = useState('Interview Cycle 1');
  const [numQuestions, setNumQuestions] = useState('5');
  const [thinkingTime, setThinkingTime] = useState('0:00 min');
  const [responseTime, setResponseTime] = useState('0:00 min');
  const [breakOption, setBreakOption] = useState(false);
  const [breakDuration, setBreakDuration] = useState('');
  const [selectedCycle, setSelectedCycle] = useState(0);
  const [useDefaultIntro, setUseDefaultIntro] = useState<boolean>(true);
  const [customIntro, setCustomIntro] = useState<File | null>(null);
  const [questions, setQuestions] = useState<string[]>(Array(5).fill(''));
  const [concludingMaterial, setConcludingMaterial] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [capacity, setCapacity] = useState('Unlimited');
  const [slotDuration, setSlotDuration] = useState('60 Min');
  const [ratingsEnabled, setRatingsEnabled] = useState(false);
  const [overrideRule, setOverrideRule] = useState('full-edit');
  const [ratingOverrides, setRatingOverrides] = useState(false);
  const [previewTest6, setPreviewTest6] = useState(false);
  const cycles = [
    { name: 'Interview Cycle 1', status: 'Incomplete' },
    { name: 'Interview Cycle 2', status: 'Incomplete' },
  ];

  let stepContent = null;
  if (currentStep === 0)
    stepContent = (
      <Step1
        testName={testName}
        setTestName={setTestName}
        numQuestions={numQuestions}
        setNumQuestions={setNumQuestions}
        thinkingTime={thinkingTime}
        setThinkingTime={setThinkingTime}
        responseTime={responseTime}
        setResponseTime={setResponseTime}
        breakOption={breakOption}
        setBreakOption={setBreakOption}
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration}
      />
    );
  else if (currentStep === 1)
    stepContent = (
      <Step2
        useDefaultIntro={useDefaultIntro}
        setUseDefaultIntro={setUseDefaultIntro}
        customIntro={customIntro}
        setCustomIntro={setCustomIntro}
      />
    );
  else if (currentStep === 2)
    stepContent = <Step3 questions={questions} setQuestions={setQuestions} />;
  else if (currentStep === 3)
    stepContent = (
      <Step4
        concludingMaterial={concludingMaterial}
        setConcludingMaterial={setConcludingMaterial}
      />
    );
  else if (currentStep === 4)
    stepContent = (
      <Step5
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        capacity={capacity}
        setCapacity={setCapacity}
        slotDuration={slotDuration}
        setSlotDuration={setSlotDuration}
      />
    );
  else if (currentStep === 5)
    stepContent = (
      <Step6
        ratingsEnabled={ratingsEnabled}
        setRatingsEnabled={setRatingsEnabled}
        overrideRule={overrideRule}
        setOverrideRule={setOverrideRule}
        ratingOverrides={ratingOverrides}
        setRatingOverrides={setRatingOverrides}
        previewTest6={previewTest6}
        setPreviewTest6={setPreviewTest6}
      />
    );
  else
    stepContent = (
      <div className="text-center text-gray-400">Step {currentStep + 1} content goes here.</div>
    );

  return (
    <div className="flex min-h-screen bg-[#fafbfc]">
      <div className="w-full">
        <div className="px-8 pt-16">
          <div className="flex gap-4 mb-8">
            {cycles.map((cycle, idx) => (
              <button
                key={cycle.name}
                type="button"
                className={`px-6 py-3 rounded-lg border text-left ${selectedCycle === idx ? 'bg-[#364699] text-white border-[#364699] font-semibold' : 'bg-white text-[#333] border-[#e5e7eb]'} flex flex-col items-start min-w-[180px]`}
                onClick={() => setSelectedCycle(idx)}
              >
                <span>{cycle.name}</span>
                <span className="text-xs font-normal opacity-70">{cycle.status}</span>
              </button>
            ))}
            <button
              type="button"
              className="px-6 py-3 rounded-lg border-2 border-dashed border-[#e5e7eb] text-[#bdbdbd] flex items-center justify-center min-w-[60px]"
            >
              <span className="text-2xl font-bold">+</span>
            </button>
          </div>
        </div>
        <div className="flex items-start">
          {/* Left Stepper */}
          <div className="w-[450px] border-r border-[#e5e7eb] py-16 px-10">
            <h2 className="text-[#364699] text-lg font-semibold mb-8">VIDEO INTERVIEW</h2>
            <ol className="space-y-0">
              {steps.map((step, idx) => (
                <li key={idx} className="flex flex-row items-start mb-2">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center w-12 relative">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full z-10
                        ${
                          idx < currentStep
                            ? 'bg-[#70C0B8] text-white border-2 border-[#70C0B8]'
                            : idx === currentStep
                              ? 'bg-[#70C0B8] text-white border-2 border-[#70C0B8]'
                              : 'bg-white text-[#70C0B8] border-2 border-[#70C0B8]'
                        }
                      `}
                    >
                      {idx < currentStep ? (
                        <Check className="h-5 w-5 text-white" />
                      ) : (
                        <span className="font-bold text-base">{idx + 1}</span>
                      )}
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`w-1 h-12 mx-auto
                          ${idx < currentStep ? 'bg-[#70C0B8]' : 'bg-[#e5e7eb]'}
                        `}
                      />
                    )}
                  </div>
                  {/* Text column */}
                  <div className="flex-1 min-w-0 pl-2 pt-1">
                    <div
                      className={`font-semibold text-[15px] ${idx === currentStep ? 'text-[#364699]' : 'text-[#6b7280]'}`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-[#9ca3af]">{step.description}</div>
                    {/* Step 1 Summary */}
                    {idx === 0 && currentStep > 0 && (
                      <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                        <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div>{testName}</div>
                          <div className="text-[#6b7280] font-normal">{numQuestions} Questions</div>
                        </div>
                      </div>
                    )}
                    {/* Step 2 Summary */}
                    {idx === 1 && currentStep > 1 && (
                      <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                        <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div>
                            {useDefaultIntro
                              ? 'Default Intro Video'
                              : customIntro
                                ? 'Custom Intro'
                                : 'No Intro'}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Step 3 Summary */}
                    {idx === 2 && currentStep > 2 && (
                      <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                        <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div>Questions Added</div>
                          <div className="text-[#6b7280] font-normal">
                            {questions.filter(q => q.trim()).length} of {questions.length}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Step 4 Summary */}
                    {idx === 3 && currentStep > 3 && (
                      <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                        <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div>
                            {concludingMaterial
                              ? 'Concluding Material Added'
                              : 'No Concluding Material'}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Step 5 Summary */}
                    {idx === 4 && currentStep > 4 && (
                      <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                        <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div>Schedule Configured</div>
                          <div className="text-[#6b7280] font-normal">
                            {startDate} - {endDate}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Step 6 Summary */}
                    {idx === 5 && currentStep > 5 && (
                      <div className="mt-2 bg-white border rounded-[12px] px-3 py-2 text-[#333333] text-xs font-semibold flex items-center gap-2">
                        <div className="bg-[#70C0B8] border border-[#00A59B] rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div>Rating System</div>
                          <div className="text-[#6b7280] font-normal">
                            {ratingsEnabled ? 'Enabled' : 'Disabled'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {/* Right Form */}
          <div className="flex-1 flex flex-col items-start justify-center w-full px-20">
            {stepContent}
            {/* Navigation Buttons */}
            <div className="flex items-center gap-4 mt-8 justify-end w-full">
              {currentStep > 0 && (
                <button
                  className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 font-semibold"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </button>
              )}
              {currentStep < steps.length - 1 && (
                <button
                  className="bg-[#364699] text-white rounded-full py-2 font-semibold w-[100px]"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </button>
              )}
              {currentStep === steps.length - 1 && (
                <button className="bg-[#364699] text-white rounded-full py-2 font-semibold w-[100px]">
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
