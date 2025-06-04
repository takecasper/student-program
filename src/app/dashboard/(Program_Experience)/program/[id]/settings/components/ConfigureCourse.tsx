/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import React, { useState } from 'react';

import LearnersTab from './LearnersTab';
import EvaluationTab from './EvaluationTab';

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
  isSettingUpEvaluationForms: boolean;
  setIsConfiguring: (isConfiguring: boolean) => void;
  setIsSettingUpEvaluationForms: React.Dispatch<React.SetStateAction<boolean>>;
};

const tabs = ['SESSION', 'GRADES', 'HANDOUTS', 'EVAL', 'LEARNER'];

const CourseConfigure = ({
  setIsConfiguring,
  isSettingUpEvaluationForms,
  setIsSettingUpEvaluationForms,
}: CourseConfigureProps) => {
  const [activeTab, setActiveTab] = useState('SESSION');

  return (
    <div className='w-full'>
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

      <div className="flex w-full gap-3">
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

        <div className="w-[1px] bg-[#F5F5F5]"></div>

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

          {activeTab === 'LEARNER' && <LearnersTab />}

          {activeTab === 'EVAL' && (
            <EvaluationTab
              isSettingUpEvaluationForms={isSettingUpEvaluationForms}
              setIsSettingUpEvaluationForms={setIsSettingUpEvaluationForms}
            />
          )}

          {activeTab === 'SESSION' && (
            <div className="bg-gray-50 rounded-lg h-[calc(100%-56px)] flex flex-col justify-center items-center">
              <Button
                aria-label="Add new session"
                className="bg-gray-200 hover:bg-gray-300 rounded-lg w-12 h-12 flex justify-center items-center mb-3 p-0"
                variant="ghost"
              >
                <span className="text-gray-600 text-2xl font-thin">+</span>
              </Button>
              <p className="text-gray-500 text-sm font-sans text-center">
                Click on &apos;add&apos; to start to add new session
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseConfigure;
