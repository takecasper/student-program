'use client';
import Image from 'next/image';
import { useState } from 'react';

interface CasperTestInterfaceProps {
  onBack: () => void;
}

export default function CasperTestInterface({ onBack }: CasperTestInterfaceProps) {
  const [currentSection, setCurrentSection] = useState('intro');

  const trackerItems = {
    intro: { label: 'Intro', completed: true },
    videoResponses: [
      { label: 'Video Response 1', completed: false },
      { label: 'Video Response 2', completed: false },
      { label: 'Video Response 3', completed: false },
      { label: 'Video Response 4', completed: false },
      { label: 'Video Response 5', completed: false },
      { label: 'Video Response 6', completed: false },
    ],
    break: { label: 'Break', completed: false },
    typedResponses: [
      { label: 'Typed Response 1', completed: false },
      { label: 'Typed Response 2', completed: false },
      { label: 'Typed Response 3', completed: false },
      { label: 'Typed Response 4', completed: false },
      { label: 'Typed Response 5', completed: false },
    ],
    exit: { label: 'Exit', completed: false },
  };

  const renderIntroSection = () => (
    <div className=" w-full bg-white rounded-lg">
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

          <ul className="text-left text-gray-600 space-y-2 max-w-md">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-xs">
                It will take approximately 1.5 hours to complete this practice test.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-xs">
                You will get your score after completion of the practice test.
              </span>
            </li>
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
              onClick={() => setCurrentSection('videoResponses')}
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
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm border p-8">
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
    <div className="min-h-screen bg-gray-50 flex">
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
        <div className="flex-1 flex items-center justify-center p-8">
          {currentSection === 'intro' && renderIntroSection()}
          {currentSection === 'videoResponses' && renderVideoResponsesSection()}
        </div>
      </div>

      {/* Right Sidebar - Tracker */}
      <div className="w-80 bg-white border-l p-6 space-y-6">
        <h3 className="font-semibold text-gray-800 text-xs">Tracker</h3>

        {/* Intro */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${currentSection === 'intro' ? 'bg-blue-600' : 'bg-gray-300'}`}
            ></div>
            <span className="text-xs font-medium text-gray-800">Intro</span>
          </div>
        </div>

        {/* Video Responses */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${currentSection === 'videoResponses' ? 'bg-blue-600' : 'bg-gray-300'}`}
            ></div>
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Video Responses
            </h4>
          </div>
          <div className="space-y-2">
            {trackerItems.videoResponses.map((item, index) => (
              <div key={index} className="flex items-center gap-2 pl-4">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-xs text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Break */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Break</h4>
        </div>

        {/* Typed Responses */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Typed Responses
          </h4>
          <div className="space-y-2">
            {trackerItems.typedResponses.map((item, index) => (
              <div key={index} className="flex items-center gap-2 pl-4">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-xs text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exit */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Exit</h4>
        </div>
      </div>
    </div>
  );
}
