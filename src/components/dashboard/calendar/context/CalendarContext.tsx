'use client';
import { SlideStates } from '@/lib/const';
import { CalendarEventType, SlideState } from '@/types/calendar';
import { ReactNode, createContext, useContext, useState } from 'react';

export interface CalendarProviderContext {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  slideState: SlideState;
  setSlideState: React.Dispatch<React.SetStateAction<SlideState>>;
  selectedEvent: CalendarEventType | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<CalendarEventType | null>>;
  selectedSwapEvent: CalendarEventType | null;
  setSelectedSwapEvent: React.Dispatch<React.SetStateAction<CalendarEventType | null>>;
}

export const CalendarContext = createContext<CalendarProviderContext>(
  {} as CalendarProviderContext,
);

export function useCalendarContext() {
  return useContext(CalendarContext);
}

export function CalendarContextProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [slideState, setSlideState] = useState<SlideState>(SlideStates.INIT_ADD);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventType | null>(null);
  const [selectedSwapEvent, setSelectedSwapEvent] = useState<CalendarEventType | null>(null);

  return (
    <CalendarContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        slideState,
        setSlideState,
        selectedEvent,
        setSelectedEvent,
        selectedSwapEvent,
        setSelectedSwapEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
