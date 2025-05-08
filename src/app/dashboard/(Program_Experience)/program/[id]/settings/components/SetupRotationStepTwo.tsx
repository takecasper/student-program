import React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';

const days = [
  {
    name: 'Monday',
    selected: true,
    mode: 'Full',
    time: '8:00am — 12:00pm',
  },
  {
    name: 'Tuesday',
    selected: true,
    mode: 'AM',
    time: '8:00am — 11:00am',
  },
  {
    name: 'Wednesday',
    selected: true,
    mode: 'PM',
    time: '1:00pm — 5:00pm',
  },
  {
    name: 'Friday',
    selected: true,
    mode: 'Overnight',
    time: '8:00pm — 5:00am',
  },
  {
    name: 'Saturday',
    selected: false,
    mode: 'Full',
    time: '8:00am — 12:00pm',
  },
  {
    name: 'Sunday',
    selected: false,
    mode: 'Full',
    time: '8:00am — 12:00pm',
  },
];

const SetupRotationStepTwo = () => {
  return (
    <div className="max-w-[320px] mx-auto mt-10 bg-white rounded-lg shadow-md p-4 select-none">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[12px] font-normal text-[#4B4B4B]">SETTINGS</span>
        <Button variant="ghost" size="icon" className="text-[#9B9B9B] h-auto p-0 text-[12px]">
          <i className="fas fa-times"></i>
        </Button>
      </div>

      <div className="flex space-x-1.5 mb-6">
        <Button
          variant="outline"
          className="text-[#4B4B4B] border-[#D1D1D1] text-[10px] font-normal h-auto px-[10px] py-[6px] rounded-full"
        >
          <i className="fas fa-clock text-[10px] mr-1"></i>
          INFO
        </Button>
        <Button className="bg-[#2F4098] text-white text-[10px] font-normal h-auto px-[10px] py-[6px] rounded-full">
          <i className="fas fa-clock text-[10px] mr-1"></i>
          DAILY AVAILABILITY
        </Button>
      </div>

      <div className="grid grid-cols-[30px_1fr_1fr] gap-x-2 text-[12px] font-normal text-[#4B4B4B] mb-3">
        <div>
          <Checkbox disabled className="cursor-default" />
        </div>
        <div>Day</div>
        <div>Time</div>
      </div>

      <div className="space-y-3">
        {days.map(day => (
          <div key={day.name} className="grid grid-cols-[30px_1fr_1fr] gap-x-2 items-center">
            <div>
              {day.selected ? (
                <div className="w-4 h-4 rounded-full bg-[#2F4098] mx-auto" />
              ) : (
                <Checkbox aria-label={`${day.name} availability`} className="mx-auto" />
              )}
            </div>
            <div className="text-[12px] text-[#4B4B4B] font-normal">{day.name}</div>
            <div className="flex space-x-2 items-center">
              <Select disabled={!day.selected} defaultValue={day.mode}>
                <SelectTrigger
                  className={`w-[72px] h-[32px] text-[12px] font-normal px-2 ${!day.selected ? 'bg-[#F0F0F0] text-[#9B9B9B] cursor-not-allowed' : 'text-[#4B4B4B]'}`}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full">Full</SelectItem>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                  <SelectItem value="Overnight">Overnight</SelectItem>
                </SelectContent>
              </Select>
              <div
                className={`w-[110px] h-[32px] rounded-md border border-[#D1D1D1] text-[12px] font-normal px-3 flex items-center justify-between ${!day.selected ? 'bg-[#F0F0F0] text-[#9B9B9B] cursor-not-allowed' : 'text-[#4B4B4B]'}`}
              >
                <span>{day.time.split(' — ')[0]}</span>
                <span className="text-[#9B9B9B]">—</span>
                <span>{day.time.split(' — ')[1]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-10 w-full bg-[#2F4098] text-white text-[12px] font-normal py-3 rounded-full">
        Create
      </Button>
    </div>
  );
};

export default SetupRotationStepTwo;
