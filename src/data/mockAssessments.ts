import { Assessment } from '@/types/assessment';

export const mockAssessments: Assessment[] = [
  {
    id: '1',
    activity: 'AY 25-26 - Year 3(2027) :: Personal and Professional Development 3',
    courseCode: '1: Undergrad',
    evaluator: {
      name: 'Anonymous',
      avatar: '/target_avatar.png',
    },
    formName: 'Course Director Assement of Student: PPD 3',
    dateFrom: 'Mar 6, 2025',
    dateTo: 'Mar 6, 2025',
    status: 'Confirmed and Viewed',
    confirmedDate: 'April 09/25',
    level: '1',
  },
  {
    id: '2',
    activity: 'AY 25-26 - Year 3(2027) :: Clinical Skills 3',
    courseCode: '1: Undergrad',
    evaluator: {
      name: 'Anonymous',
      avatar: '/target_avatar.png',
    },
    formName: 'Course Director Assement of Student: CS 3',
    dateFrom: 'Mar 8, 2025',
    dateTo: 'Mar 8, 2025',
    status: 'Confirmed and Viewed',
    confirmedDate: 'April 10/25',
    level: '2',
  },
  {
    id: '3',
    activity: 'AY 25-26 - Year 3(2027) :: Medical Knowledge 3',
    courseCode: '1: Undergrad',
    evaluator: {
      name: 'Anonymous',
      avatar: '/target_avatar.png',
    },
    formName: 'Course Director Assement of Student: MK 3',
    dateFrom: 'Mar 10, 2025',
    dateTo: 'Mar 10, 2025',
    status: 'Confirmed and Viewed',
    confirmedDate: 'April 11/25',
    level: '3',
  },
  {
    id: '4',
    activity: 'AY 25-26 - Year 3(2027) :: Patient Care 3',
    courseCode: '1: Undergrad',
    evaluator: {
      name: 'Anonymous',
      avatar: '/target_avatar.png',
    },
    formName: 'Course Director Assement of Student: PC 3',
    dateFrom: 'Mar 12, 2025',
    dateTo: 'Mar 12, 2025',
    status: 'Confirmed and Viewed',
    confirmedDate: 'April 12/25',
    level: '1',
  },
];

export const byMeAssessments: Assessment[] = [
  {
    id: '1',
    activity: 'MIDP835A Internal Medicine Clerkship - Banner University- Phoenix',
    courseCode: '1: Undergrad',
    target: {
      name: 'MIDP835A Internal Medicine Clerkship - Banner University- Phoenix',
      details: ['Residiential(s).tba', 'Faculty(s).tba'],
    },
    formName: 'Course Director Assement of Student: PPD 3',
    dateFrom: 'Mar 6, 2025',
    dateTo: 'Mar 6, 2025',
    dateDone: 'March 31 2025',
  },
  {
    id: '4',
    activity: 'AY 25-26 - Year 3(2027) :: Patient Care 3',
    courseCode: '1: Undergrad',
    target: {
      name: 'Anonymous',
      avatar: '/target_avatar.png',
      details: [],
    },
    formName: 'Course Director Assement of Student: PC 3',
    dateFrom: 'Mar 12, 2025',
    dateTo: 'Mar 12, 2025',
    dateDone: 'March 31 2025',
  },
];
