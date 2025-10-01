import { useEffect, useState } from "react";
import { api } from "../../../libs/api.ts";
import { Link } from "react-router-dom";
import type { StudentSubmissionListItem } from "../types";
import { useAuth } from "../../../context/UseAuth.tsx";

function SubmissionsList() {
  const { userId } = useAuth();
  const [submissions, setSubmissions] = useState<StudentSubmissionListItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<StudentSubmissionListItem[]>(
          `/student/${userId}/submissions`,
        );
        setSubmissions(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Wyniki</h1>

      {submissions.length === 0 ? (
        <p className="text-gray-500">Brak dostępnych wyników</p>
      ) : (
        <ul className="space-y-3">
          {submissions.map((s) => (
            <li
              key={s.submissionId}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{s.quizTitle}</div>

                <div className="text-sm">
                  Stan:{" "}
                  {s.graded ? (
                    <span className="text-green-600">Oceniony</span>
                  ) : (
                    <span className="text-yellow-600">W trakcie oceniania</span>
                  )}
                </div>
              </div>
              <Link
                to={`/student/submission/${s.submissionId}/feedback`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Zobacz wyniki
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SubmissionsList;
