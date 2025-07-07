import React, { useState } from 'react';
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

const QuestionDrawer = ({ open, onClose, numberOfQuestions }: QuestionDrawerProps) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customTab, setCustomTab] = useState<'video' | 'text'>('video');

  // Handler to reset custom mode (e.g., on cancel)
  const handleCancelCustom = () => {
    setIsCustomMode(false);
  };

  return (
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
                    <SelectItem value="all">Competency Focus</SelectItem>
                    <SelectItem value="text">Professional Context</SelectItem>
                    <SelectItem value="video">Skill Focus</SelectItem>
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
              {Array.from({ length: numberOfQuestions }).map((_, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white">
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
                      <p className="text-sm text-gray-900">
                        What makes you a good fit for this school?
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className="px-2 py-0.5 text-xs rounded-md text-white bg-[#00BFB3]">
                          Communication
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-md text-white bg-[#F5A623]">
                          Empathy
                        </span>
                      </div>
                    </div>
                    <button className="p-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
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
            <div className="flex items-center justify-between mb-4">
              <label className="block mb-1 text-sm">Skill Focus</label>
              <Select>
                <SelectTrigger className="rounded-[12px] ">
                  <SelectValue placeholder="Select Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="empathy">Empathy</SelectItem>
                  <SelectItem value="teamwork">Teamwork</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="block mb-1 text-sm">Professional Context</label>
              <Select>
                <SelectTrigger className="rounded-[12px] ">
                  <SelectValue placeholder="Select Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clinical">Clinical</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
  );
};

export default QuestionDrawer;
