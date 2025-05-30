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
    icon?: string;
  };
  description?: string;
}
