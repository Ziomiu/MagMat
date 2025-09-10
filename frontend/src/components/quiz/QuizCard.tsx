import { Link } from "react-router-dom";
import type { Quiz } from "./types.ts";
import React from "react";

type Props = {
  quiz: Quiz;
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

function QuizCard({ quiz, setQuizzes }: Props) {
  return (
    <div className="border rounded m-2 p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{quiz.title}</h2>
      <p className="text-gray-500">{quiz.description}</p>
      <p className="mt-2 text-sm text-gray-400">
        {quiz.startDate} → {quiz.endDate}
      </p>
      <div className="mt-4 flex gap-2">
        <Link
          to={`/quiz/${quiz.id}/edit`}
          className="bg-yellow-400 px-3 py-1 rounded text-white"
        >
          Edit
        </Link>
        <button className="bg-red-500 px-3 py-1 rounded text-white">
          Delete
        </button>
      </div>
    </div>
  );
}

export default QuizCard;
