import { CalendarEventType } from "@/types/calendar";

export const initialData = [
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
      text: 'Editable',
      color: '#8eeee4',
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
    startDate: new Date(2023, 4, 30), // Using current month for visibility
    endDate: new Date(2023, 4, 30),
    startTime: '8 AM',
    endTime: '9:30 AM',
    location: 'H & S 403',
    teacher: 'DR. Geoffrey Blair',
    color: '#70c0b8',
    isAllDay: false,
  },
  {
    id: '6',
    title: 'Vacation Leave1',
    startDate: new Date(2025, 4, 30), // Using current month for visibility
    endDate: new Date(2025, 6, 17),
    startTime: '7 AM',
    endTime: '8 PM',
    color: '#70c0b8', // bar color
    location: 'H & S 403',
    teacher: 'DR. Geoffrey Blair',
    isAllDay: false,
    status: {
      text: 'Editable',
      color: '#8eeee4',
    },
    description: 'This is test!. This is test',
  },
  {
    id: '7',
    title: 'Vacation Leave1',
    startDate: new Date(2025, 4, 30), // Using current month for visibility
    endDate: new Date(2025, 6, 17),
    startTime: '7 AM',
    endTime: '8 PM',
    color: '#70c0b8', // bar color
    location: 'H & S 403',
    teacher: 'DR. Geoffrey Blair',
    isAllDay: false,
    status: {
      text: 'Editable',
      color: '#8eeee4',
    },
    description: 'This is test!. This is test',
  },
  {
    id: '9',
    title: 'Academic Session',
    startDate: new Date(2025, 4, 30), // Using current month for visibility
    endDate: new Date(2025, 4, 30),
    location: 'H & S 403',
    color: '#70c0b8',
    isAllDay: true,
  },
  {
    id: '10',
    title: 'Academic Session',
    startDate: new Date(2025, 4, 30), // Using current month for visibility
    endDate: new Date(2025, 4, 30),
    location: 'H & S 403',
    color: '#70c0b8',
    isAllDay: true,
  },
];

export const initialWeekData = [
  {
    id: '1',
    title: 'FP-AddicMed',
    startDate: new Date('2025-06-15'), // Using current month for visibility
    endDate: new Date('2025-06-17'),
    color: '#70c0b8', // bar color
    location: 'H & S 403',
    teacher: 'DR. Geoffrey Blair',
    isAllDay: true,
    description: 'This is test!. This is test',
  },

  {
    id: '2',
    title: 'FP-AddicMed',
    startDate: new Date('2025-06-30'), // Using current month for visibility
    endDate: new Date('2025-07-02'),
    color: '#f38c8d', // bar color
    location: 'H & S 403',
    teacher: 'DR. Geoffrey Blair',
    isAllDay: true,
    status: {
      text: 'Drop Requested',
      color: '#f38c8d',
    },
    description: 'This is test!. This is test',
  },

  {
    id: '3',
    title: 'FP-AddicMed',
    startDate: new Date('2025-06-04'), // Using current month for visibility
    endDate: new Date('2025-06-10'),
    color: '#60bd8e', // bar color
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
    id: '4',
    title: 'FP-AddicMed',
    startDate: new Date('2025-06-18'), // Using current month for visibility
    endDate: new Date('2025-06-24'),
    color: '#a49ee8', // bar color
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    startTime: '8 AM',
    endTime: '9:30 AM',
    isAllDay: false,
    status: {
      text: 'Pending',
      color: '#a49ee8',
    },
    description: 'This is test!. This is test',
  },

  {
    id: '5',
    title: 'FP-AddicMed',
    startDate: new Date('2025-07-09'), // Using current month for visibility
    endDate: new Date('2025-07-15'),
    color: '#60bd8e', // bar color
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    startTime: '8 AM',
    endTime: '9:30 AM',
    isAllDay: false,
    status: {
      text: 'Confirmed',
      color: '#60bd8e',
    },
    description: 'This is test!. This is test',
  },

  {
    id: '6',
    title: 'FP-AddicMed',
    startDate: new Date('2025-06-04'), // Using current month for visibility
    endDate: new Date('2025-06-10'),
    color: '#60bd8e', // bar color
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    startTime: '9 AM',
    endTime: '9:30 AM',
    isAllDay: false,
    status: {
      text: 'Editable',
      color: '#8eeee4',
    },
    description: 'This is test!. This is test',
  },
  {
    id: '7',
    title: 'FP-AddicMed',
    startDate: new Date('2025-06-04'), // Using current month for visibility
    endDate: new Date('2025-06-10'),
    color: '#a49ee8', // bar color
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    startTime: '9 AM',
    endTime: '9:30 AM',
    isAllDay: false,
    status: {
      text: 'Pending',
      color: '#a49ee8',
    },
    description: 'This is test!. This is test',
  },

  {
    id: '8',
    title: 'FP-AddicMed',
    startDate: new Date('2025-06-17'), // Using current month for visibility
    endDate: new Date('2025-07-12'),
    color: '#f38c8d', // bar color
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    startTime: '9 AM',
    endTime: '9:30 AM',
    isAllDay: false,
    status: {
      text: 'Drop Requested',
      color: '#f38c8d',
    },
    description: 'This is test!. This is test',
  },
];

export const initialWeekData1 = [
  {
    id: '1',
    title: 'FP-AddicMed',
    startDate: new Date('2025-07-09'), // Using current month for visibility
    endDate: new Date('2025-07-15'),
    color: '#60bd8e', // bar color
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    startTime: '8 AM',
    endTime: '9:30 AM',
    isAllDay: false,
    status: {
      text: 'Confirmed',
      color: '#60bd8e',
    },
    description: 'This is test!. This is test',
  },
  {
    id: '3',
    title: 'FP-AddicMed',
    startDate: new Date('2025-07-09'), // Using current month for visibility
    endDate: new Date('2025-07-15'),
    color: '#60bd8e', // bar color
    location: 'Vancouver Genral Hospital - Surgical Departmer',
    teacher: 'DR. Geoffrey Blair',
    startTime: '8 AM',
    endTime: '9:30 AM',
    isAllDay: false,
    status: {
      text: 'Editable',
      color: '#60bd8e',
    },
    description: 'This is test!. This is test',
  },
];

export const totalWeekData : CalendarEventType[] = [
  {
    id: '1',
    title: 'FP-AddicMed',
    startDate: new Date('2025-07-04'), // Using current month for visibility
    endDate: new Date('2025-07-12'),
    color: '#FACC15', // bar color
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
    title: 'FP-AddicMed',
    startDate: new Date('2025-07-04'), // Using current month for visibility
    endDate: new Date('2025-07-12'),
    color: '#FACC15', // bar color
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
    id: '3',
    title: 'FP-AddicMed',
    startDate: new Date('2025-07-04'), // Using current month for visibility
    endDate: new Date('2025-07-12'),
    color: '#FACC15', // bar color
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
];
