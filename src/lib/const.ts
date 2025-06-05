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
  PENDING: 'Pending',
  DROP_REQUESTED: 'Drop Requested',
  WAITLISTED: 'Waitlisted',
  CONFIRMED: 'Confirmed',
  EDITABLE: 'Editable',
  SWAP_REQUESTED: 'Swap Requested',
} as const;

// Event Color Constants
export const EVENT_COLORS = {
  PENDING: '#a49ee8', // Teal
  DROP_REQUESTED: '#f38c8d', // Purple
  WAITLISTED: '#FACC15', // Yellow
  CONFIRMED: '#60bd8e',
  SWAP_REQUESTED: '#5c86cf',
} as const;

export const SlideStates = {
  DEFAULT: 'DEFAULT',
  INIT_ADD: 'INIT_ADD',
  CONFIRM: 'CONFIRM',
  SUBMIT_ADD: 'SUBMIT_ADD',
  INIT_SWAP: 'INIT_SWAP',
  SWAP_REQUEST_A: 'SWAP_REQUEST_A',
  SWAP_REQUEST_B: 'SWAP_REQUEST_B',
  CONFIRM_SWAP: 'CONFIRM_SWAP',
  INIT_DROP: 'INIT_DROP',
  DROP_REQUEST: 'DROP_REQUEST',
} as const;
