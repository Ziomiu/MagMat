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
export type SubmissionSummary = {
  submissionId: string;
  studentId: string;
  name: string;
  surname: string;
  completed: boolean;
};

export type StudentAnswerDto = {
  id: string;
  questionId: string;
  questionText: string;
  selectedAnswerId?: string | null;
  selectedAnswerText?: string | null;
  textAnswer?: string | null;
  correct?: boolean | null;
  comment?: string | null;
};

export type SubmissionDetailDto = {
  submissionId: string;
  quizId: string;
  studentId: string;
  name: string;
  surname: string;
  submittedAt?: string | null;
  answers: StudentAnswerDto[];
};
export type StudentSubmissionListItem = {
  submissionId: string;
  quizId: string;
  quizTitle: string;
  submittedAt: string | null;
  graded: boolean;
};
