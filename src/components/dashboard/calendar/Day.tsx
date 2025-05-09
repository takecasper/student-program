/* eslint-disable @typescript-eslint/no-unsafe-function-type */
'use client'
import React from 'react';
import CalendarEvent from '@/components/CalendarEvent';
import { Button } from '@/components/ui/button';
import { format, addDays, isSameDay } from 'date-fns';

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
}

interface DayProps {
  events: CalendarEventType[];
  timeSlots: number[];
	currentDate: Date;
	setCurrentDate: Function;
}

const Week = ({ events, timeSlots, currentDate, setCurrentDate }: DayProps) => {
  // Get events for a specific day
  const getEventsForDay = (day: Date, allDay = false) => {
    return events.filter((event: CalendarEventType) => {
      return isSameDay(event.startDate, day) && event.isAllDay === allDay;
    });
  };

  // Get events for a specific time slot
  const getEventsForTimeSlot = (day: Date, hour: number) => {
    return events.filter((event: CalendarEventType) => {
      if (event.isAllDay) return false;
      if (!isSameDay(event.startDate, day)) return false;

      // Check if the event starts at this hour
      if (event.startTime) {
        const eventHour = Number.parseInt(event.startTime.split(' ')[0]);
        const isPM = event.startTime.includes('PM');
        const hour24 = isPM && eventHour !== 12 ? eventHour + 12 : eventHour;
        return hour === hour24;
      }

      return false;
    });
  };

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
				<div className="grid grid-cols-[100px_repeat(1,1fr)] border-b border-[#f5f5f5]">
					<div className="p-3 text-[#6c6c6c] text-sm">all-day</div>

					<div className="p-2 border-l border-[#f5f5f5]">
						{getEventsForDay(currentDate, true).map((event: CalendarEventType) => (
							<div key={event.id} className="mb-2">
								<CalendarEvent
									title={event.title}
									startTime={event.startTime || ''}
									endTime={event.endTime || ''}
									location={event.location}
									color={event.color}
									status={event.status}
									isAllDay={true}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Time Slots */}
				<div className="grid grid-cols-[100px_repeat(1,1fr)]">
					{timeSlots.map((hour: number) => {
						const displayHour = hour > 12 ? hour - 12 : hour;
						const isPM = hour >= 12;

						return (
							<React.Fragment key={hour}>
								<div className="border-b border-[#f5f5f5] p-2 text-right pr-3 h-20">
									<span className="text-[#6c6c6c] text-sm">
										{displayHour} <span className="text-xs">{isPM ? 'PM' : 'AM'}</span>
									</span>
								</div>

								<div className="border-l border-b border-[#f5f5f5] relative h-20">
									{getEventsForTimeSlot(currentDate, hour).map((event: CalendarEventType) => (
										<div key={event.id} className="absolute top-1 left-2 right-2 z-10">
											<CalendarEvent
												title={event.title}
												startTime={event.startTime || ''}
												endTime={event.endTime || ''}
												location={event.location}
												color={event.color}
												status={event.status}
											/>
										</div>
									))}
								</div>
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</>
	)
}

export default Week