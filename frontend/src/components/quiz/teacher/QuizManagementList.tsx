import type { Quiz } from "../types.ts";
import React from "react";
import QuizManagementCard from "./QuizManagementCard.tsx";
import EntityList from "../EntityList.tsx";

type Props = {
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

function QuizManagementList({ quizzes, setQuizzes }: Props) {
  return (
    <EntityList
      items={quizzes}
      emptyMessage="No quizzes created yet."
      renderItem={(quiz) => (
        <QuizManagementCard key={quiz.id} quiz={quiz} setQuizzes={setQuizzes} />
      )}
      className="p-4"
    />
  );
}

export default QuizManagementList;
