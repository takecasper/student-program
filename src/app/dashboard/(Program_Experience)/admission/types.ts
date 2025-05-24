export type Course = {
  course: string;
  pastTest: string;
  score: number | string;
};

export type Student = {
  name: string;
  program: string;
  image: string;
  canEnroll: boolean;
  score1: string;
  score2: string;
  score3: string;
  score4: string;
  email: string;
  pastTest?: Course[];
};

export type AdmissionData = {
  id: number;
  name: string;
  applied: number;
  students: Student[];
};

export type SidebarProps = {
  show: boolean;
  student: null | Student;
};
