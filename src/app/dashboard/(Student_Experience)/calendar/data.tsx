import { CalendarEventType } from '@/types/calendar';

export const initialData = [
  {
    id: '1',
    title: 'FP-AddicMed',
    startDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
    color: '#60bd8e',
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    startTime: '8 AM',
    endTime: '9:30 AM',
    isAllDay: false,
    status: {
      text: 'Editable',
      color: '#8eeee4',
    },
    description: 'This is test!. This is test',
  },
  {
    id: '2',
    title: 'Surgery Rotation',
    startDate: new Date('2024-07-10'),
    endDate: new Date('2024-07-10'),
    color: '#60bd8e',
    location: "St. Paul's Hospital",
    teacher: 'DR. Sarah Johnson',
    startTime: '9 AM',
    endTime: '5 PM',
    isAllDay: false,
    status: {
      text: 'Editable',
      color: '#8eeee4',
    },
    description: "Surgery rotation at St. Paul's Hospital",
  },
];

export const initialWeekData = [
  {
    id: '1',
    title: 'FP-AddicMed',
    startDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
    color: '#60bd8e',
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    startTime: '8 AM',
    endTime: '9:30 AM',
    isAllDay: false,
    status: {
      text: 'Editable',
      color: '#8eeee4',
    },
    description: 'This is test!. This is test',
  },
  {
    id: '2',
    title: 'Surgery Rotation',
    startDate: new Date('2024-07-10'),
    endDate: new Date('2024-07-10'),
    color: '#60bd8e',
    location: "St. Paul's Hospital",
    teacher: 'DR. Sarah Johnson',
    startTime: '9 AM',
    endTime: '5 PM',
    isAllDay: false,
    status: {
      text: 'Editable',
      color: '#8eeee4',
    },
    description: "Surgery rotation at St. Paul's Hospital",
  },
];

export const totalWeekData: CalendarEventType[] = [
  {
    id: '1',
    title: 'FP-AddicMed',
    startDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
    color: '#FACC15',
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    isAllDay: false,
    startTime: '7 AM',
    endTime: '9:30 AM',
    status: {
      text: 'Waitlisted',
    },
    description: 'This is test!. This is test',
  },
  {
    id: '2',
    title: 'Surgery Rotation',
    startDate: new Date('2024-07-10'),
    endDate: new Date('2024-07-10'),
    color: '#FACC15',
    location: "St. Paul's Hospital",
    teacher: 'DR. Sarah Johnson',
    startTime: '9 AM',
    endTime: '5 PM',
    isAllDay: false,
    status: {
      text: 'Waitlisted',
    },
    description: "Surgery rotation at St. Paul's Hospital",
  },
];
