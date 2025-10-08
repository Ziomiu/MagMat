import type { Answer } from "../types.ts";
import { TiDeleteOutline } from "react-icons/ti";
import { MathField } from "../../MathField";

type Props = {
  answer: Answer;
  type: "SINGLE" | "MULTIPLE";
  updateAnswer: (a: Answer) => void;
  deleteAnswer: (id: string) => void;
  questionId: string;
};

function AnswerItem({
  answer,
  type,
  updateAnswer,
  deleteAnswer,
  questionId,
}: Props) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <button
        type="button"
        onClick={() => deleteAnswer(answer.id)}
        className="bg-red-400 px-2 py-1 rounded text-white"
      >
        <TiDeleteOutline />
      </button>

      <MathField
        value={answer.text}
        onChange={(latex) => updateAnswer({ ...answer, text: latex })}
        placeholder="Type answer..."
        className="border rounded px-2 py-1 flex-1"
      />

      <label className="flex items-center gap-1">
        Correct
        <input
          name={type === "SINGLE" ? `question-${questionId}` : undefined}
          type={type === "SINGLE" ? "radio" : "checkbox"}
          checked={answer.correct}
          onChange={(e) =>
            type === "SINGLE"
              ? updateAnswer({ ...answer, correct: true })
              : updateAnswer({ ...answer, correct: e.target.checked })
          }
          className="accent-green-500/75"
        />
      </label>
    </div>
  );
}

export default AnswerItem;
