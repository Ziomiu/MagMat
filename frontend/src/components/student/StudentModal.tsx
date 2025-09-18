import { api } from "../../libs/api.ts";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

interface Student {
  name: string;
  surname: string;
}

function StudentModal({ open, onClose }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await api.get<Student[]>("/user/students");
        setStudents(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [open]);

  if (!open) return null;

  const filtered = students.filter((s) =>
    `${s.name} ${s.surname}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-lg p-6 w-96 z-10">
        <h2 className="text-xl font-semibold mb-4">Students</h2>

        <input
          type="text"
          placeholder="Search by name or surname..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <ul className="max-h-60 overflow-y-auto space-y-2">
            {filtered.length > 0 ? (
              filtered.map((student, i) => (
                <li
                  key={i}
                  className="border rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  {student.name} {student.surname}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No students found.</p>
            )}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-foreground text-background py-2 rounded-lg hover:bg-foreground/90"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default StudentModal;
