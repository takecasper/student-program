'use client';
import React from 'react';
import { getEventsForWeekStart, getOverlappingWeekCount, getWeeksShortenTitle } from '@/lib/utils';
import WeekEvent from './event/WeekEvent';
import { CalendarEventType } from '@/types/calendar';
import { Plus } from 'lucide-react';
import { useCalendarContext } from './context/CalendarContext';
import { SlideStates } from '@/lib/const';

interface WeekProps {
  daysOfWeek: Date[][];
  events: CalendarEventType[];
  timeSlots: number[]; // e.g., [8, 9, 10, ...]
  currentDate: Date;
  setIsAddModalOpen: () => void;
}

const Week = ({ daysOfWeek, events, timeSlots, setIsAddModalOpen, currentDate }: WeekProps) => {
  const getEventsForTimeSlot = (events: CalendarEventType[], hour: number) => {
    return events.filter(event => {
      if (event.isAllDay) return false;
      if (event.startTime) {
        const eventHour = Number.parseInt(event.startTime.split(' ')[0]);
        const isPM = event.startTime.includes('PM');
        const hour24 =
          isPM && eventHour !== 12 ? eventHour + 12 : eventHour === 12 && !isPM ? 0 : eventHour;
        return hour === hour24;
      }
      return false;
    });
  };

  const weekTitles: { title: string; state: boolean }[] = getWeeksShortenTitle(currentDate);
  const { setSidebarOpen, setSlideState } = useCalendarContext();

  return (
    <>
      <div className="rounded-md overflow-hidden">
        <div className="grid grid-cols-[70px_repeat(7,1fr)] bg-white">
          <div className="p-3"></div>
          {weekTitles.map((item, i) => {
            return (
              <div
                key={i}
                className={`${i === 0 ? 'rounded-tl-4xl' : ''} p-3 text-center border border-[#e5e5e5] ${item.state ? 'bg-blue-900' : 'bg-white'}`}
              >
                <span
                  className={`font-bold ${item.state ? 'text-white' : 'text-[#444]'} `}
                >{`WEEK ${i + 1}`}</span>
                <span
                  className={`${item.state ? 'text-white' : 'text-[#999]'} uppercase text-sm ml-1`}
                >{`, ${item.title}`}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-[70px_repeat(7,1fr)]">
          <div className="flex items-center justify-end pr-3 text-[#444] text-sm font-semibold relative">
            <span className="absolute top-[-12px]">All Day</span>
          </div>
          {daysOfWeek.map((days, index) => {
            return (
              <div key={index} className="relative border border-[#e5e5e5] h-[72px]">
                {getEventsForWeekStart(events, days[0], days[6], true).map((event, i, events) => {
                  return (
                    <WeekEvent
                      key={event.id}
                      color={event.color}
                      status={event.status}
                      isAllDay={true}
                      index={i}
                      size={events.length}
                      numWeek={
                        getOverlappingWeekCount(daysOfWeek, event.startDate, event.endDate).length
                      }
                      setIsAddModalOpen={setIsAddModalOpen}
                      event={event}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Hourly Rows */}
        <div className="grid grid-cols-[70px_repeat(7,1fr)]">
          {timeSlots.map((hour: number) => {
            const displayHour = hour % 12 === 0 ? 12 : hour % 12;
            const isPM = hour >= 12;

            return (
              <React.Fragment key={hour}>
                {/* Left Time Label Column (Red Box Area) */}
                <div className="h-[144px] flex justify-end items-start pr-3 pt-1 relative">
                  <span className="text-[#6c6c6c] text-xs absolute top-[-10px]">
                    <span className="font-bold">{displayHour}:00</span> {isPM ? 'PM' : 'AM'}
                  </span>
                </div>

                {daysOfWeek.map((days, dayIndex) => (
                  <React.Fragment key={dayIndex}>
                    <div className="relative border border-[#e5e5e5] h-[144px]">
                      <div className="absolute top-0 z-0 w-full h-full hover:bg-blue-200 group">
                        <button
                          className="absolute bottom-2 right-2 w-4 h-4 rounded-xs bg-[#364699] group-hover:block hidden text-white items-center justify-center hover:bg-[#2c3c85] cursor-pointer"
                          title="Add"
                          onClick={() => {
                            setSidebarOpen(true);
                            setSlideState(SlideStates.INIT_ADD);
                          }}
                        >
                          <Plus width={16} height={16} />
                        </button>
                      </div>
                      {getEventsForTimeSlot(
                        getEventsForWeekStart(events, days[0], days[6]),
                        hour,
                      ).map((event, i, events) => {
                        return (
                          <div key={event.id} className="group relative">
                            <WeekEvent
                              teacher={event.teacher}
                              color={event.color}
                              status={event.status}
                              isAllDay={event.isAllDay}
                              index={i}
                              size={events.length}
                              numWeek={
                                getOverlappingWeekCount(daysOfWeek, event.startDate, event.endDate)
                                  .length
                              }
                              setIsAddModalOpen={setIsAddModalOpen}
                              event={event}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Week;
