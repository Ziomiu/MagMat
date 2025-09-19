import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../libs/api.ts";
import { useAuth } from "../../../context/UseAuth.tsx";
import type { Quiz } from "../types";

function StudentQuizzesList() {
  const { userId } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get<Quiz[]>(`quiz/student/${userId}`);
        console.log(res.data);
        setQuizzes(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Quizzes</h1>

      {quizzes.length === 0 && (
        <p className="text-gray-500">No quizzes assigned to you yet.</p>
      )}

      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p className="text-gray-600">{quiz.description}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(quiz.startDate).toLocaleString()} →{" "}
              {new Date(quiz.endDate).toLocaleString()}
            </p>
            <Link
              to={`/quiz/take/${quiz.id}`}
              className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Start Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentQuizzesList;
