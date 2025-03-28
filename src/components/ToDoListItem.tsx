import { Clock, FilePenLine, MapPin, Star, TestTube } from "lucide-react";

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
  return (
    <div className="flex items-center p-4 rounded-2xl border-2 border-[#D9D9D9] bg-white">
      <div className="flex flex-col items-center mr-6 pr-6 border-r border-[#f5f5f5]">
        <span className="text-[#ba1e50] text-sm font-medium">{day}</span>
        <span className="text-[#ba1e50] text-4xl font-bold">{date}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          {isTest && (
            <div className="flex flex-col">
              <div className="bg-white border border-gray-300 rounded-[10px] px-2 py-4 -mb-2 items-center justify-center flex ">
                <TestTube className="w-4 h-4 text-gray-700" />
              </div>
              <div className="bg-[#b0b1d7] px-5 py-1 rounded-[10px]">
                <span className="text-xs font-bold text-white items-center justify-center">TEST</span>
              </div>
            </div>
          )}
          {isForm && (
            <div className="flex flex-col">
              <div className="bg-white border border-gray-300 rounded-[10px] px-2 py-4 -mb-2 items-center justify-center flex ">
                <FilePenLine className="w-4 h-4 text-gray-700" />
              </div>
              <div className="bg-[#fa8d8f] px-4 py-1 rounded-[10px]">
                <span className="text-xs font-bold text-white items-center justify-center">FORM</span>
              </div>
            </div>
          )}
          {isSession && (
            <div className="flex flex-col">
              <div className="bg-white border border-gray-300 rounded-[10px] px-2 py-4 -mb-2 items-center justify-center flex ">
                <Star className="w-4 h-4 text-gray-700" />
              </div>
              <div className="bg-[#b0b1d7] px-2 py-1 rounded-[10px]">
                <span className="text-xs font-bold text-white items-center justify-center">SESSION</span>
              </div>
            </div>
          )}
        </div>

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
  );
}
