// components/TooltipMenu.tsx
import { CalendarEventType, SlideState } from '@/types/calendar';
import { Info, XCircle } from 'lucide-react';
import { useCalendarContext } from './context/CalendarContext';
import { SlideStates } from '@/lib/const';

interface ToolTipPros {
  event: CalendarEventType;
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TooltipMenu({ event, setShowTooltip }: ToolTipPros) {
  const { setSidebarOpen, setSlideState, setSelectedEvent } = useCalendarContext();
  return (
    <div className="absolute right-[-11rem] mt-2 w-48 rounded-lg border bg-white shadow-md z-50">
      <ul className="divide-y text-sm text-gray-700">
        <li className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50">
          <div className="w-5 h-5 rounded-lg border border-gray-300 flex items-center justify-center">
            <Info className="w-5 h-5 text-gray-600" />
          </div>
          <span>View Elective</span>
        </li>

        <li
          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50"
          onClick={e => {
            e.stopPropagation();
            setSidebarOpen(true);
            setSlideState(SlideStates.INIT_SWAP);
            setSelectedEvent(event);
            setShowTooltip(prev => !prev);
          }}
        >
          <div className="w-5 h-5 rounded-lg border border-gray-300 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
            >
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="5" fill="none" />
              <path d="M35 55 V30 H25 L40 10 L55 30 H45 V55 Z" fill="currentColor" />
              <path d="M65 45 V70 H75 L60 90 L45 70 H55 V45 Z" fill="currentColor" />
            </svg>
          </div>
          <span>Swap Elective</span>
        </li>

        <li
          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50"
          onClick={e => {
            e.stopPropagation();
            setSidebarOpen(true);
            setSlideState(SlideStates.INIT_DROP);
            setSelectedEvent(event);
            setShowTooltip(prev => !prev);
          }}
        >
          <div className="w-5 h-5 rounded-lg border border-gray-300 flex items-center justify-center">
            <XCircle className="w-5 h-5 text-gray-600" />
          </div>
          <span>Drop Elective</span>
        </li>
      </ul>
    </div>
  );
}
