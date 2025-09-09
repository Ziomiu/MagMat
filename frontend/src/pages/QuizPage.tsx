import QuizList from "../components/quiz/QuizList.tsx";
import { sampleQuizzes } from "../components/quiz/test-data.ts";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Quiz } from "../components/quiz/types.ts";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
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

export default QuizPage;
