'use client';

import React, { useState } from 'react';
import { CalendarDays, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddCalendarEventModal from '@/components/AddEvent';
import { format, startOfWeek, endOfWeek, parseISO, addMonths, subMonths } from 'date-fns';
import Week from '@/components/dashboard/calendar/Week';
import Day from '@/components/dashboard/calendar/Day';
import Month from '@/components/dashboard/calendar/Month';
import { getCalendarGridDates, getCalendarGridDatesWeek, getTimeSlots } from '@/lib/utils';
import { START_TIME_OF_DAY, END_TIME_OF_DAY, EVENT_COLORS } from '@/lib/const';
import { CalendarEventType } from '@/types/calendar';
import { FloatButton } from '@/components/dashboard/calendar/FloatButton';
import { Sidebar } from '@/components/dashboard/calendar/sidebar/Sidebar';

interface EventData {
  startDate: string | Date;
  endDate: string | Date;
  type: string;
  description?: string;
  isAllDay: boolean;
  location?: string;
  startTime?: string;
  endTime?: string;
}

interface CalendarProps {
  initialData: CalendarEventType[];
  initialWeekData: CalendarEventType[];
}

export default function Calendar({ initialData, initialWeekData }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEventType[]>(initialData);
  const [weekEvents, setWeekEvents] = useState<CalendarEventType[]>(initialWeekData);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleAddEvent = (eventData: EventData) => {
    const startDate =
      typeof eventData.startDate === 'string' ? parseISO(eventData.startDate) : eventData.startDate;
    const endDate =
      typeof eventData.endDate === 'string' ? parseISO(eventData.endDate) : eventData.endDate;
    const color =
      EVENT_COLORS[eventData.type.toUpperCase() as keyof typeof EVENT_COLORS] ||
      EVENT_COLORS.WAITLISTED;

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

    setEvents([...events, newEvent]);
  };

  const timeSlots = getTimeSlots(START_TIME_OF_DAY, END_TIME_OF_DAY);
  const weeksOfMonth = getCalendarGridDates(currentDate);
  const DaysofWeeks = getCalendarGridDatesWeek(currentDate);

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="p-2 hover:bg-gray-100" onClick={handlePreviousMonth}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-medium text-[#333333]">
            {format(startOfWeek(currentDate), 'MMMM d, yyyy')} -{' '}
            {format(endOfWeek(currentDate), 'MMMM d, yyyy')}
          </h1>
          <Button variant="ghost" className="p-2 hover:bg-gray-100" onClick={handleNextMonth}>
            <ChevronRight className="w-5 h-5" />
          </Button>
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
        <Week
          daysOfWeek={DaysofWeeks}
          events={weekEvents}
          timeSlots={timeSlots}
          setIsAddModalOpen={() => setIsAddModalOpen(!isAddModalOpen)}
          currentDate={currentDate}
        />
      )}
      {viewMode === 'month' && (
        <Month
          weeksOfMonth={weeksOfMonth}
          events={events}
          timeSlots={timeSlots}
          currentDate={currentDate}
        />
      )}

      <AddCalendarEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEvent}
        defaultDate={format(currentDate, 'yyyy-MM-dd')}
      />

      <FloatButton />

      <Sidebar events={weekEvents} setEvents={setWeekEvents} />
    </div>
  );
}
