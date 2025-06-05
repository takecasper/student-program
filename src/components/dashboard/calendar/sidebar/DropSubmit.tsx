'use client';

import { EVENT_COLORS, EVENT_TYPES, SlideStates } from '@/lib/const';
import { Calendar, MapPin, User, XCircle } from 'lucide-react';
import { useCalendarContext } from '../context/CalendarContext';
import { CalendarEventType } from '@/types/calendar';

interface DropSubmitProps {
  events: CalendarEventType[];
}

export default function DropSubmit({ events }: DropSubmitProps) {
  const { setSlideState, selectedEvent, setSidebarOpen } = useCalendarContext();
  return (
    <div className="w-full px-6 pt-6 bg-white">
      <h2 className="text-sm font-semibold text-gray-800 mb-1">Confirm Changes</h2>
      <p className="text-sm text-gray-600 mb-4">
        You&apos;sre about to make changes to your schedule. Please review:
      </p>

      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-700 mb-2 font-medium">You will be requested to:</p>

        <div className="relative flex flex-col border border-gray-300 rounded-md p-4 pl-5">
          <div
            className="absolute left-0 top-0 h-full w-1 rounded-bl-md rounded-tl-md "
            style={{ backgroundColor: EVENT_COLORS.DROP_REQUESTED }}
          />

          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-800">{selectedEvent?.title}</p>
            <span
              className="text-white text-xs py-1 px-2 rounded-full flex items-center gap-1 w-fit sm:ml-auto cursor-pointer"
              style={{ backgroundColor: EVENT_COLORS.DROP_REQUESTED }}
            >
              <div className="w-3 h-3 rounded-full flex justify-center items-center">
                <XCircle className="w-3 h-3 text-white" />
              </div>
              {`Drop Requested`}
            </span>
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
        <button
          className="px-4 py-2 text-sm text-white bg-[#364699] hover:bg-[#2c3c85] rounded-full"
          onClick={() => {
            const event = events.find(event => event.id === selectedEvent?.id);

            if (event) {
              event.color = EVENT_COLORS.DROP_REQUESTED;
              event.status = {
                text: EVENT_TYPES.DROP_REQUESTED,
                color: EVENT_COLORS.DROP_REQUESTED,
              };
            }
            setSidebarOpen(false);
            setSlideState(SlideStates.SUBMIT_ADD);
          }}
        >
          View Updated Schedule
        </button>
      </div>
    </div>
  );
}
