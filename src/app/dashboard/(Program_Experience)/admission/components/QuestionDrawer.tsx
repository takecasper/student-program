import React from 'react';
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
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[600px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left">From Question Bank</SheetTitle>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="english">
              <TabsList className="w-full">
                <TabsTrigger value="english" className="w-full">
                  English
                </TabsTrigger>
                <TabsTrigger value="french" className="w-full">
                  French
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center justify-between">
            <Select defaultValue="all">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select Scenario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Scenario 1</SelectItem>
                <SelectItem value="text">Scenario 2</SelectItem>
                <SelectItem value="video">Scenario 3</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-[#364699] text-white">
              Add Custom
              <Image src="/svgs/plus.svg" alt="plus" width={16} height={16} />
            </Button>
          </div>
        </SheetHeader>

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
      </SheetContent>
    </Sheet>
  );
};

export default QuestionDrawer;
