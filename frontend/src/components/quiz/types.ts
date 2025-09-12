export type Answer = {
  id: string;
  text: string;
  correct: boolean;
};

export type QuestionType = "SINGLE" | "MULTIPLE" | "OPEN";

export type Question = {
  id: string;
  type: QuestionType;
  text: string;
  answers: Answer[];
};

export type Quiz = {
  id?: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  questions: Question[];
  createdById: string;
};
