import { useEffect, useState } from "react";
import { api } from "../../../libs/api";
import { useParams } from "react-router-dom";
import type { SubmissionSummary } from "../types";
import SubmissionList from "./SubmissionList.tsx";

function SubmissionsPage() {
  const { id } = useParams<{ id: string }>();
  const [submissions, setSubmissions] = useState<SubmissionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get<SubmissionSummary[]>(
          `/teacher/quiz/${id}/submissions`,
        );
        setSubmissions(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submissions</h1>
      <SubmissionList submissions={submissions} />
    </div>
  );
}

export default SubmissionsPage;
