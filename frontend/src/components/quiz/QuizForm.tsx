import Input from "../ui/Input";
import { useEffect, useState } from "react";
import type { Question, Quiz } from "./types";
import { useNavigate, useParams } from "react-router-dom";
import QuestionModal from "./question/QuestionModal";
import { api } from "../../libs/api.ts";
import axios from "axios";
import { useAuth } from "../../context/UseAuth.tsx";

function QuizForm() {
  const { userId } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    questions: [],
    createdById: "",
  });

  const validateQuiz = (): boolean => {
    const errs: string[] = [];

    if (quiz.questions.length === 0)
      errs.push("Quiz must have at least one question");
    if (new Date(quiz.startDate) >= new Date(quiz.endDate))
      errs.push("Start date must be before end date");

    quiz.questions.forEach((q, idx) => {
      if (!q.text.trim()) errs.push(`Question ${idx + 1}: text is required`);
      if (q.type === "SINGLE") {
        if (q.answers.length < 4)
          errs.push(`Question ${idx + 1}: needs at least 4 answers`);
        const correctCount = q.answers.filter((a) => a.correct).length;
        if (correctCount !== 1)
          errs.push(`Question ${idx + 1}: must have exactly 1 correct answer`);
      }
      if (q.type === "MULTIPLE") {
        if (q.answers.length < 4)
          errs.push(`Question ${idx + 1}: needs at least 4 answers`);
        const correctCount = q.answers.filter((a) => a.correct).length;
        if (correctCount < 1)
          errs.push(`Question ${idx + 1}: must have at least 1 correct answer`);
      }
    });
    setError(errs);
    return errs.length === 0;
  };

  useEffect(() => {
    if (id) {
      api
        .get<Quiz>(`/quiz/${id}`)
        .then((res) => setQuiz(res.data))
        .then(() => setLoading(false))
        .catch((err) => {
          console.error(err);
          setError([err.response?.data?.message || String(err)]);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateQuiz()) return;

    const url = id ? `/quiz/${id}` : "/quiz";
    const method = id ? "put" : "post";

    try {
      if (userId) {
        quiz.createdById = userId;
      }

      await api[method](url, quiz, {
        headers: { "Content-Type": "application/json" },
      });

      navigate("/quiz");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const msg =
            err.response.data?.message ||
            `Unknown error (${err.response.status})`;
          setError([msg]);
        } else {
          setError(["Error while saving quiz"]);
        }
      } else {
        console.log(err);
      }
    }
  };

  const deleteQuestion = (qid: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== qid),
    }));
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setModalOpen(true);
  };

  const handleEditQuestion = (q: Question) => {
    setEditingQuestion(q);
    setModalOpen(true);
  };

  const handleSaveQuestion = (q: Question) => {
    setQuiz((prev) => {
      const exists = prev.questions.find((x) => x.id === q.id);
      return {
        ...prev,
        questions: exists
          ? prev.questions.map((x) => (x.id === q.id ? q : x))
          : [...prev.questions, q],
      };
    });
  };

  if (loading) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <div className="flex justify-between px-6 pt-2">
          <h1 className="text-2xl font-bold">
            {id ? "Edit Quiz" : "Create Quiz"}
          </h1>
          <button
            type="submit"
            className="bg-blue-500 px-6 py-2 ml-10 rounded text-white"
          >
            Save Quiz
          </button>
        </div>
        <div className="p-6">
          <Input
            label="Quiz Title"
            type="text"
            placeholder="Title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            required
          />
          <Input
            label="Description"
            type="text"
            placeholder="Description"
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            required
          />
          <Input
            label="Start date"
            type="datetime-local"
            value={quiz.startDate}
            onChange={(e) => setQuiz({ ...quiz, startDate: e.target.value })}
            required
          />
          <Input
            label="End date"
            type="datetime-local"
            value={quiz.endDate}
            onChange={(e) => setQuiz({ ...quiz, endDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-4  rounded px-6">
          <h2 className="text-xl font-semibold mb-2">Questions</h2>
          <ul className="space-y-2">
            {quiz.questions.map((q) => (
              <li
                key={q.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{q.text || <em>(Untitled Question)</em>}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditQuestion(q)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteQuestion(q.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {error.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            <ul className="list-disc pl-5">
              {error.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
      <div className="sticky bottom-0 bg-white  px-6 py-3 flex justify-between">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Add Question
        </button>
        <button
          className="bg-gray-700 text-white rounded px-4 py-2"
          onClick={() => navigate("/quiz")}
        >
          Back
        </button>
      </div>
      <QuestionModal
        key={editingQuestion ? editingQuestion.id : crypto.randomUUID()}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveQuestion}
        initialQuestion={editingQuestion}
      />
    </div>
  );
}

export default QuizForm;
