export interface CourseDetailSidebarProps {
  courseName: string;
  startDate: string;
  endDate: string;
  gradYear: string;
  facilitators: string;
  objectives: string[];
  onClose: () => void;
  onExpand: (expanded: boolean) => void;
}

export interface SessionItem {
  day: string;
  date: string;
  time: string;
  facilitator: string;
  location: string;
  isHighlighted: boolean;
  attendees: number;
}

export interface HandoutItem {
  title: string;
  addedBy: string;
  date: string;
}

export interface GradeItem {
  title: string;
  score: string;
}

export interface GradeCategory {
  name: string;
  items: GradeItem[];
}

export interface GradesData {
  overall: {
    score: string;
    period: string;
  };
  categories: GradeCategory[];
}

export type CourseData = {
  id: string;
  courseName: string;
  location: string;
  from: string;
  to: string;
};
