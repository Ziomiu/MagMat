import { Link } from "react-router-dom";
import Card from "../Card.tsx";
import type { Quiz } from "../types.ts";

function StudentQuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Card>
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
    </Card>
  );
}

export default StudentQuizCard;
