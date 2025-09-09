export type Answer = {
  id: number;
  text: string;
  correct: boolean;
};

export type QuestionType = "single" | "multiple" | "open";

export type Question = {
  id: number;
  type: QuestionType;
  text: string;
  answers?: Answer[];
};

export type Quiz = {
  id?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  questions: Question[];
};
