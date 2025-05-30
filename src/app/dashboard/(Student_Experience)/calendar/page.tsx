'use client';

import React, { useState } from 'react';
import { CalendarDays, Pencil, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddCalendarEventModal from '@/components/AddEvent';
import {
  format,
  startOfWeek,
  addDays,
  parseISO,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import Week from '@/components/dashboard/calendar/Week';
import Day from '@/components/dashboard/calendar/Day';
import Month from '@/components/dashboard/calendar/Month';

import { initialData, initialWeekData } from './data';
import {
  getCalendarGridDates,
  getCalendarGridDatesWeek,
  getDaysOfWeek,
  getTimeSlots,
} from '@/lib/utils';
import {
  DAYS_IN_DAY,
  DAYS_IN_MONTH,
  DAYS_IN_WEEK,
  END_TIME_OF_DAY,
  EVENT_COLORS,
  START_TIME_OF_DAY,
} from '@/lib/const';
import { CalendarEventType } from '@/types/calendar';

// Navigation mapping for different view modes
const NAVIGATION_DAYS = {
  day: DAYS_IN_DAY,
  week: DAYS_IN_WEEK,
  month: DAYS_IN_MONTH,
} as const;

export default function CalendarViewWithRealDates() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEventType[]>(initialData);

  const navigatePrevious = () => {
    const val = NAVIGATION_DAYS[viewMode as keyof typeof NAVIGATION_DAYS] || DAYS_IN_WEEK;
    setCurrentDate(addDays(currentDate, -val));
  };

  const navigateNext = () => {
    const val = NAVIGATION_DAYS[viewMode as keyof typeof NAVIGATION_DAYS] || DAYS_IN_WEEK;
    setCurrentDate(addDays(currentDate, val));
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  // Update events to use current dates for visibility
  React.useEffect(() => {
    // Get the current week's days
    const weekDays = getDaysOfWeek(currentDate);

    // Update event dates to match the current week
    const updatedEvents = events.map((event, index) => {
      // Distribute events across the week
      const dayIndex = index % DAYS_IN_WEEK;
      const newStartDate = weekDays[dayIndex];
      const newEndDate = weekDays[dayIndex];

      return {
        ...event,
        startDate: newStartDate,
        endDate: newEndDate,
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on component mount

  // Handle adding a new event
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddEvent = (eventData: any) => {
    // Parse dates from strings if needed
    const startDate =
      typeof eventData.startDate === 'string' ? parseISO(eventData.startDate) : eventData.startDate;

    const endDate =
      typeof eventData.endDate === 'string' ? parseISO(eventData.endDate) : eventData.endDate;

    // Determine color based on event type
    const color =
      EVENT_COLORS[eventData.type.toUpperCase() as keyof typeof EVENT_COLORS] ||
      EVENT_COLORS.VACATION;

    // Create the new event
    const newEvent: CalendarEventType = {
      id: `event-${events.length + 1}`,
      title: eventData.description || `New ${eventData.type}`,
      startDate,
      endDate,
      color,
      isAllDay: eventData.isAllDay,
      ...(eventData.location && { location: eventData.location }),
      ...(eventData.startTime && { startTime: eventData.startTime }),
      ...(eventData.endTime && { endTime: eventData.endTime }),
    };

    // Add the new event to the events array
    setEvents([...events, newEvent]);
  };

  const daysOfWeek = getDaysOfWeek(currentDate);
  const timeSlots = getTimeSlots(START_TIME_OF_DAY, END_TIME_OF_DAY);
  const weeksOfMonth = getCalendarGridDates(currentDate);
  const DaysofWeeks = getCalendarGridDatesWeek(currentDate);

  return (
    <div className="p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium text-[#333333]">
            {format(startOfWeek(currentDate), 'MMMM d, yyyy')}-
            {format(endOfWeek(currentDate), 'MMMM d, yyyy')}
          </h1>
          {/* <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={navigatePrevious}
              className="h-6 w-6 text-[#555]"
            >
              &lt;
            </Button>
            <Button variant="ghost" size="icon" onClick={navigateToday} className="">
              Today
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateNext}
              className="h-6 w-6 text-[#555]"
            >
              &gt;
            </Button>
          </div> */}
          <Button
            className="bg-white border rounded-md p-2 hover:bg-gray-50"
            onClick={() => setIsAddModalOpen(true)}
          >
            <div className="relative w-5 h-5">
              <CalendarDays className="w-5 h-5 text-[#666]" />
              <Pencil className="w-3 h-3 absolute bottom-0 right-0 text-[#666]" />
            </div>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex border border-[#d9d9d9] rounded-md overflow-hidden">
            <Button
              variant="ghost"
              className={`rounded-none h-9 px-4 ${viewMode === 'day' ? 'bg-[#f5f5f5]' : 'bg-transparent'}`}
              onClick={() => setViewMode('day')}
            >
              Day
            </Button>
            <Button
              variant="ghost"
              className={`rounded-none h-9 px-4 ${viewMode === 'week' ? 'bg-[#f5f5f5]' : 'bg-transparent'}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant="ghost"
              className={`rounded-none h-9 px-4 ${viewMode === 'month' ? 'bg-[#f5f5f5]' : 'bg-transparent'}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'day' && (
        <Day
          events={events}
          timeSlots={timeSlots}
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
        />
      )}
      {viewMode === 'week' && (
        <Week daysOfWeek={DaysofWeeks} events={initialWeekData} timeSlots={timeSlots} />
      )}
      {viewMode === 'month' && (
        <Month
          weeksOfMonth={weeksOfMonth}
          events={events}
          timeSlots={timeSlots}
          currentDate={currentDate}
        />
      )}

      {/* Add Event Modal */}
      <AddCalendarEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEvent}
        defaultDate={format(currentDate, 'yyyy-MM-dd')}
      />
    </div>
  );
}
