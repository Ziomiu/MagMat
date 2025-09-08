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

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    if (!userName || !userSurname || !userEmail || !userPassword) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          surname: userSurname,
          email: userEmail,
          password: userPassword,
        }),
      });
      if (response.ok) {
        setIsRegistered(true);
      } else {
        const msg = await response.text();
        setError(msg || `Unknown error (${response.status}).`);
      }
    } catch (e) {
      console.error(e);
      setError("Error while creating account.");
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
              🎉 Signing up complete! Check your email to verify the account.
            </p>
            <button
              className="mb-3 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all shrink-0 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-50"
              onClick={() => navigate("/login")}
            >
              Return to sign in
            </button>
          </CardContent>
        ) : (
          <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col gap-4">
              <Input
                type="text"
                label="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <Input
                type="text"
                label="Surname"
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
              {error && <div className="text-sm text-red-700">{error}</div>}
            </CardContent>

            <CardFooter className="flex my-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all shrink-0 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}

export default RegisterPage;
