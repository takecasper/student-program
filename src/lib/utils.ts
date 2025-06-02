import { clsx, type ClassValue } from 'clsx';
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
  format,
} from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { DAYS_IN_WEEK, TWELVE_HOUR, ZERO } from './const';
import { CalendarEventType } from '@/types/calendar';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get days of the week based on current date
export const getDaysOfWeek = (currentDate: Date): Date[] => {
  const days: Date[] = [];
  const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday

  for (let i = 0; i < 7; i++) {
    days.push(addDays(start, i));
  }

  return days;
};

// Get time slots for the day
export const getTimeSlots = (startTime: number, endTime: number) => {
  const slots = [];
  for (let i = startTime; i < endTime; i++) {
    // startTime AM to endTime PM
    slots.push(i);
  }
  return slots;
};

//get Dates of weeks in current month
export const getCalendarGridDates = (currentDate: Date) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDayOfMonth = startOfMonth(new Date(year, month));
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);

  const calendarStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }); // Monday
  const calendarEnd = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

  const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Group into weeks
  const weeks = [];
  for (let i = ZERO; i < allDays.length; i += DAYS_IN_WEEK) {
    weeks.push(allDays.slice(i, i + DAYS_IN_WEEK));
  }

  return weeks;
};

//get Dates of weeks in current month
export const getCalendarGridDatesWeek = (currentDate: Date) => {
  const startDay = startOfWeek(currentDate);
  const endDay = addDays(startDay, DAYS_IN_WEEK * DAYS_IN_WEEK - 1);
  const allDays = eachDayOfInterval({ start: startDay, end: endDay });

  const weeks = [];
  for (let i = ZERO; i < allDays.length; i += DAYS_IN_WEEK) {
    weeks.push(allDays.slice(i, i + DAYS_IN_WEEK));
  }

  return weeks;
};

//get Seven Weeks Shorten title
export const getWeeksShortenTitle = (currentDate: Date, num: number = 7) => {
  const title: string[] = [];
  for (let i = ZERO; i < num; i++) {
    const startDate = addDays(currentDate, DAYS_IN_WEEK * i);
    const endDate = addDays(startDate, DAYS_IN_WEEK - 1);
    const month = format(startDate, 'MMM');
    const weekStr = `${month} ${startDate.getDate()}-${endDate.getDate()}`;
    title.push(weekStr);
  }

  return title;
};

// Get events for a specific time slot
export const getEventsForTimeSlot = (events: CalendarEventType[], day: Date, hour: number) => {
  return events.filter((event: CalendarEventType) => {
    if (event.isAllDay) return false;
    if (!isSameDay(event.startDate, day)) return false;

    // Check if the event starts at this hour
    if (event.startTime) {
      const eventHour = Number.parseInt(event.startTime.split(' ')[0]);
      const isPM = event.startTime.includes('PM');
      const hour24 = isPM && eventHour !== TWELVE_HOUR ? eventHour + TWELVE_HOUR : eventHour;
      return hour === hour24;
    }

    return false;
  });
};

// Get events for a specific day
export const getEventsForDay = (events: CalendarEventType[], day: Date, allDay = false) => {
  return events.filter((event: CalendarEventType) => {
    return isSameDay(event.startDate, day) && event.isAllDay === allDay;
  });
};

export const getOverlappingWeekCount = (
  weeks: Date[][],
  startDate: string | Date,
  endDate: string | Date,
) => {
  const rangeStart = new Date(startDate);
  const rangeEnd = new Date(endDate);
  return weeks
    .map((week, index) => {
      const weekStart = week[0];
      const weekEnd = week[6];

      const overlaps = weekStart <= rangeEnd && weekEnd >= rangeStart;

      return overlaps ? index : null;
    })
    .filter(index => index !== null);
};

export const getEventsForWeek = (
  events: CalendarEventType[],
  startDate: Date,
  endDate: Date,
  allDay = false,
) => {
  return events.filter(
    event => startDate <= event.endDate && endDate >= event.startDate && event.isAllDay === allDay,
  );
};

export const getEventsForWeekStart = (
  events: CalendarEventType[],
  startDate: Date,
  endDate: Date,
  allDay = false,
) => {
  return events.filter(
    event =>
      startDate <= event.startDate && endDate >= event.startDate && event.isAllDay === allDay,
  );
};
