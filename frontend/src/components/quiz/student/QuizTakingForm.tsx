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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/student/${userId}/quiz/${id}`)
      .then((res) => setQuiz(res.data))
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id, userId]);

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
        quizId: id,
        studentId: userId,
        answers: Object.values(answers).flat(),
      };
      await api.post(`/quiz/${quiz.id}/submit`, submission);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit quiz");
    }
  };
  const isAnswered = (questionId: string) => {
    if (questionId) {
      const ans = answers[questionId];
      if (!ans || ans.length === 0) return false;

      if (ans[0].textAnswer) {
        return ans[0].textAnswer.trim().length > 0;
      }

      return ans.some((a) => a.answerId !== null);
    }
  };

  if (loading) return null;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!quiz) return <p className="text-center mt-10">Quiz not found</p>;

  return (
    <div className="min-h-full flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">{quiz.title}</h1>
        <p className="text-gray-500 mb-6 text-center">{quiz.description}</p>

        {submitted ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Quiz zakończony!
            </h2>
            <p className="text-gray-600 mb-6">
              Dziękuje za przesłanie odpowiedzi.
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate("/student/quiz/take")}
            >
              Powrót do lisy Quizów
            </button>
          </div>
        ) : (
          currentQuestion && (
            <>
              <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
                <span>
                  Pytanie {currentIndex + 1} z {quiz.questions.length}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  {currentQuestion.text}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.type === "SINGLE" &&
                    currentQuestion.answers.map((a) => (
                      <label
                        key={a.id}
                        className="flex items-center space-x-2 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition"
                      >
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          checked={
                            answers[currentQuestion.id]?.[0]?.answerId === a.id
                          }
                          onChange={() =>
                            handleSingleChoice(currentQuestion.id, a.id)
                          }
                        />
                        <span>{a.text}</span>
                      </label>
                    ))}

                  {currentQuestion.type === "MULTIPLE" &&
                    currentQuestion.answers.map((a) => (
                      <label
                        key={a.id}
                        className="flex items-center space-x-2 border rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition"
                      >
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
                        />
                        <span>{a.text}</span>
                      </label>
                    ))}

                  {currentQuestion.type === "OPEN" && (
                    <textarea
                      className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
                      rows={4}
                      value={answers[currentQuestion.id]?.[0]?.textAnswer || ""}
                      onChange={(e) =>
                        handleOpenAnswer(currentQuestion.id, e.target.value)
                      }
                      placeholder="Type your answer here..."
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg disabled:opacity-50"
                  onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                  disabled={currentIndex === 0}
                >
                  Powrót
                </button>

                {currentIndex < quiz.questions.length - 1 ? (
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    onClick={() =>
                      setCurrentIndex((i) =>
                        Math.min(i + 1, quiz.questions.length - 1),
                      )
                    }
                    disabled={!isAnswered(currentQuestion.id)}
                  >
                    Dalej
                  </button>
                ) : (
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={!isAnswered(currentQuestion.id)}
                  >
                    Wyślij
                  </button>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default QuizTakingForm;
