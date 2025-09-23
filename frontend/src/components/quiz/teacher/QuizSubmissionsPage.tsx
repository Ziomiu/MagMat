import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../libs/api";
import type { Quiz } from "../types";
import { useAuth } from "../../../context/UseAuth.tsx";

function TeacherQuizzesPanel() {
  const { userId } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Quiz[]>(`/quiz/user/${userId}`);
        setQuizzes(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your quizzes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Quizzes</h1>
      {quizzes.length === 0 ? (
        <p className="text-gray-500">You haven’t created any quizzes yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{quiz.title}</h2>
              <p className="text-sm text-gray-500">{quiz.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(quiz.startDate).toLocaleDateString()} →{" "}
                {new Date(quiz.endDate).toLocaleDateString()}
              </p>
              <Link
                to={`/teacher/quiz/${quiz.id}/submissions`}
                className="mt-3 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                View Submissions
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeacherQuizzesPanel;
