export type UserRole = 'student' | 'program_experience';
export type User = { email: string; role: UserRole };
export type Users = User[];

export const users: Users = [
  {
    email: 'student@aculty.com',
    role: 'student',
  },
  {
    email: 'program@aculty.com',
    role: 'program_experience',
  },
];
