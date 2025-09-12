import Input from "../ui/Input.tsx";
import { useEffect, useState } from "react";
import type { Question, Quiz } from "./types.ts";
import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "./question/QuestionForm.tsx";

function QuizForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);
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
      if (q.type === "single") {
        if (q.answers.length < 4)
          errs.push(`Question ${idx + 1}: needs at least 4 answers`);
        const correctCount = q.answers.filter((a) => a.correct).length;
        if (correctCount !== 1)
          errs.push(`Question ${idx + 1}: must have exactly 1 correct answer`);
      }
      if (q.type === "multiple") {
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
    console.log(id);
    if (id) {
      fetch(`http://localhost:8080/quiz/${id}`)
        .then((res) => res.json())
        .then((data: Quiz) => setQuiz(data))
        .catch((error) => setError(error));
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(validateQuiz());
    if (!validateQuiz()) return;
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:8080/quiz/${id}`
      : "http://localhost:8080/quiz";
    const userId = localStorage.getItem("userId");
    try {
      if (userId) {
        quiz.createdById = userId;
      }
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      });
      if (response.ok) {
        // navigate("/quiz");
        console.log(validateQuiz());
      } else {
        const msg = await response.text();
        setError([msg || `Unknown error (${response.status}).`]);
      }
    } catch (e) {
      console.error(e);
      setError(["Error while saving quiz"]);
    }
  };
  const addQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type: "single",
      text: "",
      answers: [],
    };
    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (updated: Question) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === updated.id ? updated : q)),
    }));
  };

  const deleteQuestion = (qid: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== qid),
    }));
  };

  return (
    <div>
      <h1 className="pl-6 pt-3">Create Quiz</h1>
      <form onSubmit={handleSave}>
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
            placeholder="Start date"
            value={quiz.startDate}
            onChange={(e) => setQuiz({ ...quiz, startDate: e.target.value })}
            required
          />
          <Input
            label="End date"
            type="datetime-local"
            placeholder="End date"
            value={quiz.endDate}
            onChange={(e) => setQuiz({ ...quiz, endDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Questions</h2>
          {quiz.questions.map((q) => (
            <QuestionForm
              key={q.id}
              question={q}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
            />
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="mt-2 bg-green-500 px-4 py-2 rounded text-white"
          >
            Add Question
          </button>
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
        <button
          type="submit"
          className="bg-blue-500 px-6 py-2 rounded text-white"
        >
          Save Quiz
        </button>
      </form>
      <div className="flex items-center justify-between w-full">
        <button
          className="text-sm bg-foreground text-background rounded-xl py-2 px-4 gap-2 mt-2"
          onClick={() => navigate("/quiz")}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default QuizForm;
