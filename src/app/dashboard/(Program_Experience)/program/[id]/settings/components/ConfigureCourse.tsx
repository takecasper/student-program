/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '@/components/ui/table';
import FormBuilder from './FormBuilder';

type CourseConfigureProps = {
  setIsConfiguring: (isConfiguring: boolean) => void;
};

const tabs = ['SESSION', 'GRADES', 'HANDOUTS', 'EVAL', 'PEOPLE'];

const templates = [
  { id: 1, name: 'Basic Form', selected: true },
  { id: 2, name: 'Survey Form', selected: false },
  { id: 3, name: 'Assessment', selected: false },
  { id: 4, name: 'Feedback', selected: false },
  { id: 5, name: 'Quiz', selected: false },
];

const formElements = [
  { id: 1, name: 'Text Input', icon: '/svgs/text-input.svg' },
  { id: 2, name: 'Textarea', icon: '/svgs/textarea.svg' },
  { id: 3, name: 'Radio Button', icon: '/svgs/radio.svg' },
  { id: 4, name: 'Checkbox', icon: '/svgs/checkbox.svg' },
  { id: 5, name: 'Dropdown', icon: '/svgs/dropdown.svg' },
  { id: 6, name: 'Date Picker', icon: '/svgs/date.svg' },
];

const CourseConfigure = ({ setIsConfiguring }: CourseConfigureProps) => {
  const [activeTab, setActiveTab] = useState('SESSION');
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [elementsExpanded, setElementsExpanded] = useState(true);

  const handleAddClick = () => {
    if (activeTab === 'EVAL') {
      setShowFormBuilder(true);
    }
  };

  // If form builder is shown, render it as a full screen overlay
  if (showFormBuilder) {
    return <FormBuilder />;
  }

  const renderFormBuilder = () => {
    return (
      <div className="bg-white rounded-lg h-[calc(100%-56px)] flex">
        {/* Left side - Templates */}
        <div className="w-1/2 p-6 border-r border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">TEMPLATE</span>
              <Image
                width={12}
                height={12}
                alt="dropdown"
                className="object-fit"
                src="/svgs/chevron-down.svg"
              />
            </div>
            <div className="text-sm text-gray-500">FORM BUILDER</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {templates.map(template => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
                <div className="bg-gray-100 rounded h-20 mb-3 flex items-center justify-center">
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-300 rounded w-16"></div>
                    <div className="h-2 bg-gray-300 rounded w-12"></div>
                    <div className="h-2 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center">{template.name}</div>
              </div>
            ))}
          </div>

          <Button
            className="w-full mt-4 text-gray-600 border-2 border-dashed border-gray-300 bg-transparent hover:bg-gray-50"
            variant="ghost"
          >
            <span className="text-xl mr-2">+</span>
            Add Template
          </Button>
        </div>

        {/* Right side - Form Builder */}
        <div className="w-1/2 p-6">
          {/* Elements Section */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setElementsExpanded(!elementsExpanded)}
            >
              <span className="text-sm font-medium text-gray-700 uppercase">ELEMENTS</span>
              <Image
                width={12}
                height={12}
                alt="toggle"
                className={`object-fit transition-transform ${
                  elementsExpanded ? 'rotate-180' : ''
                }`}
                src="/svgs/chevron-down.svg"
              />
            </div>

            {elementsExpanded && (
              <div className="mt-4 space-y-2">
                {formElements.map(element => (
                  <div
                    key={element.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    </div>
                    <span className="text-sm text-gray-700">{element.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Preview */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
            <div className="text-gray-400 text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-gray-500 text-xl">📝</span>
              </div>
              <p className="text-sm">Drag elements here to build your form</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDefaultContent = () => {
    return (
      <div className="bg-gray-50 rounded-lg h-[calc(100%-56px)] flex flex-col justify-center items-center">
        <Button
          aria-label="Add new session"
          className="bg-gray-200 hover:bg-gray-300 rounded-lg w-12 h-12 flex justify-center items-center mb-3 p-0"
          variant="ghost"
          onClick={handleAddClick}
        >
          <span className="text-gray-600 text-2xl font-thin">+</span>
        </Button>
        <p className="text-gray-500 text-sm font-sans text-center">
          Click on &apos;add&apos; to start to add new {activeTab.toLowerCase()}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Button
          onClick={() => setIsConfiguring(false)}
          className="shadow-none flex items-center gap-3 bg-transparent hover:bg-transparent cursor-pointer text-[#4e4e4e]"
        >
          <Image
            width={16}
            height={16}
            alt="Program"
            className="object-fit"
            src={`/svgs/left arrow.svg`}
          />
          <h4 className="m-0 text-[12px] text-[#4f4f4f] font-medium">GO BACK </h4>
        </Button>

        <div className="flex items-center gap-3">
          <Button className="border-2 border-[#364699] rounded-[20px] bg-white text-[#364699] cursor-pointer hover:bg-[#364699] hover:text-white">
            Review
          </Button>
          <Button
            className="border-2 border-[#D9D9D9] rounded-[20px] bg-[#364799] text-white cursor-pointer hover:bg-[#D9D9D9] hover:text-white"
            onClick={() => setIsConfiguring(false)}
          >
            Done
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="bg-[#F5F5F5] rounded-[20px] border-[2px] overflow-hidden border-[#F5F5F5] w-[50px] h-[50px] flex items-center justify-center">
          <Image
            width={16}
            height={16}
            alt="Program"
            className="object-fit"
            src={`/svgs/stars.svg`}
          />
        </div>

        <h2 className="text-[#858585] font-regular text-[12px] text-left">
          Course Jan 28, 2025 - Feb 2, 2025
          <span className="block font-bold text-[20px]">Physiology</span>
        </h2>
      </div>

      <div className="flex w-full gap-2">
        <div className="w-[45%]">
          <section
            style={{ aspectRatio: '16 / 9' }}
            className="bg-[#f3f5f4] mb-3 rounded-[20px] p-12 flex flex-col items-center justify-center cursor-pointer w-full"
          >
            <button
              aria-label="Upload course summary video"
              className="bg-white p-2 rounded border-[#ebebeb] border-1 flex items-center justify-center text-gray-600 hover:text-gray-800"
            >
              <Image
                width={24}
                height={24}
                alt="Program"
                className="object-fit"
                src={`/svgs/upload.svg`}
              />
            </button>
            <p className="mt-3 text-[#949494] text-[14px] select-none">
              Upload course summary video
            </p>
          </section>

          <section className="bg-white mb-3 rounded-xl p-6 border border-gray-200">
            <h2 className="text-xs font-semibold text-gray-600 uppercase mb-4 select-none">
              General Info
            </h2>
            <form className="space-y-4">
              <div className="flex items-center space-x-3">
                <label htmlFor="runsFrom" className="text-sm text-gray-600 w-28 select-none">
                  Runs From:
                </label>
                <input
                  id="runsFrom"
                  type="text"
                  className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div className="flex items-center space-x-3">
                <label htmlFor="facilitators" className="text-sm text-gray-600 w-28 select-none">
                  Facilitators:
                </label>
                <input
                  id="facilitators"
                  type="text"
                  className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div className="flex items-center space-x-3">
                <label htmlFor="gradYear" className="text-sm text-gray-600 w-28 select-none">
                  Grad Year:
                </label>
                <input
                  id="gradYear"
                  type="text"
                  className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </form>
          </section>

          <section className="bg-white rounded-xl p-4 border border-gray-200">
            <h2 className="text-xs font-semibold text-gray-600 uppercase mb-3 select-none">
              Course Objective (5)
            </h2>
            <div
              className="bg-[#f3f5f4] rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer"
              style={{ aspectRatio: '16 / 4' }}
            >
              <button
                aria-label="Upload course summary video"
                className="bg-white p-2 rounded border-[#ebebeb] border-1 flex items-center justify-center text-gray-600 hover:text-gray-800"
              >
                <Image
                  width={24}
                  height={24}
                  alt="Program"
                  className="object-fit"
                  src={`/svgs/upload.svg`}
                />
              </button>
              <p className="mt-3 text-sm text-gray-500 select-none">Upload course objective</p>
            </div>
          </section>
        </div>

        <div className="w-[1px] h-auto"></div>

        <div className="w-[55%] ">
          <div role="tablist" aria-label="Session tabs" className="flex space-x-3 mb-5">
            {tabs.map(tab => (
              <Button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                className={`flex hover:bg-[#364699] hover:text-white border border-[#D9D9D9] items-center cursor-pointer space-x-1 gap-1 rounded-full px-4 py-2 text-xs font-sans ${
                  activeTab === tab ? 'bg-[#364699] text-white ' : ' text-[#4f4f4f] bg-white'
                }`}
                variant="ghost"
              >
                <Image
                  width={14}
                  height={14}
                  alt="Program"
                  className="object-fit"
                  src={`${activeTab === tab ? '/svgs/white_golf_course.svg' : '/svgs/golf_course.svg'}`}
                />

                <span>{tab}</span>
              </Button>
            ))}
          </div>

          {showFormBuilder && activeTab === 'EVAL' ? renderFormBuilder() : renderDefaultContent()}
        </div>
      </div>
    </div>
  );
};

export default CourseConfigure;
