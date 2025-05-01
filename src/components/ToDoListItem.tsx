'use client';
import { Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface TodoListItemProps {
  day: string;
  date: string;
  time: string;
  sessionName: string;
  courseName: string;
  isTest?: boolean;
  isForm?: boolean;
  isSession?: boolean;
}

export default function TodoListItem({
  day,
  date,
  time,
  sessionName,
  courseName,
  isTest = false,
  isForm = false,
  isSession = false,
}: TodoListItemProps) {
  const [isCurrentDay, setIsCurrentDay] = useState(false);

  useEffect(() => {
    // For demonstration purposes, treat "Wed 28" as the current day
    setIsCurrentDay(day === 'Wed' && date === '28');

    // Comment out the actual current day detection logic
    // const today = new Date();
    // const currentDay = today.getDate().toString();
    // const currentDayName = today.toLocaleDateString("en-US", { weekday: "short" }).substring(0, 3);
    // setIsCurrentDay(date === currentDay && day === currentDayName);
  }, [day, date]);

  return (
    <div className="flex items-center p-4 rounded-[24px] border border-[#D9D9D9] bg-white">
      <div className="flex flex-col items-center mr-6 pr-6 border-r border-[#D9D9D9]">
        <span
          className={`${isCurrentDay ? 'text-[#ba1e50]' : 'text-[#333333]'} text-sm font-medium`}
        >
          {day}
        </span>
        <span
          className={`${isCurrentDay ? 'text-[#ba1e50]' : 'text-[#333333]'} text-4xl font-bold`}
        >
          {date}
        </span>
      </div>

      <div className="flex items-center gap-4  w-full">
        <div className="relative">
          {isTest && (
            <div className="flex flex-col">
              <div className="bg-white border border-gray-300 rounded-[10px] px-2 py-4 -mb-4 items-center justify-center flex ">
                <Image src="/labs.svg" alt="session" width={20} height={20} />
              </div>
              <div className="bg-[#b0b1d7] px-5 py-1 rounded-[14px] border border-[#D9D9D9]">
                <span className="text-xs font-bold  text-white items-center justify-center">
                  TEST
                </span>
              </div>
            </div>
          )}
          {isForm && (
            <div className="flex flex-col">
              <div className="bg-white border border-gray-300 rounded-[10px] px-2 py-4 -mb-4 items-center justify-center flex ">
                <Image src="/edit.svg" alt="session" width={20} height={20} />
              </div>
              <div className="bg-[#fa8d8f] px-4 py-1 rounded-[14px] border border-[#D9D9D9]">
                <span className="text-xs font-bold text-white items-center justify-center">
                  FORM
                </span>
              </div>
            </div>
          )}
          {isSession && (
            <div className="flex flex-col">
              <div className="bg-white border border-gray-300 rounded-[10px] px-2 py-4 -mb-4 items-center justify-center flex ">
                <Image src="/hotel_class.svg" alt="session" width={24} height={24} />
              </div>
              <div className="bg-[#DD99F6] px-2 py-1 rounded-[14px] border border-[#D9D9D9]">
                <span className="text-xs font-bold text-white items-center justify-center">
                  SESSION
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between  w-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#6c6c6c]" />
              <span className="text-[#6c6c6c] text-sm">{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#6c6c6c]" />
              <span className="text-[#6c6c6c] text-sm">Online</span>
            </div>
          </div>

          <div>
            <p className="text-[#333333] text-base font-medium">{sessionName}</p>
            <p className="text-[#6c6c6c] text-sm">{courseName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
