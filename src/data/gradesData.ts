import { GradesData } from '@/types/course';

export const gradesData: GradesData = {
  overall: {
    score: '83.00',
    period: 'Jan 28, 2025 - Feb 2, 2025',
  },
  categories: [
    {
      name: 'Quizzes',
      items: [
        { title: 'Quiz 1 (out of 100)', score: '78.00' },
        { title: 'Quiz 2 (out of 100)', score: '78.00' },
      ],
    },
    {
      name: 'Participation',
      items: [
        { title: 'Class Participation', score: '78.00' },
        { title: 'Attendance', score: '78.00' },
      ],
    },
    {
      name: 'Projects',
      items: [
        { title: 'Women&apos;s Health Campaign', score: '78.00' },
        { title: 'Group Research Paper', score: '78.00' },
      ],
    },
    {
      name: 'Exams',
      items: [
        { title: 'Midterm Exam', score: '78.00' },
        { title: 'Final Exam', score: '78.00' },
      ],
    },
  ],
};
