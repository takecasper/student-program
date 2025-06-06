// components/ScheduleListItem.tsx
import {
  Book,
  BookCopy,
  BookCopyIcon,
  BookDashed,
  BookTemplate,
  CalendarDays,
  Clock,
  Contact,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';

interface ScheduleItemProps {
  day: string;
  date: string;
  sessionName: string;
  time: string;
  location: string;
  type: string;
  instructor: string;
}

export default function ScheduleListItem({
  day,
  date,
  sessionName,
  time,
  location,
  type,
  instructor,
}: ScheduleItemProps) {
  return (
    <div className="flex border border-gray-200 rounded-xl overflow-hidden shadow-sm w-full max-w-full bg-white">
      <div className="flex flex-col items-center justify-center px-4 py-3 min-w-[70px] text-center">
        <p className="text-sm text-gray-600">{day}</p>
        <p className="text-2xl font-bold text-[#B1174D]">{date}</p>
      </div>

      <div className="w-px bg-gray-200 my-3" />

      <div className="flex flex-col justify-center px-4 py-2 flex-1">
        <p className="text-sm font-semibold text-gray-800 mb-2">{sessionName}</p>

        <div className="flex items-center text-sm text-gray-600 gap-2 mb-1 ">
          <div className="flex flex-row items-center w-[50%]">
            <Clock size={16} className="gap-1" />
            <span>{time}</span>
          </div>

          <span className="flex flex-row items-center w-[50%] gap-1">
            <BookCopy size={16} className="gap-1" />
            <span>{type}</span>
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600 gap-2">
          <div className="flex flex-row items-center w-[50%]">
            <MapPin size={16} className="gap-1" />
            <span>{location}</span>
          </div>

          <span className="flex flex-row items-center w-[50%] gap-1">
            <Contact size={16} className="gap-1" />
            <span>
              With <span className="font-semibold text-gray-800">{instructor}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
