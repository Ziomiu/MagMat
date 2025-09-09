import type { Answer, Question, Quiz } from "./types.ts";

export const sampleAnswers: Answer[] = [
  {
    id: 1,
    text: "answer",
    correct: true,
  },
  {
    id: 2,
    text: "answer2",
    correct: false,
  },
];
export const sampleQuestions: Question[] = [
  {
    id: 1,
    type: "single",
    text: "question1",
    answers: sampleAnswers,
  },
  {
    id: 2,
    type: "multiple",
    text: "question2",
    answers: sampleAnswers,
  },
  {
    id: 3,
    type: "open",
    text: "question2",
  },
];
export const sampleQuizzes: Quiz[] = [
  {
    id: 1,
    title: "quiz1",
    description: "description1",
    startDate: "12-05-2025",
    endDate: "16-05-2025",
    targetAudience: "all",
    questions: sampleQuestions,
  },
  {
    id: 2,
    title: "quiz2",
    description: "description2",
    startDate: "12-06-2025",
    endDate: "16-06-2025",
    targetAudience: "all",
    questions: sampleQuestions,
  },
];
