/* eslint-disable @typescript-eslint/no-unsafe-function-type */
'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { format, addDays, isSameDay } from 'date-fns';
import DayEvent from './event/DayEvent';
import { getEventsForDay, getEventsForTimeSlot } from '@/lib/utils';
import { TWELVE_HOUR } from '@/lib/const';

// Define the event type interface
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
  description?: string;
}

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
      <div className="border border-[#f5f5f5] rounded-md overflow-hidden">
        {/* Days Header */}
        <div className="flex justify-center p-2 border-b border-[#f5f5f5]">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={navigatePrevious} className="h-8 px-2">
              &lt;
            </Button>
            {format(currentDate, 'EEEE MMMM yyyy')}
            <Button variant="outline" size="sm" onClick={navigateNext} className="h-8 px-2">
              &gt;
            </Button>
          </div>
        </div>

        {/* All-day Events */}
        <div className="grid grid-cols-[120px_repeat(1,1fr)] border-b border-[#f5f5f5]">
          <div className="p-3 text-[#6c6c6c] text-sm">all-day</div>

          <div className="p-2 border-l border-[#f5f5f5]">
            {getEventsForDay(events, currentDate, true).map((event: CalendarEventType) => (
              <div key={event.id} className="mb-2">
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
                />
              </div>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-[120px_repeat(1,1fr)]">
          {timeSlots.map((hour: number) => {
            const displayHour = hour > TWELVE_HOUR ? hour - TWELVE_HOUR : hour;
            const isPM = hour >= TWELVE_HOUR;

            return (
              <React.Fragment key={hour}>
                <div className="border-b border-[#f5f5f5] p-2 text-right pr-3 min-h-[120px]">
                  <span className="text-[#6c6c6c] text-sm">
                    {displayHour} <span className="text-xs">{isPM ? 'PM' : 'AM'}</span>
                  </span>
                </div>

                <div className="border-l border-b border-[#f5f5f5] relative min-h-[120px]">
                  {getEventsForTimeSlot(events, currentDate, hour).map(
                    (event: CalendarEventType) => (
                      <div key={event.id}>
                        <DayEvent
                          event={event}
                          title={event.title}
                          startTime={event.startTime || ''}
                          endTime={event.endTime || ''}
                          location={event.location}
                          color={event.color}
                          status={event.status}
                          description={event.description}
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
