import type { Answer, Question } from "../types.ts";
import { useEffect, useState } from "react";
import AnswerList from "../answer/AnswerList.tsx";

type Props = {
  question: Question;
  updateQuestion: (q: Question) => void;
  deleteQuestion: (id: string) => void;
};

function QuestionForm({ question, updateQuestion, deleteQuestion }: Props) {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  useEffect(() => {
    updateQuestion(localQuestion);
  }, [localQuestion]);

  const addAnswer = () => {
    const newAnswer: Answer = {
      id: crypto.randomUUID(),
      text: "",
      correct: false,
    };
    setLocalQuestion((prev) => ({
      ...prev,
      answers: [...prev.answers, newAnswer],
    }));
  };

  const updateAnswer = (updated: Answer) => {
    setLocalQuestion((prev) => ({
      ...prev,
      answers: prev.answers.map((a) => (a.id === updated.id ? updated : a)),
    }));
  };

  const deleteAnswer = (id: string) => {
    setLocalQuestion((prev) => ({
      ...prev,
      answers: prev.answers.filter((a) => a.id !== id),
    }));
  };

  return (
    <div className="border p-4 rounded mb-4">
      <div className="flex justify-between items-center mb-2">
        <select
          value={localQuestion.type}
          onChange={(e) =>
            setLocalQuestion({
              ...localQuestion,
              type: e.target.value as Question["type"],
              answers: [],
            })
          }
          className="border px-2 py-1 rounded"
        >
          <option value="SINGLE">Single Choice</option>
          <option value="MULTIPLE">Multiple Choice</option>
          <option value="OPEN">Open Answer</option>
        </select>
        <button onClick={() => deleteQuestion(localQuestion.id)}>Delete</button>
      </div>

      <input
        type="text"
        placeholder="Question Text"
        value={localQuestion.text}
        onChange={(e) =>
          setLocalQuestion({ ...localQuestion, text: e.target.value })
        }
        className="border rounded px-3 py-2 w-full mb-2"
      />

      {localQuestion.type !== "OPEN" && (
        <AnswerList
          answers={localQuestion.answers}
          type={localQuestion.type}
          updateAnswer={updateAnswer}
          deleteAnswer={deleteAnswer}
          addAnswer={addAnswer}
          questionId={question.id}
        />
      )}
    </div>
  );
}

export default QuestionForm;
