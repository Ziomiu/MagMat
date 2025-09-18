import { Link } from "react-router-dom";
import type { Quiz } from "./types.ts";
import React, { useState } from "react";
import { api } from "../../libs/api.ts";
import axios from "axios";
import StudentModal from "../student/StudentModal.tsx";

type Props = {
  quiz: Quiz;
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

function QuizCard({ quiz, setQuizzes }: Props) {
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await api.delete(`/quiz/${quiz.id}`);

      setQuizzes((prev) => prev.filter((q) => q.id !== quiz.id));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const msg =
            err.response.data?.message ||
            `Unknown error (${err.response.status})`;
          setError(msg);
        } else {
          setError("Error while deleting quiz");
        }
      } else {
        console.error(err);
      }
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
        <button
          className="bg-orange-600 px-3 py-1 rounded text-white hover:bg-orange-600/80"
          onClick={() => setModalOpen(true)}
        >
          Assign
        </button>
      </div>
      <div className="text-sm text-red-700">{error}</div>
      <StudentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default QuizCard;
