import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJwt, isTokenExpired } from "../libs/jwt";
import { AuthContext } from "./AuthContext";
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId"),
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  // useEffect(() => {
  //   if (token && isTokenExpired(token)) {
  //     logout();
  //   }
  // }, [token]);

  const login = (jwt: string) => {
    const decoded = decodeJwt(jwt);
    if (!decoded) return;

    const userId = decoded.sub;
    const role = decoded.role;

    localStorage.setItem("token", jwt);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);

    setToken(jwt);
    setUserId(userId);
    setRole(role);

    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setToken(null);
    setUserId(null);
    setRole(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        role,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
