'use client'
import React from 'react'
import { format, isToday, isSameDay, isSameMonth } from 'date-fns';
import CalendarEvent from '@/components/CalendarEvent';

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

interface MonthProps {
	weeksOfMonth: Date[][];
	events: CalendarEventType[];
	timeSlots: number[];
	currentDate: Date;
}

const Month = ({ weeksOfMonth, events, currentDate }: MonthProps) => {
  // Get events for a specific time slot
  const getEventsForWeek = (day: Date) => {
    return events.filter(event =>
      isSameDay(event.startDate, day) || isSameDay(event.endDate, day)
    );
  };

	return (
		<>
			{/* Calendar Grid */}
			<div className="border border-[#f5f5f5] rounded-md overflow-hidden">
				<div className="grid grid-cols-7 border-b border-[#f5f5f5]">
					{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day: string, index: React.Key | null | undefined) => (
						<div
							key={index}
							className={`p-3 text-center border-l border-[#f5f5f5] ${isToday(day) ? 'bg-[#f5f5f5]' : ''}`}
						>
							<div className="text-[#6c6c6c] text-sm font-medium">
								{day}
							</div>
						</div>
					))}
				</div>

				{weeksOfMonth.map((week, wi) => (
					<div key={wi} className="grid grid-cols-7 border-b text-center h-32">
						{week.map((day, di) => {
							const isInMonth = isSameMonth(day, currentDate);
							const isCurrent = isToday(day);
							return (
								<div
									key={di}
									className={`p-2 text-sm border-t border-l flex flex-col relative overflow-hidden ${isCurrent ? 'bg-blue-100 font-bold' : ''} ${
										isInMonth ? 'text-black' : 'text-gray-300'
									}`}
								>
									<div className='flex w-full justify-end'>{format(day, 'd')}</div>
									{getEventsForWeek(day).map((event: CalendarEventType) => (
										<div key={event.id} className="top-1 left-2 right-2 z-10">
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
							);
						})}
					</div>
				))}
			</div>
		</>
	)
}

export default Month