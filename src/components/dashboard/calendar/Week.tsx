'use client';
import React from 'react';
import { isSameDay } from 'date-fns';
import { getEventsForWeek, getWeeksShortenTitle } from '@/lib/utils';
import WeekEvent from './event/WeekEvent';

interface CalendarEventType {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  color: string;
  isAllDay: boolean;
  location?: string;
  status?: {
    text: string;
    color: string;
    dotColor: string;
  };
}

interface WeekProps {
  daysOfWeek: Date[][];
  events: CalendarEventType[];
  timeSlots: number[]; // e.g., [8, 9, 10, ...]
}

const Week = ({ daysOfWeek, events, timeSlots }: WeekProps) => {
  const getEventsForTimeSlot = (day: Date, hour: number) => {
    return events.filter(event => {
      if (event.isAllDay || !isSameDay(event.startDate, day)) return false;
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

  const weekTitles: string[] = getWeeksShortenTitle(new Date());

  const resutl = getEventsForWeek(events, daysOfWeek[1][0], daysOfWeek[2][6], true);

  console.log('Sirius:', resutl);

  return (
    <>
      {/* Calendar Grid */}
      <div className="rounded-md overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-[70px_repeat(7,1fr)] bg-white">
          <div className="p-3"></div>
          {weekTitles.map((title, i) => (
            <div
              key={i}
              className={`${i === 0 ? 'rounded-tl-4xl' : ''} p-3 text-center border border-[#e5e5e5]`}
            >
              <span className="font-bold text-[#444]">{`WEEK ${i + 1}`}</span>
              <span className="text-[#999] uppercase text-sm ml-1">{`, ${title}`}</span>
            </div>
          ))}
        </div>

        {/* All Day Row */}
        <div className="grid grid-cols-[70px_repeat(7,1fr)]">
          <div className="flex items-center justify-end pr-3 text-[#444] text-sm font-semibold relative">
            <span className="absolute top-[-12px]">All Day</span>
          </div>
          {daysOfWeek.map((day, index) => (
            <div key={index} className="p-2 border border-[#e5e5e5] h-[72px]">
              {/* {getEventsForWeek(day, true).map(event => (
                <div key={event.id} className="mb-2">
                  <WeekEvent
                    event={event}
                    title={event.title}
                    startTime={event.startTime || ''}
                    endTime={event.endTime || ''}
                    location={event.location}
                    color={event.color}
                    status={event.status}
                    isAllDay={true}
                  />
                </div>
              ))} */}
            </div>
          ))}
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

                {/* Cells for Each Day */}
                {daysOfWeek.map((day, dayIndex) => (
                  <div key={dayIndex} className="border border-[#e5e5e5] relative h-[144px]">
                    {/* {getEventsForTimeSlot(day, hour).map(event => (
                      <div key={event.id} className="absolute top-1 left-2 right-2 z-10">
                        <WeekEvent
                          event={event}
                          title={event.title}
                          startTime={event.startTime || ''}
                          endTime={event.endTime || ''}
                          location={event.location}
                          color={event.color}
                          status={event.status}
                        />
                      </div>
                    ))} */}
                  </div>
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
