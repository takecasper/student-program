/* eslint-disable @typescript-eslint/no-unsafe-function-type */
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { format, addDays, isSameDay } from 'date-fns';
import DayEvent from './event/DayEvent';
import { getEventsForDay, getEventsForTimeSlot } from '@/lib/utils';
import { TWELVE_HOUR } from '@/lib/const';
import { CalendarEventType } from '@/types/calendar';

// Define the event type interface

interface DayProps {
  events: CalendarEventType[];
  timeSlots: number[];
  currentDate: Date;
  setCurrentDate: Function;
}

const Day = ({ events, timeSlots, currentDate, setCurrentDate }: DayProps) => {
  const navigatePrevious = () => {
    setCurrentDate(addDays(currentDate, -1));
  };

  const navigateNext = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  return (
    <>
      {/* Calendar Grid */}
      <div className="border border-[#f5f5f5] rounded-4xl overflow-hidden">
        {/* Days Header */}
        <div className="flex justify-center items-center border-b border-[#f5f5f5] py-2">
          <div className="flex items-center gap-4 text-sm text-[#555] font-medium tracking-wide">
            <Button
              variant="ghost"
              size="icon"
              onClick={navigatePrevious}
              className="h-6 w-6 text-[#555]"
            >
              &lt;
            </Button>
            <span className="uppercase">{format(currentDate, 'EEEE, MMMM d')}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateNext}
              className="h-6 w-6 text-[#555]"
            >
              &gt;
            </Button>
          </div>
        </div>

        {/* All-day Events */}
        <div className="grid grid-cols-[144px_repeat(1,1fr)] border-b border-[#f5f5f5]">
          <div className="p-3 text-[#6c6c6c] text-sm">all-day</div>

          <div className="border-l border-[#f5f5f5]">
            {getEventsForDay(events, currentDate, true).map(
              (event: CalendarEventType, index, events) => (
                <div key={event.id}>
                  <DayEvent
                    event={event}
                    title={event.title}
                    startTime={event.startTime || ''}
                    endTime={event.endTime || ''}
                    location={event.location}
                    color={event.color}
                    status={event.status}
                    isAllDay={true}
                    description={event.description}
                    size={events.length}
                  />
                </div>
              ),
            )}
          </div>
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-[144px_repeat(1,1fr)]">
          {timeSlots.map((hour: number) => {
            const displayHour = hour > TWELVE_HOUR ? hour - TWELVE_HOUR : hour;
            const isPM = hour >= TWELVE_HOUR;

            return (
              <React.Fragment key={hour}>
                <div className="border-b border-[#f5f5f5] p-2 text-right pr-3 min-h-[144px]">
                  <span className="text-[#6c6c6c] text-sm">
                    {displayHour} <span className="text-xs">{isPM ? 'PM' : 'AM'}</span>
                  </span>
                </div>

                <div className="border-l border-b border-[#f5f5f5] relative min-h-[144px]">
                  {getEventsForTimeSlot(events, currentDate, hour).map(
                    (event: CalendarEventType, id, events) => (
                      <div key={event.id} className="group relative">
                        <DayEvent
                          event={event}
                          title={event.title}
                          startTime={event.startTime || ''}
                          endTime={event.endTime || ''}
                          location={event.location}
                          teacher={event.teacher}
                          color={event.color}
                          status={event.status}
                          description={event.description}
                          size={events.length}
                        />
                      </div>
                    ),
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Day;
