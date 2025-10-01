import { useEffect, useState } from "react";
import { api } from "../../../libs/api.ts";
import { useAuth } from "../../../context/UseAuth.tsx";
import type { AssignedQuiz } from "../types.ts";
import EntityList from "../EntityList.tsx";
import StudentQuizCard from "./StudentQuizCard.tsx";

function StudentQuizzesList() {
  const { userId } = useAuth();
  const [quizzes, setQuizzes] = useState<AssignedQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get<AssignedQuiz[]>(`quiz/student/${userId}`);
        setQuizzes(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [userId]);

  if (loading) return null;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Przypisane Quizy</h1>
      <EntityList
        items={quizzes}
        emptyMessage="Brak przypisanych quizów"
        renderItem={(quiz) => <StudentQuizCard key={quiz.id} quiz={quiz} />}
      />
    </div>
  );
}

export default StudentQuizzesList;
