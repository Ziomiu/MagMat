import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    if (!userName || !userSurname || !userEmail || !userPassword) {
      setError("All fields are required.");
      return;
    }
    if (userPassword != confirmPassword) {
      setError("Passwords doesn't match");
      return;
    }
    setLoading(true);
    try {
      await publicApi.post(
        "/user/register",
        {
          name: userName,
          surname: userSurname,
          email: userEmail,
          password: userPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      setIsRegistered(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const msg = err.response.data || `Error ${err.response.status}`;
          setError(msg);
        } else {
          setError("Error while creating account");
        }
      } else {
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {isRegistered ? "Weryfikacja Email" : "Rejestracja"}
          </CardTitle>
        </CardHeader>

        {isRegistered ? (
          <CardContent className="flex flex-col gap-4 text-center">
            <p>
              Rejestracja zakończona! Sprawdź swój email aby zweryfikować konto.
            </p>
            <button
              className="mb-3 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all shrink-0 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-50"
              onClick={() => navigate("/login")}
            >
              Powrót do logowania
            </button>
          </CardContent>
        ) : (
          <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col gap-4">
              <Input
                type="text"
                label="Imie"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <Input
                type="text"
                label="Nazwisko"
                value={userSurname}
                onChange={(e) => setUserSurname(e.target.value)}
                required
              />
              <Input
                type="email"
                label="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  label="Hasło"
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
                  label="Potwierdź Hasło"
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

            <CardFooter className="flex my-3 justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all shrink-0 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Rejestracja..." : "Zarejestruj się"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all shrink-0 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-50"
              >
                Powrót do logowania
              </button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}

export default RegisterPage;
