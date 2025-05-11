'use client'
import React from 'react';
import CalendarEvent from '@/components/CalendarEvent';
import { format, isToday, isSameDay } from 'date-fns';

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

interface WeekProps {
  daysOfWeek: Date[];
  events: CalendarEventType[];
  timeSlots: number[];
}

const Week = ({ daysOfWeek, events, timeSlots }: WeekProps) => {
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

	return (
		<>
			{/* Calendar Grid */}
			<div className="border border-[#f5f5f5] rounded-md overflow-hidden">
				{/* Days Header */}
				<div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-[#f5f5f5]">
					<div className="p-3 text-center text-[#6c6c6c] text-sm font-medium"></div>
					{daysOfWeek.map((day: Date, index: React.Key | null | undefined) => (
						<div
							key={index}
							className={`p-3 text-center border-l border-[#f5f5f5] ${isToday(day) ? 'bg-[#f5f5f5]' : ''}`}
						>
							<div className="text-[#6c6c6c] text-sm font-medium">
								{format(day, 'EEE').toUpperCase()}
							</div>
							<div className={`${isToday(day) ? 'text-[#364699]' : 'text-[#333333]'} font-bold`}>
								{format(day, 'd')}
							</div>
						</div>
					))}
				</div>

				{/* All-day Events */}
				<div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-[#f5f5f5]">
					<div className="p-3 text-[#6c6c6c] text-sm">all-day</div>

					{daysOfWeek.map((day: Date, index: React.Key | null | undefined) => (
						<div key={index} className="p-2 border-l border-[#f5f5f5]">
							{getEventsForDay(day, true).map((event: CalendarEventType) => (
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
					))}
				</div>

				{/* Time Slots */}
				<div className="grid grid-cols-[100px_repeat(7,1fr)]">
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

								{daysOfWeek.map((day: Date, dayIndex: React.Key | null | undefined) => (
									<div key={dayIndex} className="border-l border-b border-[#f5f5f5] relative h-20">
										{getEventsForTimeSlot(day, hour).map((event: CalendarEventType) => (
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
								))}
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</>
	)
}

export default Week