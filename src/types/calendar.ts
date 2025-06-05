export interface CalendarEventType {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  color: string;
  isAllDay: boolean;
  location?: string;
  teacher?: string;
  status?: Status;
  description?: string;
}

export interface Status {
  text:
    | 'Pending'
    | 'Drop Requested'
    | 'Waitlisted'
    | 'Confirmed'
    | 'Editable'
    | 'Swap Requested'
    | string;
  color?: string;
}

export type SlideState =
  | 'CONFIRM'
  | 'INIT_ADD'
  | 'SUBMIT_ADD'
  | 'INIT_SWAP'
  | 'CONFIRM_SWAP'
  | 'SWAP_REQUEST_A'
  | 'SWAP_REQUEST_B'
  | 'INIT_DROP'
  | 'DROP_REQUEST'
  | 'DEFAULT';
