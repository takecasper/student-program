import React, { useState, Dispatch, SetStateAction, FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';

const initialDays = [
  { name: 'Monday', selected: true, mode: 'Full', time: '8:00am — 12:00pm' },
  { name: 'Tuesday', selected: true, mode: 'AM', time: '8:00am — 11:00am' },
  { name: 'Wednesday', selected: true, mode: 'PM', time: '1:00pm — 5:00pm' },
  { name: 'Friday', selected: true, mode: 'Overnight', time: '8:00pm — 5:00am' },
  { name: 'Saturday', selected: false, mode: 'Full', time: '8:00am — 12:00pm' },
  { name: 'Sunday', selected: false, mode: 'Full', time: '8:00am — 12:00pm' },
];

type SetupRotationStepTwoProps = {
  setActiveTab: Dispatch<SetStateAction<'INFO' | 'DAILY AVAILABILITY' | 'FINISH'>>;
};

const SetupRotationStepTwo = ({ setActiveTab }: SetupRotationStepTwoProps) => {
  const [formData, setFormData] = useState(initialDays);

  const updateField = (dayName: string, field: 'selected' | 'mode', value: boolean | string) => {
    setFormData(prev => prev.map(day => (day.name === dayName ? { ...day, [field]: value } : day)));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData); // or send to API
    setActiveTab('FINISH');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto mt-10 bg-white rounded-lg p-0 select-none"
    >
      <div className="grid grid-cols-[30px_1fr_1fr] gap-x-2 text-[12px] font-normal text-[#4B4B4B] mb-3">
        <div>
          <Checkbox disabled className="cursor-default" />
        </div>
        <div>Day</div>
        <div>Time</div>
      </div>

      <hr className="mb-4" />

      <div className="space-y-3">
        {formData.map(day => (
          <div key={day.name} className="grid grid-cols-[30px_1fr_1fr] gap-x-2 items-center">
            <div>
              <Checkbox
                checked={day.selected}
                aria-label={`${day.name} availability`}
                onCheckedChange={(checked: boolean) => updateField(day.name, 'selected', checked)}
                className="mx-auto data-[state=checked]:bg-[#364699] cursor-pointer data-[state=checked]:text-[#364699] border border-[#CCCCCC] rounded-[5px]"
              />
            </div>

            <div className="text-[12px] text-[#4B4B4B] font-normal">{day.name}</div>

            <div className="flex space-x-2 items-center">
              <Select
                disabled={!day.selected}
                value={day.mode}
                onValueChange={val => updateField(day.name, 'mode', val)}
              >
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
                className={`w-[110px] h-[32px] rounded-md border border-[#D1D1D1] text-[12px] font-normal px-2 flex items-center justify-between ${!day.selected ? 'bg-[#F0F0F0] text-[#9B9B9B] cursor-not-allowed' : 'text-[#4B4B4B]'}`}
              >
                <span>{day.time.split(' — ')[0]}</span>
                <span className="text-[#9B9B9B]">—</span>
                <span>{day.time.split(' — ')[1]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className="mt-10 w-full cursor-pointer bg-[#2F4098] text-white text-[12px] font-normal py-3 rounded-full"
      >
        Create
      </Button>
    </form>
  );
};

export default SetupRotationStepTwo;