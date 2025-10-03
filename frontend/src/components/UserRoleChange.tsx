import { useEffect, useState } from "react";
import { api } from "../libs/api";
import type { User } from "./quiz/types.ts";
import { useAuth } from "../context/UseAuth.tsx";

function UserRolePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const { userId } = useAuth();
  useEffect(() => {
    api
      .get<User[]>("/user")
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"));
  }, []);

  const handleRoleChange = async (id: string, newRole: User["userRole"]) => {
    try {
      const res = await api.put(`/user/${id}/role?role=${newRole}`);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, userRole: res.data.userRole } : u,
        ),
      );
    } catch (err) {
      setError("Failed to update role");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Role Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((u) => u.id !== userId)
            .map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">
                  {u.name} {u.surname}
                </td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.userRole}</td>
                <td className="p-2 border">
                  <select
                    value={u.userRole}
                    onChange={(e) =>
                      handleRoleChange(u.id, e.target.value as User["userRole"])
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="TEACHER">TEACHER</option>
                    <option value="STUDENT">STUDENT</option>
                    <option value="NOT_VERIFIED">NOT_VERIFIED</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserRolePage;
