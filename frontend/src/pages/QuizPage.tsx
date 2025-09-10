import Input from "../components/ui/Input.tsx";
import { useState } from "react";
import type { Quiz } from "../components/quiz/types.ts";
import { useNavigate, useParams } from "react-router-dom";

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    questions: [],
  });

  const handleSave = async () => {
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/quizzes/${id}` : "/api/quizzes";
    console.log(quiz);
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      });
      if (response.ok) {
        navigate("/");
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
      <div className="p-6">
        <Input
          label="Quiz Title"
          type="text"
          placeholder="Title"
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />

        <Input
          label="Description"
          type="text"
          placeholder="Description"
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        />

        <Input
          label="Start date"
          type="text"
          placeholder="Start date"
          onChange={(e) => setQuiz({ ...quiz, startDate: e.target.value })}
        />
        <Input
          label="End date"
          type="text"
          placeholder="End date"
          onChange={(e) => setQuiz({ ...quiz, endDate: e.target.value })}
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 px-6 py-2 rounded text-white"
      >
        Save Quiz
      </button>
    </div>
  );
}

export default QuizPage;
