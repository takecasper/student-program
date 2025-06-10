export interface StandardQuestion {
  id: number;
  time: string;
  question: string;
  tags: string[];
}

export type QuestionTab = 'QUESTION_BANK' | 'TIMING_FLOW';
