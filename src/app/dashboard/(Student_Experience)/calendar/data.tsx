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
      text: 'Approved',
      color: '#8eeee4',
      dotColor: '#00a59b',
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
      text: 'Approved',
      color: '#8eeee4',
      dotColor: '#00a59b',
      icon: 'icon',
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
