export interface CalendarEventType {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  color: string;
  isAllDay: boolean;
  isEditable?: boolean;
  location?: string;
  teacher?: string;
  status?: {
    text: string;
    color: string;
    dotColor: string;
    icon?: string;
  };
  description?: string;
}
