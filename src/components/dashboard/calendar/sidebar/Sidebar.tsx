'use client';

import React from 'react';
import { X, Search, ListFilter } from 'lucide-react';
import { totalWeekData } from '@/app/dashboard/(Student_Experience)/calendar/data';
import { SidebarTable } from './SidebarTable';
import { AddEvent } from './AddEvent';
import { CalendarEventType, SlideState } from '@/types/calendar';
import { SlideStates } from '@/lib/const';
import ConfirmEvent from './ConfirmEvent';
import SubmitAddEvent from './SubmitAddEvent';
import { useCalendarContext } from '../context/CalendarContext';
import { SwapEvent } from './SwapEvent';
import SwapRequest from './SwapRequest';
import { SwapSubmit } from './SwapSubmit';
import DropRequest from './DropRequest';
import DropSubmit from './DropSubmit';

interface SidebarProps {
  events: CalendarEventType[];
  setEvents: (events: CalendarEventType[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ events, setEvents }) => {
  const {
    slideState,
    sidebarOpen,
    setSidebarOpen,
    selectedEvent,
  } = useCalendarContext();

  const getContent = (slideState: SlideState) => {
    switch (slideState) {
      case SlideStates.INIT_ADD:
        return <AddEvent totalWeekData={totalWeekData} />;
      case SlideStates.CONFIRM:
        return <ConfirmEvent />;
      case SlideStates.SUBMIT_ADD:
        return selectedEvent ? (
          <SubmitAddEvent selectedEvent={selectedEvent} events={events} setEvents={setEvents} />
        ) : null;
      case SlideStates.INIT_SWAP:
        return <SwapEvent totalWeekData={totalWeekData} />;
      case SlideStates.SWAP_REQUEST_A:
        return <SwapRequest />;
      case SlideStates.SWAP_REQUEST_B:
        return <SwapRequest />;
      case SlideStates.CONFIRM_SWAP:
        return <SwapSubmit events={events} setEvents={setEvents} />;
      case SlideStates.INIT_DROP:
        return <DropRequest />;
      case SlideStates.DROP_REQUEST:
        return <DropSubmit events={events}/>;
      default:
        break;
    }
  };

  const getTitle = (slideState: SlideState) => {
    switch (slideState) {
      case SlideStates.INIT_ADD:
      case SlideStates.CONFIRM:
      case SlideStates.SUBMIT_ADD:
        return 'ADD/DROP';
      case SlideStates.INIT_SWAP:
        return 'SWAP';
      default:
        break;
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full max-w-[50.7rem] h-[calc(100vh_-_calc(var(--spacing)_*_4)_-_71px)] mt-[calc(var(--spacing)_*_4_+_71px)] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="px-6 pt-6">
        <div className="flex justify-between items-start">
          <h2 className="text-sm font-semibold text-gray-800 pt-[2px]">{getTitle(slideState)}</h2>
          <button onClick={() => setSidebarOpen(false)} className="p-[6px] ">
            <X className="w-3.5 h-3.5 text-gray-700" />
          </button>
        </div>

        <div className="my-4">
          <div className="w-1/2">
            <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-[6px] shadow-sm">
              <div className="flex items-center text-gray-500 gap-2 w-full">
                <Search className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
                />
              </div>
              <ListFilter className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {getContent(slideState)}

      <hr className="my-6" />

      <SidebarTable />
    </div>
  );
};
