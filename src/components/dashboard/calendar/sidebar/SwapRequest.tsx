'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, User, Menu, Check } from 'lucide-react';
import { useCalendarContext } from '../context/CalendarContext';
import { EVENT_COLORS, SlideStates } from '@/lib/const';

export default function SwapRequest() {
  const { setSlideState, selectedSwapEvent, selectedEvent, slideState } = useCalendarContext();
  const [isSwap, setIsSwap] = useState(true);
  const [email, setEmail] = useState<string>('');

  const event = slideState === SlideStates.SWAP_REQUEST_A ? selectedSwapEvent : selectedEvent;

  return (
    <div className="w-full px-6 pt-6 bg-white">
      <h1 className="text-base font-semibold text-gray-800 mb-2">Request Elective</h1>

      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">You're requesting to add</p>

        <div className="relative flex flex-col border border-gray-300 rounded-md p-4 pl-5">
          <div
            className="absolute left-0 top-0 h-full w-1 rounded-bl-md rounded-tl-md"
            style={{
              backgroundColor:
                slideState === SlideStates.SWAP_REQUEST_A ? EVENT_COLORS.WAITLISTED : event?.color,
            }}
          />

          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-800">{event?.title}</p>
          </div>

          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>June 3 – June 14, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span>{event?.teacher}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{event?.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Do you want to request this as a swap?
          </p>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <span
                className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center`}
              >
                {!isSwap && (
                  <span className="w-7 h-7 rounded-full bg-[#42c291] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </span>
                )}
              </span>
              <input
                type="radio"
                name="swapOption"
                checked={!isSwap}
                onChange={() => setIsSwap(false)}
                className="sr-only"
              />
              <span className="text-sm text-gray-600">No — Just request</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <span
                className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center`}
              >
                {isSwap && (
                  <span className="w-7 h-7 rounded-full bg-[#42c291] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </span>
                )}
              </span>
              <input
                type="radio"
                name="swapOption"
                checked={isSwap}
                onChange={() => setIsSwap(true)}
                className="sr-only"
              />
              <span className="text-sm text-gray-600">
                Yes — I want to swap with another learner
              </span>
            </label>
          </div>

          {isSwap && (
            <div className="pt-2">
              <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                Enter Learner's Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-[50%] border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
          onClick={() => setSlideState(SlideStates.DEFAULT)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-sm text-white bg-[#364699] hover:bg-[#2c3c85] rounded-full"
          onClick={() =>
            setSlideState(
              slideState === SlideStates.SWAP_REQUEST_A
                ? SlideStates.SWAP_REQUEST_B
                : SlideStates.CONFIRM_SWAP,
            )
          }
        >
          Request
        </button>
      </div>
    </div>
  );
}
