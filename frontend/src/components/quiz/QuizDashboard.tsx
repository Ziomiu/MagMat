import QuizList from "./QuizList.tsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Quiz } from "./types.ts";

const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/quiz")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        return res.json();
      })
      .then((data: Quiz[]) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      });
  }, []);

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
