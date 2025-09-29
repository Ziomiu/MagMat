import { useAuth } from "../context/UseAuth.tsx";
import { api } from "../libs/api.ts";
import { useEffect, useState } from "react";

type UserProfile = {
  name?: string;
  surname?: string;
};

function MainPage() {
  const { isAuthenticated, userId } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(!!isAuthenticated);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    let mounted = true;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get<UserProfile>(`/user/me/${userId}`);
        if (!mounted) return;
        setProfile(res.data);
      } catch (err) {
        console.warn("Nie udało się pobrać profilu użytkownika:", err);
        setError(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  const firstLine = (() => {
    if (loading) return "Wczytywanie…";
    if (profile?.name || profile?.surname) {
      return `Witaj, ${profile?.name ?? ""} ${profile?.surname ?? ""}`.trim();
    }
    if (isAuthenticated) return "Witaj!";
    return "Witaj w aplikacji";
  })();

  return (
    <main className=" flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl p-8 md:p-12 shadow-xl">
        <div className="flex md:flex-row items-start md:items-center gap-6">
          <div className=" items-center justify-between flex">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="ml-2">
              <h1 className="text-2xl md:text-3xl font-extrabold mb-1">
                {firstLine}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
