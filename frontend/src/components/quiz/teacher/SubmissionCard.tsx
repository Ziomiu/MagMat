import Card from "../Card.tsx";
import { useNavigate } from "react-router-dom";
import type { SubmissionSummary } from "../types";

function SubmissionCard({ submission }: { submission: SubmissionSummary }) {
  const navigate = useNavigate();

  return (
    <Card className="flex justify-between items-center">
      <div>
        <div className="font-semibold">
          {submission.name + " " + submission.surname}
        </div>
        <div className="text-sm text-gray-500">
          Completed: {submission.completed ? "Yes" : "No"}
        </div>
      </div>
      <button
        onClick={() =>
          navigate(`/teacher/submission/${submission.submissionId}`)
        }
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        View & Grade
      </button>
    </Card>
  );
}

export default SubmissionCard;
