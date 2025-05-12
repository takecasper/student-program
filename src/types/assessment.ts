export type Assessment = {
  id: string;
  activity: string;
  courseCode: string;
  evaluator?: {
    name: string;
    avatar?: string;
  };
  target?: {
    name: string;
    avatar?: string;
    details: string[];
  };
  formName: string;
  dateFrom: string;
  dateTo: string;
  status?: 'Confirmed and Viewed' | 'Pending' | 'Rejected';
  confirmedDate?: string;
  level?: string;
  dateDone?: string;
};
