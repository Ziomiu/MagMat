import QuizList from "../components/quiz/QuizList.tsx";
import { sampleQuizzes } from "../components/quiz/test-data.ts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Quiz } from "../components/quiz/types.ts";

const QuizDashboardPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/quiz")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        console.log(res);
        return res.json();
      })
      .then((data: Quiz[]) => {
        console.log(data);
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
      <QuizList quizzes={sampleQuizzes} setQuizzes={setQuizzes} />
    </>
  );
};

export default QuizDashboardPage;
