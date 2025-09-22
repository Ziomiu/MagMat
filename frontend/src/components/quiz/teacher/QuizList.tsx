import type { Quiz } from "../types.ts";
import React from "react";
import QuizCard from "./QuizCard.tsx";
import EntityList from "../EntityList.tsx";

type Props = {
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

function QuizList({ quizzes, setQuizzes }: Props) {
  return (
    <EntityList
      items={quizzes}
      emptyMessage="No quizzes created yet."
      renderItem={(quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} setQuizzes={setQuizzes} />
      )}
      className="p-4"
    />
  );
}

export default QuizList;
