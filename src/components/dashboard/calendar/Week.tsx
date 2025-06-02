'use client';
import React from 'react';
import { isSameDay } from 'date-fns';
import { getEventsForWeekStart, getOverlappingWeekCount, getWeeksShortenTitle } from '@/lib/utils';
import WeekEvent from './event/WeekEvent';
import { CalendarEventType } from '@/types/calendar';

interface WeekProps {
  daysOfWeek: Date[][];
  events: CalendarEventType[];
  timeSlots: number[]; // e.g., [8, 9, 10, ...]
  setIsAddModalOpen: Function;
}

const Week = ({ daysOfWeek, events, timeSlots, setIsAddModalOpen }: WeekProps) => {
  const getEventsForTimeSlot = (events: CalendarEventType[], hour: number) => {
    // console.log('adfadsfasdf:', events);
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

  const weekTitles: string[] = getWeeksShortenTitle(new Date());

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
          {daysOfWeek.map((days, index) => {
            return (
              <div key={index} className="relative border border-[#e5e5e5] h-[72px]">
                {getEventsForWeekStart(events, days[0], days[6], true).map((event, i, events) => {
                  return (
                    <WeekEvent
                      key={event.id}
                      event={event}
                      title={event.title}
                      startTime={event.startTime || ''}
                      endTime={event.endTime || ''}
                      location={event.location}
                      color={event.color}
                      status={event.status}
                      isAllDay={true}
                      index={i}
                      size={events.length}
                      numWeek={
                        getOverlappingWeekCount(daysOfWeek, event.startDate, event.endDate).length
                      }
                      setIsAddModalOpen={setIsAddModalOpen}
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

                {/* Cells for Each Day */}
                {daysOfWeek.map((days, dayIndex) => (
                  <div key={dayIndex} className=" border border-[#e5e5e5] h-[144px]">
                    {getEventsForTimeSlot(
                      getEventsForWeekStart(events, days[0], days[6]),
                      hour,
                    ).map((event, i, events) => {
                      return (
                        <div key={event.id} className="group relative">
                          <WeekEvent
                            event={event}
                            title={event.title}
                            startTime={event.startTime || ''}
                            endTime={event.endTime || ''}
                            location={event.location}
                            teacher={event.teacher}
                            color={event.color}
                            status={event.status}
                            isAllDay={event.isAllDay}
                            isEditable={event.isEditable}
                            index={i}
                            size={events.length}
                            numWeek={
                              getOverlappingWeekCount(daysOfWeek, event.startDate, event.endDate)
                                .length
                            }
                            setIsAddModalOpen={setIsAddModalOpen}
                          />
                        </div>
                      );
                    })}
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
