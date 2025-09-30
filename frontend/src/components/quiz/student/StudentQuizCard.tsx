import { Link } from "react-router-dom";
import Card from "../Card.tsx";
import type { AssignedQuiz } from "../types.ts";

function StudentQuizCard({ quiz }: { quiz: AssignedQuiz }) {
  return (
    <Card className="mb-4">
      <h2 className="text-xl font-semibold">{quiz.title}</h2>
      <p className="text-gray-600">{quiz.description}</p>
      <p className="text-sm text-gray-400 mt-2">
        {new Date(quiz.startDate).toLocaleString()} →{" "}
        {new Date(quiz.endDate).toLocaleString()}
      </p>

      {quiz.completed ? (
        <p className="mt-3 text-green-600 font-medium">
          You have already taken this quiz
        </p>
      ) : (
        <Link
          to={`/student/quiz/take/${quiz.id}`}
          className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Start Quiz
        </Link>
      )}
    </Card>
  );
}

export default StudentQuizCard;
