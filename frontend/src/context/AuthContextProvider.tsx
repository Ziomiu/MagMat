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
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await publicApi.post(
          "/user/refresh",
          {},
          { withCredentials: true },
        );

        const data: { token: string } = res.data;
        login(data.token);
      } catch (err) {
        console.log("No valid refresh token, staying logged out");
      }
    };

    tryRefresh();
  }, []);

  const login = (accessToken: string) => {
    const decoded = decodeJwt(accessToken);
    if (!decoded) return;

    setAccessToken(accessToken);
    setUserId(decoded.sub);
    setRole(decoded.role);
    setIsAuthenticated(true);

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

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
