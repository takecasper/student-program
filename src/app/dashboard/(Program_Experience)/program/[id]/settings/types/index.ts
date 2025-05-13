export type UserData = {
  id: string;
  username: string;
  role: string;
  status: string;
  image: string;
};

export type EvaluationData = {
  id: number;
  completion: string;
  formName: string;
  date: string;
  totalUsers: number;
  users: UserData[];
  courseName: string;
};
