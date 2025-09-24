import { api } from "../../../libs/api.ts";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
type Props = {
  open: boolean;
  onClose: () => void;
  quizId: string;
};

interface Student {
  studentId: string;
  name: string;
  surname: string;
}

function StudentModal({ open, onClose, quizId }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await api.get<Student[]>("/student");
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
  const toggleSelect = (id: string) => {
    console.log(id);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleConfirm = async () => {
    try {
      await api.post(`/quiz/${quizId}/assign`, { studentIds: selected });
      onClose();
    } catch (err: any) {
      console.error("Assignment failed:", err);
      setError("Failed to assign students");
    }
  };
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
              filtered.map((student) => {
                const isSelected = selected.includes(student.studentId);
                return (
                  <li
                    key={student.studentId}
                    onClick={() => toggleSelect(student.studentId)}
                    className={`flex items-center justify-between border rounded-lg px-3 py-2 cursor-pointer transition ${
                      isSelected
                        ? "bg-blue-50 border-blue-400"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span>
                      {student.name} {student.surname}
                    </span>
                    {isSelected && (
                      <Check className="text-blue-600" size={18} />
                    )}
                  </li>
                );
              })
            ) : (
              <p className="text-gray-500">No students found.</p>
            )}
          </ul>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selected.length === 0}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Confirm Assign
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentModal;
