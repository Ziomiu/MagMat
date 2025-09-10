import QuizCard from "./QuizCard.tsx";
import type { Quiz } from "./types.ts";
import React from "react";

type Props = {
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

function QuizList({ quizzes, setQuizzes }: Props) {
  return (
    <div className="p-4 ">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} setQuizzes={setQuizzes} />
      ))}
    </div>
  );
}

export default QuizList;
