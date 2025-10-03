import { useState } from "react";
import type { Question, Answer } from "../types";
import AnswerList from "../answer/AnswerList";
import { v4 as uuidv4 } from "uuid";
type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (q: Question) => void;
  initialQuestion?: Question | null;
};

function QuestionModal({ open, onClose, onSave, initialQuestion }: Props) {
  const [localQuestion, setLocalQuestion] = useState<Question>(
    initialQuestion ?? {
      id: uuidv4(),
      type: "SINGLE",
      text: "",
      answers: [],
    },
  );

  if (!open) return null;

  const addAnswer = () => {
    if (localQuestion.answers.length >= 6) return;
    const newAnswer: Answer = {
      id: uuidv4(),
      text: "",
      correct: false,
    };
    setLocalQuestion((prev) => ({
      ...prev,
      answers: [...prev.answers, newAnswer],
    }));
  };

  const updateAnswer = (updated: Answer) => {
    setLocalQuestion((prev) => {
      let newAnswers = prev.answers.map((a) =>
        a.id === updated.id ? updated : a,
      );

      if (prev.type === "SINGLE" && updated.correct) {
        newAnswers = newAnswers.map((a) =>
          a.id === updated.id ? a : { ...a, correct: false },
        );
      }
      return { ...prev, answers: newAnswers };
    });
  };

  const deleteAnswer = (id: string) => {
    setLocalQuestion((prev) => ({
      ...prev,
      answers: prev.answers.filter((a) => a.id !== id),
    }));
  };

  const handleSave = () => {
    onSave(localQuestion);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-lg z-10 flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">
          {initialQuestion ? "Edit Question" : "Add Question"}
        </h2>
        <div className="flex justify-between items-center mb-3">
          <label className="font-medium">Type:</label>
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
        </div>
        <input
          type="text"
          placeholder="Question Text"
          value={localQuestion.text}
          onChange={(e) =>
            setLocalQuestion({ ...localQuestion, text: e.target.value })
          }
          className="border rounded px-3 py-2 w-full mb-4"
        />

        {localQuestion.type !== "OPEN" && (
          <div className="flex-1 overflow-y-auto">
            <AnswerList
              answers={localQuestion.answers}
              type={localQuestion.type}
              updateAnswer={updateAnswer}
              deleteAnswer={deleteAnswer}
              addAnswer={addAnswer}
              questionId={localQuestion.id}
            />
            {localQuestion.answers.length >= 6 && (
              <p className="text-sm text-gray-500 mt-2">
                Maximum 6 answers allowed
              </p>
            )}
          </div>
        )}
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionModal;
