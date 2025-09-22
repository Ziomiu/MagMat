import EntityList from "../EntityList.tsx";
import SubmissionCard from "./SubmissionCard.tsx";
import type { SubmissionSummary } from "../types";

function SubmissionList({ submissions }: { submissions: SubmissionSummary[] }) {
  return (
    <EntityList
      items={submissions}
      emptyMessage="No submissions yet."
      renderItem={(s) => <SubmissionCard key={s.submissionId} submission={s} />}
    />
  );
}

export default SubmissionList;
