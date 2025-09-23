import React, { useEffect, useState } from "react";
import { api } from "../../../libs/api";
import { useParams, useNavigate } from "react-router-dom";
import type { StudentFeedbackSubmission } from "../types";

function StudentFeedback() {
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
          `/student/submission/${submissionId}/feedback`,
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
            className={`border p-4 rounded ${
              ans.correct === true
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"
            }`}
          >
            <div className="font-semibold mb-1">{ans.questionText}</div>

            <div className="mb-1">
              <span className="font-medium">Your answer:</span>{" "}
              {ans.studentAnswerText ?? "-"}
            </div>
            <div className="mb-1">
              <span className="font-medium">Correct answer:</span>{" "}
              {ans.correctAnswerText ?? "-"}
            </div>

            {ans.teacherComment && (
              <div className="text-sm text-gray-700 italic">
                Teacher: {ans.teacherComment}
              </div>
            )}

            <div className="mt-1 font-medium">
              Result:{" "}
              {ans.correct === true
                ? "Correct"
                : ans.correct === false
                  ? "Incorrect"
                  : "Not graded yet"}
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
