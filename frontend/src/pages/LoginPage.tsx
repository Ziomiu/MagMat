import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/Card.tsx";
import Input from "../components/ui/Input.tsx";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth.tsx";
import { publicApi } from "../libs/api.ts";
function LoginPage() {
  const { login } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!userEmail || !userPassword) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await publicApi.post(
        "/user/login",
        { email: userEmail, password: userPassword },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      const data: { token: string } = response.data;

      login(data.token);
    } catch (err: any) {
      console.error(err);

      if (err.response) {
        const msg = err.response.data || `Error ${err.response.status}`;
        setError(msg);
      } else {
        setError("Error while logging in");
      }
    }
  };
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Log in</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required={true}
            />
            <div className=" relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
                maxLength={32}
              />
              <div>
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 inset-y-0 top-6 text-gray-500"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="text-sm text-red-700">{error}</div>
          </CardContent>
          <CardFooter className="flex flex-col items-center my-3 gap-2">
            <div className="flex w-full gap-3">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
              >
                Sign up
              </button>
            </div>
            <p className="text-sm text-gray-600 ">
              Forgot{" "}
              <button
                type="button"
                className="text-primary hover:underline hover:cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                password?
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
