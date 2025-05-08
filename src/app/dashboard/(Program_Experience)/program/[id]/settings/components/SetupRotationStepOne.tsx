import React from 'react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const SetupRotationStepOne = () => {
  return (
    <form className="space-y-5 text-gray-600 text-xs font-normal">
      <div>
        <Label htmlFor="rotationName" className="mb-1 font-semibold block">
          Rotation Name
        </Label>
        <Input
          id="rotationName"
          type="text"
          placeholder="Type Name"
          className="text-xs text-gray-400 placeholder-gray-400 h-[40px] border-[#2F4489] focus:ring-[#2F4489] focus:border-[#2F4489]"
        />
      </div>

      <div>
        <Label htmlFor="scheduleFor" className="mb-1 font-semibold block">
          Schedule for
        </Label>
        <Input
          readOnly
          type="text"
          id="scheduleFor"
          value="Program Name/Year 3"
          className="text-xs text-gray-600 h-[40px] border-gray-300 bg-white cursor-default"
        />
      </div>

      <div>
        <Label htmlFor="faculty" className="mb-1 font-semibold block">
          Faculty
        </Label>
        <div className="relative">
          <Input
            id="faculty"
            type="text"
            placeholder="Select Faculty"
            className="text-xs text-gray-400 h-[40px] placeholder-gray-400 border-gray-300 pl-9 focus:ring-[#2F4489] focus:border-[#2F4489]"
          />
          <Image
            width={16}
            height={16}
            alt="Program"
            src={`/svgs/search.svg`}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="studentGroup" className="mb-1 font-semibold block">
          Student Group
        </Label>
        <div className="relative">
          <Input
            id="studentGroup"
            type="text"
            placeholder="Select Faculty"
            className="text-xs text-gray-400 h-[40px] placeholder-gray-400 border-gray-300 pl-9 focus:ring-[#2F4489] focus:border-[#2F4489]"
          />
          <Image
            width={16}
            height={16}
            alt="Program"
            src={`/svgs/search.svg`}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="site" className="mb-1 font-semibold block">
          Site
        </Label>
        <div className="relative">
          <Input
            id="site"
            type="text"
            placeholder="Select one or more"
            className="text-xs text-gray-400 h-[40px] placeholder-gray-400 border-gray-300 pl-9 focus:ring-[#2F4489] focus:border-[#2F4489]"
          />
          <Image
            width={16}
            height={16}
            alt="Program"
            src={`/svgs/search.svg`}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="minCapacity" className="mb-1 font-semibold block">
            Min Capacity
          </Label>
          <Input
            id="minCapacity"
            type="text"
            placeholder="Enter"
            className="text-xs h-[40px] text-gray-600 border-gray-300 focus:ring-[#2F4489] focus:border-[#2F4489]"
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="maxCapacity" className="mb-1 font-semibold block">
            Max Capacity
          </Label>
          <Input
            id="maxCapacity"
            type="text"
            placeholder="Enter"
            className="text-xs h-[40px] text-gray-600 border-gray-300 focus:ring-[#2F4489] focus:border-[#2F4489]"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#2F4489] cursor-pointer hover:bg-[#2f4489]/90 text-white text-xs font-semibold rounded-full py-2 mt-2"
      >
        Create
      </Button>
    </form>
  );
};

export default SetupRotationStepOne;
