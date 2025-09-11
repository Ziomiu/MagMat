import type { Question } from "../quiz/types.ts";

type Props = {
  question: Question;
  updateQuestion: (q: Question) => void;
  deleteQuestion: (id: number) => void;
};

function QuestionForm({ question, updateQuestion, deleteQuestion }: Props) {
  return (
    <div>
      <div>
        <select>
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
          <option value="open">Open Answer</option>
        </select>
        <button className="bg-red-500 px-2 py-1 rounded text-white">
          Delete
        </button>
      </div>
    </div>
  );
}

export default QuestionForm;
