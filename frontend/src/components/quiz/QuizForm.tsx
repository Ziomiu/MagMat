import Input from "../ui/Input.tsx";
import { useEffect, useState } from "react";
import type { Quiz } from "./types.ts";
import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "../question/QuestionForm.tsx";

function QuizForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    questions: [],
    createdById: "",
  });
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
        navigate("/quiz");
      } else {
        const msg = await response.text();
        setError(msg || `Unknown error (${response.status}).`);
      }
    } catch (e) {
      console.error(e);
      setError("Error while saving quiz");
    }
  };

  return (
    <div>
      <h1></h1>
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

        <div className="text-sm text-red-700">{error}</div>
        <button
          type="submit"
          className="bg-blue-500 px-6 py-2 rounded text-white"
        >
          Save Quiz
        </button>
      </form>
      <QuestionForm />
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
