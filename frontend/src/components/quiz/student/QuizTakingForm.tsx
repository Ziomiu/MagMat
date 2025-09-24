import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../libs/api.ts";
import type { Quiz } from "../types.ts";
import { useAuth } from "../../../context/UseAuth.tsx";

type SubmissionAnswer = {
  questionId: string;
  answerId?: string | null;
  textAnswer?: string | null;
};

function QuizTakingForm() {
  const { userId } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, SubmissionAnswer[]>>(
    {},
  );

  useEffect(() => {
    if (!id) return;
    api
      .get(`/quiz/${id}`)
      .then((res) => setQuiz(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const currentQuestion = quiz?.questions[currentIndex];

  const handleSingleChoice = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: [{ questionId, answerId, textAnswer: null }],
    }));
  };

  const handleMultipleChoice = (questionId: string, answerId: string) => {
    setAnswers((prev) => {
      const existing = prev[questionId] || [];
      const isSelected = existing.some((a) => a.answerId === answerId);
      return {
        ...prev,
        [questionId]: isSelected
          ? existing.filter((a) => a.answerId !== answerId)
          : [...existing, { questionId, answerId, textAnswer: null }],
      };
    });
  };

  const handleOpenAnswer = (questionId: string, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: [{ questionId, answerId: null, textAnswer: text }],
    }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    try {
      const submission = {
        studentId: userId,
        answers: Object.values(answers).flat(),
      };
      await api.post(`/quiz/${quiz.id}/submit`, submission);
      alert("Quiz submitted successfully!");
      navigate("/student/quiz/take");
    } catch (err) {
      console.error(err);
      setError("Failed to submit quiz");
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-gray-500 mb-6">{quiz.description}</p>

      {currentQuestion && (
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Q{currentIndex + 1}. {currentQuestion.text}
          </h2>

          {currentQuestion.type === "SINGLE" &&
            currentQuestion.answers.map((a) => (
              <label key={a.id} className="block mb-2">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  checked={answers[currentQuestion.id]?.[0]?.answerId === a.id}
                  onChange={() => handleSingleChoice(currentQuestion.id, a.id)}
                />{" "}
                {a.text}
              </label>
            ))}

          {currentQuestion.type === "MULTIPLE" &&
            currentQuestion.answers.map((a) => (
              <label key={a.id} className="block mb-2">
                <input
                  type="checkbox"
                  checked={
                    answers[currentQuestion.id]?.some(
                      (ans) => ans.answerId === a.id,
                    ) ?? false
                  }
                  onChange={() =>
                    handleMultipleChoice(currentQuestion.id, a.id)
                  }
                />{" "}
                {a.text}
              </label>
            ))}

          {currentQuestion.type === "OPEN" && (
            <textarea
              className="w-full border rounded p-2"
              value={answers[currentQuestion.id]?.[0]?.textAnswer || ""}
              onChange={(e) =>
                handleOpenAnswer(currentQuestion.id, e.target.value)
              }
              placeholder="Type your answer here..."
            />
          )}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        {currentIndex < quiz.questions.length - 1 ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() =>
              setCurrentIndex((i) => Math.min(i + 1, quiz.questions.length - 1))
            }
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizTakingForm;
