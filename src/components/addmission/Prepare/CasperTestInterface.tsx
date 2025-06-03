'use client';
import Image from 'next/image';
import { useState } from 'react';

interface CasperTestInterfaceProps {
  onBack: () => void;
}

const initialCheckSteps = [
  { label: 'Intro', completed: false },
  {
    label: 'Video Responses',
    children: [
      { label: 'Video Response 1', completed: false },
      { label: 'Video Response 2', completed: false },
      { label: 'Video Response 3', completed: false },
      { label: 'Video Response 4', completed: false },
      { label: 'Video Response 5', completed: false },
      { label: 'Video Response 6', completed: false },
    ],
  },
  { label: 'Break', completed: false },
  {
    label: 'Typed Responses',
    children: [
      { label: 'Typed Response 1', completed: false },
      { label: 'Typed Response 2', completed: false },
      { label: 'Typed Response 3', completed: false },
      { label: 'Typed Response 4', completed: false },
      { label: 'Typed Response 5', completed: false },
      { label: 'Break', completed: false },
      { label: 'Typed Response 6', completed: false },
      { label: 'Typed Response 7', completed: false },
      { label: 'Typed Response 8', completed: false },
      { label: 'Typed Response 9', completed: false },
      { label: 'Typed Response 10', completed: false },

      { label: 'Typed Response 1', completed: false },
      { label: 'Typed Response 2', completed: false },
      { label: 'Typed Response 3', completed: false },
      { label: 'Typed Response 4', completed: false },
      { label: 'Typed Response 5', completed: false },
      { label: 'Break', completed: false },
      { label: 'Typed Response 6', completed: false },
      { label: 'Typed Response 7', completed: false },
      { label: 'Typed Response 8', completed: false },
      { label: 'Typed Response 9', completed: false },
      { label: 'Typed Response 10', completed: false },
      { label: 'Typed Response 1', completed: false },
      { label: 'Typed Response 2', completed: false },
      { label: 'Typed Response 3', completed: false },
      { label: 'Typed Response 4', completed: false },
      { label: 'Typed Response 5', completed: false },
      { label: 'Break', completed: false },
      { label: 'Typed Response 6', completed: false },
      { label: 'Typed Response 7', completed: false },
      { label: 'Typed Response 8', completed: false },
      { label: 'Typed Response 9', completed: false },
      { label: 'Typed Response 10', completed: false },
    ],
    completed: false,
  },
  { label: 'Exit', completed: false },
];

interface StepItem {
  label: string;
  completed?: boolean;
  children?: StepItem[];
}

export default function CasperTestInterface({ onBack }: CasperTestInterfaceProps) {
  const [currentSection, setCurrentSection] = useState('intro');

  const [checkSteps, setCheckStep] = useState<StepItem[]>(initialCheckSteps);

  const renderIntroSection = () => (
    <div className=" w-[850px] bg-white rounded-lg">
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 pb-2">
            <div className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center">
              <Image src="/hotel_class.svg" alt="icon" width={16} height={16} />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Recommend</p>
              <h1 className="text-xl font-semibold text-gray-800">Casper Practice Test</h1>
            </div>
          </div>
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <div className="text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <p className="text-xs text-center">Video Content Area</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs text-start font-semibold text-gray-800">
            This is a sample full Casper test to give you practice.
          </h2>

          <p className="text-gray-600 text-xs text-start">For this practice test:</p>

          <ul className="text-xs text-gray-600 space-y-1 text-start">
            <li>• It will take approximately 1.5 hours to complete this practice test.</li>
            <li>• You will get your score after completion of the practice test.</li>
          </ul>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-gray-600 mb-4 text-start">
              The following pages will describe the exact experience and format of a real Casper
              test.
            </p>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 text-xs text-start">
                Selection criteria during your Casper test:
              </h3>
              <ul className="text-xs text-gray-600 space-y-1 text-start">
                <li>• Time period</li>
                <li>• Situational judgment</li>
                <li>• Professionalism</li>
                <li>• New authentic scenarios and content</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => {
                setCurrentSection('videoResponses');
                checkSteps[0].completed = true;
                setCheckStep(checkSteps);
              }}
              className="bg-[#364699] text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition text-xs"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVideoResponsesSection = () => (
    <div className="max-w-2xl w-full bg-white rounded-lg p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 pb-2">
          <div className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center">
            <Image src="/hotel_class.svg" alt="icon" width={16} height={16} />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-600">Recommend</p>
            <h1 className="text-xl font-semibold text-gray-800">Casper Practice Test</h1>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-gray-800">
          You are about to start the Video Response section
        </h1>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Please familiarize yourself with the video response guidelines below.
          </p>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Format guidelines:</h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>It will take approximately 1.5 hours to complete this practice test.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>You will get a score after completion of this practice test.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  All scenarios are fictional and any resemblance to real people or events is purely
                  coincidental. The recording will automatically stop within the 90 seconds time
                  limit.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>90 seconds to record a response.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-semibold text-gray-800">Technical guidelines:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  If you face an error or if you are stuck on a page, please refresh the
                  instructions on the page or contact our Support Team.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  Unless instructed to do so to resolve a technical issue, please do not refresh or
                  close this page.
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-600">
              Once you&apos;re ready, please click on the &quot;Next&quot; button to start your
              Video Response section.
            </p>
          </div>

          <div className="flex justify-between items-center pt-6">
            <button
              onClick={() => setCurrentSection('intro')}
              className="px-6 py-2 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition text-sm"
            >
              Back
            </button>
            <button className="bg-[#364699] text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-xs">Back</span>
            </button>
          </div>
        </div>

        {/* Test Content */}
        <div className="flex-1 flex mb-auto bg-white justify-center p-8">
          {currentSection === 'intro' && renderIntroSection()}
          {currentSection === 'videoResponses' && renderVideoResponsesSection()}
        </div>
      </div>

      {/* Right Sidebar - Tracker */}
      <div className="w-80 bg-white border-l p-6 overflow-auto max-h-[calc(100vh-115px)]">
        <h1 className="font-semibold text-xl text-gray-800 mb-2">Tracker</h1>

        {checkSteps.map((item, i) => {
          const isCompleted = item.completed; // mark only first step as completed
          return (
            <div key={i} className="flex flex-col">
              <div className="flex gap-4.5 items-center">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border-2  ${
                    isCompleted ? 'bg-[#364697] text-white' : 'bg-[#F5F5F5] text-[#364697]'
                  }`}
                ></div>
                <span
                  className="text-lg font-bold cursor-pointer text-gray-500"
                  onClick={() => {
                    const updatedSteps = checkSteps.map(step =>
                      step.label === item.label ? { ...step, completed: true } : step,
                    );
                    setCheckStep(updatedSteps);
                  }}
                >
                  {item.label}
                </span>
              </div>
              <div
                className={`pb-4 border-l-6 ml-[7px] my-0.5 pl-6.5 ${
                  checkSteps.length === i + 1
                    ? 'border-none'
                    : isCompleted
                      ? 'border-[#364697]'
                      : 'border-[#F5F5F5]'
                }`}
              >
                {item.children && (
                  <div className="space-y-2">
                    {item.children.map((child, index) => (
                      <div key={index} className="flex items-center gap-2 pl-4">
                        <div
                          className={`w-2 h-2 rounded-full  ${child.completed ? 'bg-[#364697]' : 'bg-gray-300'}`}
                        ></div>
                        <span className="text-xs text-gray-600">{child.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
