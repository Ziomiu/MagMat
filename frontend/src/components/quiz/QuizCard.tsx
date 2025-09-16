import { Link } from "react-router-dom";
import type { Quiz } from "./types.ts";
import React, { useState } from "react";

type Props = {
  quiz: Quiz;
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

function QuizCard({ quiz, setQuizzes }: Props) {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    try {
      const response = await fetch(`http://localhost:8080/quiz/${quiz.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        setQuizzes((prev) => prev.filter((q) => q.id !== quiz.id));
      } else {
        const msg = await response.text();
        setError(msg || `Unknown error (${response.status}).`);
      }
    } catch (e) {
      console.error(e);
      setError("Error while deleting quiz");
    }
  };

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
          className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-400/70"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-500/80"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="text-sm text-red-700">{error}</div>
    </div>
  );
}

export default QuizCard;
