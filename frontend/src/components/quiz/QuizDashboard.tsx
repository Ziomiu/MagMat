import QuizList from "./QuizList.tsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Quiz } from "./types.ts";
import { useAuth } from "../../context/UseAuth.tsx";
import { api } from "../../libs/api.ts";

const QuizDashboard = () => {
  const { userId } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get<Quiz[]>(`/quiz/user/${userId}`);
        setQuizzes(res.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [userId]);

  if (loading) {
    return;
  }
  return (
    <>
      <div className="flex p-3 justify-between items-center mb-4 border-b">
        <h1 className="text-2xl font-bold">Your Quizzes</h1>
        <Link
          to="/quiz/create"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Quiz
        </Link>
      </div>
      <QuizList quizzes={quizzes} setQuizzes={setQuizzes} />
    </>
  );
};

export default QuizDashboard;
