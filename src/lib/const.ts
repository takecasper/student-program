// Calendar Constants
export const ZERO = 0;
export const DAYS_IN_WEEK = 7;
export const DAYS_IN_DAY = 1;
export const DAYS_IN_MONTH = 35;

export const TWELVE_HOUR = 12;
export const TWENTY_FOUR_HOUR = 24;

export const START_TIME_OF_DAY = 6; // 6 AM
export const END_TIME_OF_DAY = 20; // 8 PM

// Event Type Constants
export const EVENT_TYPES = {
  VACATION: 'vacation',
  EVENT: 'event',
  DUTY: 'duty',
} as const;

// Event Color Constants
export const EVENT_COLORS = {
  VACATION: '#70c0b8', // Teal
  EVENT: '#dd99f6', // Purple
  DUTY: '#f5ca66', // Yellow
} as const;
