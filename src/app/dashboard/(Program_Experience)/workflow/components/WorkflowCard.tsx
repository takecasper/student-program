import React from 'react';
import { UserCircle } from 'lucide-react';

import { Switch } from '@/components/ui/switch';

const WorkflowCard = ({
  title,
  steps,
  author,
  date,
}: {
  title: string;
  steps: number;
  author: string;
  date: string;
}) => {
  return (
    <div className="rounded-lg border border-gray-200 shadow-md p-4 flex flex-col justify-between bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold border border-gray-300 text-gray-600 px-2 py-0.5 rounded-full">
          DEFAULT
        </span>
        <Switch
          defaultChecked
          className="cursor-pointer bg-[#f5f5f5] data-[state=checked]:bg-[#364699] text-[#d9d9d9] border-[#d9d9d9] border"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{steps} Steps</p>
      </div>

      <div className="flex items-start text-sm text-gray-500 mt-auto gap-1">
        <UserCircle className="w-[14px] h-[14px] mt-[2px] text-[#4e4e4e]" />

        <div className='flex flex-col items-start'>
          <span className='text-[12px] text-[#4e4e4e]'>By {author}</span>
          <span className='text-[10px] text-[#858585]'>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;
