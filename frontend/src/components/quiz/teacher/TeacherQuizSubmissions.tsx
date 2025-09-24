import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../../libs/api";
import type { QuizSubmissionSummary } from "../types";

function TeacherQuizSubmissions() {
  const { quizId } = useParams<{ quizId: string }>();
  const [submissions, setSubmissions] = useState<QuizSubmissionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;

    (async () => {
      try {
        const res = await api.get<QuizSubmissionSummary[]>(
          `/teacher/quiz/${quizId}/submission`,
        );
        setSubmissions(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    })();
  }, [quizId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submissions for Quiz</h1>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No students have submitted yet.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Submitted At</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.submissionId} className="text-center">
                <td className="p-2 border">
                  {s.studentName} {s.studentSurname}
                </td>
                <td className="p-2 border">
                  {s.completed ? (
                    <span className="text-green-600">✅ Graded</span>
                  ) : (
                    <span className="text-yellow-600">⏳ Pending</span>
                  )}
                </td>
                <td className="p-2 border">
                  <Link
                    to={`/teacher/submission/${s.submissionId}/grade`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Grade
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TeacherQuizSubmissions;
