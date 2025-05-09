/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import SetupRotationStepOne from './SetupRotationStepOne';
import SetupRotationStepTwo from './SetupRotationStepTwo';
import SetupRotationStepFinal from './SetupRotationStepFinal';

type SetupRotationProps = {
  setIsSettingUpRotation: (isConfiguring: boolean) => void;
};

const SetupRotation = ({ setIsSettingUpRotation }: SetupRotationProps) => {
  const [activeTab, setActiveTab] = useState<'INFO' | 'DAILY AVAILABILITY' | 'FINISH'>('INFO');

  const buttons = ['INFO', 'DAILY AVAILABILITY'];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Button
          onClick={() => setIsSettingUpRotation(false)}
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
          <Button
            className="border-2 border-[#D9D9D9] rounded-[20px] bg-[#364799] text-white cursor-pointer hover:bg-[#D9D9D9] hover:text-white"
            onClick={() => setIsSettingUpRotation(false)}
          >
            Done
          </Button>
        </div>
      </div>

      <div className="w-full flex gap-2 items-start">
        <div className="w-[70%] shrink-0 h-[80vh]">
          <div className="rounded-[10px] overflow-hidden">
            <div className="px-4 py-3 text-[14px] font-bold text-gray-600 bg-[#D9D9D933] uppercase tracking-wide rounded-t-md select-none">
              <h2 className="text-gray-600 text-[14px] font-semibold tracking-wide">
                ROTATION LIST
              </h2>
            </div>
            <div className="bg-[#D9D9D91A] flex flex-col items-center justify-center h-[calc(80vh-48px)] text-center px-4">
              <p className="text-black font-semibold text-sm leading-tight">Nothing here yet</p>
              <p className="text-gray-500 text-xs mt-1 max-w-[240px]">
                Once you finish settings, the rotation plan will be shown here
              </p>
            </div>
          </div>
        </div>
        <div className="w-[30%] shrink-0 h-[80vh]">
          <div className="bg-white rounded-xl w-full h-full max-w-xs shadow-sm">
            <div className="px-4 py-3 text-[14px] flex items-center justify-between font-bold text-gray-600 bg-[#D9D9D933] uppercase tracking-wide rounded-t-md select-none">
              <h2 className="text-gray-600 text-[14px] font-semibold tracking-wide">SETTINGS</h2>

              <Button
                aria-label="Close"
                className="text-gray-400 bg-transparent hover:bg-transparent p-0 m-0 w-[24px] h-[24px] flex items-center justify-center cursor-pointer"
              >
                <Image src={'/svgs/close_small.svg'} alt="Close" width={16} height={16} />
              </Button>
            </div>

            <div className="px-4 py-4 h-[calc(80vh-48px)] bg-[#fbfbfb]">
              {activeTab !== 'FINISH' && (
                <div className="flex space-x-2 mb-6">
                  {buttons.map(button => (
                    <Button
                      key={button}
                      type="button"
                      onClick={() => setActiveTab(button as 'INFO' | 'DAILY AVAILABILITY')}
                      className={`flex items-center cursor-pointer border-[#D9D9D9] hover:bg-[#2F4489] hover:text-white hover:border-[#D9D9D9] space-x-1 ${
                        activeTab === button
                          ? 'bg-[#2F4489] text-white'
                          : 'bg-white text-[#333333DE]'
                      } text-xs font-semibold rounded-full px-3 py-1`}
                    >
                      <Image
                        alt="flag"
                        width={16}
                        height={16}
                        src={`/svgs/${activeTab === button ? 'white_golf_course' : 'golf_course'}.svg`}
                      />
                      <span>{button}</span>
                    </Button>
                  ))}
                </div>
              )}

              {activeTab === 'INFO' && <SetupRotationStepOne setActiveTab={setActiveTab} />}

              {activeTab === 'DAILY AVAILABILITY' && (
                <SetupRotationStepTwo setActiveTab={setActiveTab} />
              )}

              {activeTab === 'FINISH' && <SetupRotationStepFinal />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupRotation;
