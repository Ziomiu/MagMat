import AnswerItem from "./AnswerItem";

import type { Answer } from "../types.ts";

type Props = {
  answers: Answer[];
  type: "SINGLE" | "MULTIPLE";
  updateAnswer: (a: Answer) => void;
  deleteAnswer: (id: string) => void;
  addAnswer: () => void;
  questionId: string;
};

function AnswerList({
  answers,
  type,
  updateAnswer,
  deleteAnswer,
  addAnswer,
  questionId,
}: Props) {
  return (
    <div className="ml-4 ">
      {answers.map((a) => (
        <AnswerItem
          key={a.id}
          answer={a}
          type={type}
          updateAnswer={updateAnswer}
          deleteAnswer={deleteAnswer}
          questionId={questionId}
        />
      ))}
      <button
        type="button"
        onClick={addAnswer}
        className="bg-green-500 px-2 py-1 rounded-xl hover:bg-green-500/90 flex"
      >
        Add Answer
      </button>
    </div>
  );
}
export default AnswerList;
