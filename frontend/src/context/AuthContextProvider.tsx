import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../libs/jwt";
import { AuthContext } from "./AuthContext";
import { setAccessToken } from "../libs/api";
import { publicApi } from "../libs/api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await publicApi.post("/token/refresh", {});
        const data: { token: string } = res.data;
        refresh(data.token);
      } catch (e) {
        console.log("Erorr while refreshing, staying logged out", e);
      } finally {
        setLoading(false);
      }
    };

    tryRefresh();
  }, []);

  const refresh = (accessToken: string) => {
    const decoded = decodeJwt(accessToken);
    if (!decoded) return;
    setAccessToken(accessToken);
    setUserId(decoded.sub);
    setRole(decoded.role);
    setIsAuthenticated(true);
  };
  const login = (accessToken: string) => {
    refresh(accessToken);
    navigate("/");
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8080/user/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout error", e);
    }

    setAccessToken(null);
    setUserId(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        role,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
