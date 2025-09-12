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
      <button type="button" onClick={addAnswer}>
        Add Answer
      </button>
    </div>
  );
}
export default AnswerList;
