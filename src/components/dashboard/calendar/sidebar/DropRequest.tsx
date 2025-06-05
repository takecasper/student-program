'use client';

import { SlideStates } from '@/lib/const';
import { Calendar, MapPin, User, AlertTriangle, Menu } from 'lucide-react';
import { useCalendarContext } from '../context/CalendarContext';

export default function DropRequest() {
  const { setSlideState, selectedEvent } = useCalendarContext();
  return (
    <div className="w-full px-6 pt-6 bg-white">
      <h2 className="text-sm font-semibold text-gray-800 mb-1">Confirm Changes</h2>
      <p className="text-sm text-gray-600 mb-4">
        You&apos;re about to request to drop this elective. Please review:
      </p>

      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-700 mb-2 font-medium">You will be requested to:</p>

        <div className="relative flex flex-col border border-gray-300 rounded-md p-4 pl-5">
          <div className="absolute left-0 top-0 h-full w-1 rounded-bl-md rounded-tl-md bg-yellow-400" />

          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-800">{selectedEvent?.title}</p>
            <Menu className="w-4 h-4 text-gray-400" />
          </div>

          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>June 3 - 14 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>{selectedEvent?.teacher}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{selectedEvent?.location}</span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Once approved, the above changes will be applied to your schedule.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <div className="flex items-center text-xs text-yellow-600 gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>1 of 3 credits will be used</span>
        </div>
        <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">
          Cancel
        </button>
        <button
          className="px-4 py-2 text-sm text-white bg-[#364699] hover:bg-[#2c3c85] rounded-full"
          onClick={() => setSlideState(SlideStates.DROP_REQUEST)}
        >
          Request
        </button>
      </div>
    </div>
  );
}
