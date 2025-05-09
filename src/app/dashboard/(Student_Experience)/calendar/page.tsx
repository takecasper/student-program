'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddCalendarEventModal from '@/components/AddEvent';
import { format, startOfWeek, addDays, parseISO, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval } from 'date-fns';
import Week from '@/components/dashboard/calendar/Week'
import Day from '@/components/dashboard/calendar/Day'
import Month from '@/components/dashboard/calendar/Month'

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

export default function CalendarViewWithRealDates() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEventType[]>([
    {
      id: '1',
      title: 'Surgery - Hospital A',
      startDate: new Date(2023, 3, 15), // Using current month for visibility
      endDate: new Date(2023, 3, 15),
      color: '#70c0b8',
      isAllDay: true,
    },
    {
      id: '2',
      title: 'Vacation Leave',
      startDate: new Date(2023, 3, 17), // Using current month for visibility
      endDate: new Date(2023, 3, 17),
      color: '#70c0b8',
      isAllDay: true,
      status: {
        text: 'Approved',
        color: '#8eeee4',
        dotColor: '#00a59b',
      },
    },
    {
      id: '3',
      title: 'Send EPA FORM - Deadline',
      startDate: new Date(2023, 3, 19), // Using current month for visibility
      endDate: new Date(2023, 3, 19),
      color: '#ff0000',
      isAllDay: true,
    },
    {
      id: '4',
      title: 'Evaluation Form',
      startDate: new Date(2023, 3, 16), // Using current month for visibility
      endDate: new Date(2023, 3, 16),
      startTime: '8 AM',
      endTime: '9:30 AM',
      location: 'H & S 403',
      color: '#f5ca66',
      isAllDay: false,
    },
    {
      id: '5',
      title: 'Academic Session',
      startDate: new Date(2023, 3, 18), // Using current month for visibility
      endDate: new Date(2023, 3, 18),
      startTime: '8 AM',
      endTime: '9:30 AM',
      location: 'H & S 403',
      color: '#70c0b8',
      isAllDay: false,
    },
  ]);

  // Get days of the week based on current date
  const getDaysOfWeek = () => {
    const days = [];
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday

    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }

    return days;
  };

  // Get time slots for the day
  const getTimeSlots = () => {
    const slots = [];
    for (let i = 6; i < 20; i++) {
      // 6 AM to 7 PM
      slots.push(i);
    }
    return slots;
  };

  // Handle adding a new event
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddEvent = (eventData: any) => {
    // Parse dates from strings if needed
    const startDate =
      typeof eventData.startDate === 'string' ? parseISO(eventData.startDate) : eventData.startDate;

    const endDate =
      typeof eventData.endDate === 'string' ? parseISO(eventData.endDate) : eventData.endDate;

    // Determine color based on event type
    let color = '#70c0b8';
    if (eventData.type === 'event') color = '#dd99f6';
    if (eventData.type === 'duty') color = '#f5ca66';

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

  // Navigate to previous/next week
  const navigatePrevious = () => {
    let val = 7

    switch (viewMode) {
      case "day":
        val = 1;
        break;
      case "week":
        val = 7;
        break;
      case "month":
        val = 35;
        break;
      default:
        val = 7
        break;
    }
    setCurrentDate(addDays(currentDate, -val));
  };

  const navigateNext = () => {
    let val = 7

    switch (viewMode) {
      case "day":
        val = 1;
        break;
      case "week":
        val = 7;
        break;
      case "month":
        val = 35;
        break;
      default:
        val = 7
        break;
    }
    setCurrentDate(addDays(currentDate, val));
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  // Update events to use current dates for visibility
  React.useEffect(() => {
    // Get the current week's days
    const weekDays = getDaysOfWeek();

    // Update event dates to match the current week
    const updatedEvents = events.map((event, index) => {
      // Distribute events across the week
      const dayIndex = index % 7;
      const newStartDate = weekDays[dayIndex];
      const newEndDate = weekDays[dayIndex];

      return {
        ...event,
        startDate: newStartDate,
        endDate: newEndDate,
      };
    });

    setEvents(updatedEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on component mount

  const daysOfWeek = getDaysOfWeek();
  const timeSlots = getTimeSlots();
  const weeksOfMonth = getCalendarGridDates();
  
  function getCalendarGridDates() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = startOfMonth(new Date(year, month));
    const lastDayOfMonth = endOfMonth(firstDayOfMonth);

    const calendarStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }); // Monday
    const calendarEnd = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

    const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    // Group into weeks
    const weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }

    return weeks;
  }

  return (
    <div className="p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium text-[#333333]">{format(currentDate, 'MMMM yyyy')}</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={navigatePrevious} className="h-8 px-2">
              &lt;
            </Button>
            <Button variant="outline" size="sm" onClick={navigateToday} className="h-8">
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={navigateNext} className="h-8 px-2">
              &gt;
            </Button>
          </div>
          <Button
            className="bg-[#364699] rounded-full hover:bg-[#253170] text-white gap-1"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add
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

      {viewMode === 'day' && <Day events={events} timeSlots={timeSlots} setCurrentDate={setCurrentDate} currentDate={currentDate} />}
      {viewMode === 'week' && <Week daysOfWeek={daysOfWeek} events={events} timeSlots={timeSlots} />}
      {viewMode === 'month' && <Month weeksOfMonth={weeksOfMonth} events={events} timeSlots={timeSlots} currentDate={currentDate} />}

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
