'use client';

import { EVENT_COLORS, EVENT_TYPES, SlideStates } from '@/lib/const';
import { CalendarEventType } from '@/types/calendar';
import { Calendar, MapPin, User, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useCalendarContext } from '../context/CalendarContext';

interface SidebarProps {
  selectedEvent: CalendarEventType;
  events: CalendarEventType[];
  setEvents: (events: CalendarEventType[]) => void;
}

export default function SubmitAddEvent({ selectedEvent, events, setEvents }: SidebarProps) {
  const [agree, setAgree] = useState(false);
  const { setSidebarOpen, setSlideState } = useCalendarContext();

  return (
    <div className="w-full px-6 pt-6 bg-white">
      <h2 className="text-sm font-semibold text-gray-800 mb-1">Review Changes</h2>
      <p className="text-sm text-gray-600 mb-4">You are about to submit a request for</p>

      <div className="mt-3 border border-gray-200 rounded-lg p-4">
        <div className="relative flex flex-col border border-gray-300 rounded-md p-4 pl-5 bg-white">
          <div className="absolute left-0 top-0 h-full w-1 rounded-bl-md rounded-tl-md bg-yellow-400" />

          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-800">FP-AddicMed</p>
          </div>

          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>June 3 - 14 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>DR. Geoffrey Blair</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>Vancouver General Hospital – Surgical Department</span>
            </div>
          </div>
        </div>

        <label className="flex items-start mt-4 gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 accent-[#364699]"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          I agree to share my name and email with the other learner for this swap request.
        </label>
      </div>

      <div className="flex justify-end items-center mt-6 gap-4">
        <div className="flex items-center text-xs text-yellow-600 gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>1 of 3 credits will be used</span>
        </div>
        <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">
          Cancel
        </button>
        <button
          className="px-4 py-2 text-sm text-white bg-[#364699] hover:bg-[#2c3c85] rounded-full"
          disabled={!agree}
          onClick={() => {
            if (agree) {
              const newEvent = {
                ...selectedEvent,
                color: EVENT_COLORS.PENDING,
                status: {
                  text: EVENT_TYPES.PENDING,
                  color: EVENT_COLORS.PENDING,
                },
              };
              setEvents([...events, newEvent]);
              setSidebarOpen(false);
              setSlideState(SlideStates.INIT_ADD);
            }
          }}
        >
          Request
        </button>
      </div>
    </div>
  );
}
