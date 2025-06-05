import React from 'react';

import { initialData, initialWeekData } from './data';
import { CalendarContextProvider } from '@/components/dashboard/calendar/context/CalendarContext';
import Calendar from '@/components/dashboard/calendar/sidebar/Calendar';

export default function Page() {
  return (
    <CalendarContextProvider>
      <Calendar initialData={initialData} initialWeekData={initialWeekData} />
    </CalendarContextProvider>
  );
}
