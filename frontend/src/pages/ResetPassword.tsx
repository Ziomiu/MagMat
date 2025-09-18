import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/Card.tsx";
import Input from "../components/ui/Input.tsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { publicApi } from "../libs/api.ts";
import axios from "axios";

const ResetPassword = () => {
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token: string | null = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/token/verify-reset",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token }),
          },
        );

        if (response.ok) {
          setTokenValid(true);
        } else {
          navigate("/");
        }
      } catch (e) {
        console.error(e);
        setError("Error while verifying token");
      }
    };

    verifyToken();
  }, [token, navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!userPassword || !confirmPassword) {
      setError("All fields required.");
      return;
    }
    if (userPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await publicApi.post(
        "/user/reset-password",
        { token, password: userPassword },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      setResetDone(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const msg =
            err.response.data?.message ||
            `Unknown error (${err.response.status})`;
          setError(msg);
        } else {
          setError("Error while resetting password");
        }
      } else {
        console.log(err);
      }
    }
  };
  if (!tokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md">
        {resetDone ? (
          <CardContent className="flex flex-col gap-4 text-center py-2">
            <p>🎉 Password has been reset!</p>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
              onClick={() => navigate("/login")}
            >
              Return to login
            </button>
          </CardContent>
        ) : (
          tokenValid && (
            <>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Reset your password
                </CardTitle>
              </CardHeader>
              <form onSubmit={onSubmit}>
                <CardContent className="flex flex-col gap-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                      maxLength={32}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-3 inset-y-0 top-6 text-gray-500"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      label="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      maxLength={32}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-3 inset-y-0 top-6 text-gray-500"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {error && <div className="text-sm text-red-700">{error}</div>}
                </CardContent>

                <CardFooter className="flex flex-col items-center my-3 gap-2">
                  <div className="flex w-full gap-3">
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90">
                      Reset password
                    </button>
                  </div>
                </CardFooter>
              </form>
            </>
          )
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
