import { ElectiveOption } from '@/types/elective';

export const mockUser = {
  id: 'user123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
  role: 'Student',
  avatar: '/avatar.png',
};

// Mock dashboard data
export const mockDashboardData = {
  courses: [
    { id: 1, title: 'Introduction to Psychology', progress: 75, instructor: 'Dr. Sarah Johnson' },
    { id: 2, title: 'Advanced Mathematics', progress: 45, instructor: 'Prof. Michael Chen' },
    { id: 3, title: 'World History', progress: 90, instructor: 'Dr. Emily Rodriguez' },
  ],
  announcements: [
    {
      id: 1,
      title: 'New Course Available',
      date: '2023-06-15',
      content: 'Check out our new course on Data Science!',
    },
    {
      id: 2,
      title: 'System Maintenance',
      date: '2023-06-20',
      content: 'The platform will be down for maintenance on June 20th from 2-4 AM EST.',
    },
  ],
  upcomingEvents: [
    { id: 1, title: 'Virtual Study Group', date: '2023-06-18 14:00', location: 'Zoom' },
    {
      id: 2,
      title: 'Guest Lecture: AI Ethics',
      date: '2023-06-22 10:00',
      location: 'Main Auditorium',
    },
  ],
};

export const mockElectives: ElectiveOption[] = [
  {
    id: '1',
    name: 'AN-ANES-DELTA-DH',
    duration: '4 Weeks',
    dates: ['July 1 - July 7, 2025', 'July 7 - July 14, 2025', 'July 15 - July 24, 2025'],
    instructor: 'Mr. Padila',
    city: 'Davao City',
  },
  {
    id: '2',
    name: 'AN-ANES-BETA-DH',
    duration: '4 Weeks',
    dates: [
      'August 1 - August 7, 2025',
      'August 8 - August 15, 2025',
      'August 16 - August 23, 2025',
    ],
    instructor: 'Dr. Santos',
    city: 'Manila City',
  },
  {
    id: '3',
    name: 'AN-ANES-GAMMA-DH',
    duration: '4 Weeks',
    dates: [
      'September 1 - September 7, 2025',
      'September 8 - September 15, 2025',
      'September 16 - September 23, 2025',
    ],
    instructor: 'Dr. Reyes',
    city: 'Cebu City',
  },
];
