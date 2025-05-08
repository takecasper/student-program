import React from 'react';
import Image from 'next/image';

const SetupRotationStepFinal = () => {
  return (
    <div className="px-5 text-center">
      <div className="mx-auto w-[70px] h-[70px] rounded-full bg-[#009688] flex items-center justify-center mb-5">
        <Image width={48} height={48} alt="Program" src={`/svgs/check_small.svg`} />
      </div>

      <h3 className="text-[16px] font-bold text-[#4b4b4b] mb-1">Meets Schedule Requirements</h3>
      <p className="text-[13px] font-normal text-[#4b4b4b] mb-7">56/56</p>
      <p className="text-[11px] font-normal text-[#4b4b4b] mb-3 text-left border-b border-[#d1d5db] pb-2">
        Overview
      </p>
      <div className="text-[11px] font-normal text-[#4b4b4b] space-y-2 text-left">
        <div className="flex justify-between">
          <span>Monday</span>
          <span>08:00 AM - 12:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Tuesday</span>
          <span>08:00 AM - 12:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Wednesday</span>
          <span>08:00 AM - 12:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Thursday</span>
          <span>08:00 AM - 12:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Friday</span>
          <span>08:00 AM - 12:00 PM</span>
        </div>
      </div>
    </div>
  );
};

export default SetupRotationStepFinal;
