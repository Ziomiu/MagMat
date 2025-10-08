import { useEffect, useState } from "react";
import { api } from "../../../libs/api";
import { useParams, useNavigate } from "react-router-dom";
import type {
  SubmissionDetailDto,
  StudentAnswerDto,
  AnswerStatus,
} from "../types";
import { MathField } from "../../MathField";

function SubmissionDetail() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const [submission, setSubmission] = useState<SubmissionDetailDto | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localAnswers, setLocalAnswers] = useState<StudentAnswerDto[]>([]);
  const navigate = useNavigate();

  const statusOrder: AnswerStatus[] = [
    "PENDING",
    "CORRECT",
    "PARTIAL",
    "WRONG",
  ];

  useEffect(() => {
    if (!submissionId) return;
    (async () => {
      try {
        const res = await api.get<SubmissionDetailDto>(
          `/teacher/submission/${submissionId}`,
        );
        setSubmission(res.data);
        setLocalAnswers(res.data.answers.map((a) => ({ ...a })));
      } catch (err: any) {
        console.error(err);
        setError("Failed to load submission");
      } finally {
        setLoading(false);
      }
    })();
  }, [submissionId]);

  const cycleStatus = (current: AnswerStatus | null): AnswerStatus => {
    const index = current ? statusOrder.indexOf(current) : 0;
    return statusOrder[(index + 1) % statusOrder.length];
  };

  const toggleCorrect = (answerId: string) => {
    setLocalAnswers((prev) =>
      prev.map((a) =>
        a.id === answerId
          ? { ...a, answerStatus: cycleStatus(a.answerStatus) }
          : a,
      ),
    );
  };

  const setComment = (answerId: string, comment: string) => {
    setLocalAnswers((prev) =>
      prev.map((a) => (a.id === answerId ? { ...a, comment } : a)),
    );
  };

  const handleSave = async () => {
    if (!submission) return;
    const grades = localAnswers.map((a) => ({
      studentAnswerId: a.id,
      answerStatus: a.answerStatus,
      comment: a.comment ?? "",
    }));
    try {
      await api.post(`/teacher/submission/grade`, { grades });
      navigate(-1);
    } catch (err: any) {
      console.error(err);
      setError("Failed to save grading");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!submission) return null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-3">
        Submission — {submission.name + " " + submission.surname}
      </h1>

      <div className="space-y-4">
        {localAnswers.map((ans) => (
          <div key={ans.id} className="border p-4 rounded">
            <div className="font-semibold mb-1">
              <MathField value={ans.questionText} readOnly displayMode />
            </div>

            {ans.selectedAnswerText && (
              <div className="mb-2">
                <div className="text-sm text-gray-600">Selected:</div>
                {Array.isArray(ans.selectedAnswerText) ? (
                  ans.selectedAnswerText.map((txt, i) => (
                    <MathField
                      key={i}
                      value={txt}
                      readOnly
                      displayMode
                      className="ml-2"
                    />
                  ))
                ) : (
                  <MathField
                    value={ans.selectedAnswerText}
                    readOnly
                    displayMode
                    className="ml-2"
                  />
                )}
              </div>
            )}

            {ans.textAnswer && (
              <div className="mb-2">
                <div className="text-sm text-gray-600">Open answer:</div>
                <div className="italic">
                  <MathField value={ans.textAnswer} readOnly displayMode />
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mt-2">
              <button
                className={`px-3 py-1 rounded ${
                  ans.answerStatus === "CORRECT"
                    ? "bg-green-500 text-white"
                    : ans.answerStatus === "WRONG"
                      ? "bg-red-500 text-white"
                      : ans.answerStatus === "PARTIAL"
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-200"
                }`}
                onClick={() => toggleCorrect(ans.id)}
              >
                {ans.answerStatus ?? "PENDING"}
              </button>

              <input
                type="text"
                placeholder="Leave comment..."
                value={ans.comment ?? ""}
                onChange={(e) => setComment(ans.id, e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Grades
        </button>
      </div>
    </div>
  );
}

export default SubmissionDetail;
