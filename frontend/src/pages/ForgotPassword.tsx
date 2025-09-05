import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/Card.tsx";
import Input from "../components/ui/Input.tsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!userEmail) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      if (response.ok) {
        setReady(true);
      } else {
        const msg = await response.text();
        setError(msg || `Nieznany błąd (${response.status}).`);
      }
    } catch (e) {
      console.error(e);
      setError("Błąd logowania");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md">
        {ready ? (
          <CardContent className="flex flex-col gap-4 text-center py-2">
            <p>
              🎉 Email wysłany! Sprawdź swoją skrzynkę mailową, aby zrestować
              hasło!.
            </p>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all shrink-0 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-50"
              onClick={() => navigate("/login")}
            >
              Powrót do logowania
            </button>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Forgot Password
              </CardTitle>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <p className=" px-6 pt-1">Enter account email:</p>
              <CardContent className="flex flex-col gap-2">
                <Input
                  type="email"
                  label="Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required={true}
                />
                <div className="text-sm text-red-700">{error}</div>
              </CardContent>
              <CardFooter className="flex flex-col items-center my-3 gap-2">
                <div className="flex w-full gap-3">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                  >
                    Reset Password
                  </button>
                </div>
              </CardFooter>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}

export default ForgotPassword;
