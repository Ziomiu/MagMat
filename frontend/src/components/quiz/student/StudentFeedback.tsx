import { useEffect, useState } from "react";
import { api } from "../../../libs/api";
import { useParams, useNavigate } from "react-router-dom";
import type { StudentFeedbackSubmission, AnswerStatus } from "../types";
import { useAuth } from "../../../context/UseAuth.tsx";
import { MathField } from "../../MathField";

function StudentFeedback() {
  const { userId } = useAuth();
  const { submissionId } = useParams<{ submissionId: string }>();
  const [feedback, setFeedback] = useState<StudentFeedbackSubmission | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!submissionId) return;
    (async () => {
      try {
        const res = await api.get<StudentFeedbackSubmission>(
          `/student/${userId}/submission/${submissionId}/feedback`,
        );
        setFeedback(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load feedback");
      } finally {
        setLoading(false);
      }
    })();
  }, [submissionId]);

  const getResultText = (status: AnswerStatus | null) => {
    switch (status) {
      case "CORRECT":
        return "Correct";
      case "WRONG":
        return "Incorrect";
      case "PARTIAL":
        return "Partially correct";
      case "PENDING":
      case null:
      default:
        return "Not graded yet";
    }
  };

  const getBorderColor = (status: AnswerStatus | null) => {
    switch (status) {
      case "CORRECT":
        return "border-green-500 bg-green-50";
      case "WRONG":
        return "border-red-500 bg-red-50";
      case "PARTIAL":
        return "border-yellow-400 bg-yellow-50";
      case "PENDING":
      case null:
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!feedback) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Feedback for: {feedback.quizTitle}
      </h1>

      <div className="space-y-4">
        {feedback.answers.map((ans) => (
          <div
            key={ans.questionId}
            className={`border p-4 rounded ${getBorderColor(ans.answerStatus)}`}
          >
            <div className="font-semibold mb-1">
              <MathField value={ans.questionText} readOnly displayMode />
            </div>

            <div className="mb-1">
              <span className="font-medium">Twoja odpowiedź:</span> <br />
              {ans.studentAnswerText && ans.studentAnswerText.length > 0
                ? ans.studentAnswerText.map((txt, i) => (
                    <MathField key={i} value={txt} readOnly displayMode />
                  ))
                : "-"}
            </div>

            {ans.correctAnswerText && ans.correctAnswerText.length > 0 && (
              <div className="mb-1">
                <span className="font-medium">Poprawna odpowiedź:</span>
                <br />
                {ans.correctAnswerText.map((txt, i) => (
                  <MathField key={i} value={txt} readOnly displayMode />
                ))}
              </div>
            )}

            {ans.teacherComment && (
              <div className="text-sm text-gray-700 italic">
                Komentarz: {ans.teacherComment}
              </div>
            )}

            <div className="mt-1 font-medium">
              Wynik: {getResultText(ans.answerStatus)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default StudentFeedback;
