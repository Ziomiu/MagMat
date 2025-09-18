import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/Card.tsx";
import Input from "../components/ui/Input.tsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../libs/api.ts";
import axios from "axios";

function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setError("");
    if (!userEmail) {
      setError("All fields are required.");
      return;
    }

    try {
      await publicApi.post(
        "/user/forgot-password",
        { email: userEmail },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      setReady(true);
    } catch (err: unknown) {
      setDisabled(false);
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

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md">
        {ready ? (
          <CardContent className="flex flex-col gap-4 text-center py-2">
            <p>🎉 Email has been sent! Check your email to reset password!</p>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all shrink-0 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-50"
              onClick={() => navigate("/login")}
            >
              Return to sign in
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
              <CardContent className="flex flex-col gap-2">
                <Input
                  type="email"
                  label="Enter account email:"
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-50"
                    disabled={disabled}
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
