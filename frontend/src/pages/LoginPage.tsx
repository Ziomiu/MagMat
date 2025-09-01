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

function LoginPage() {
  const [userEmail, setUserEmail] = useState("adas@dasd");
  const [userPassword, setUserPassword] = useState("adas@dasd");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userEmail, userPassword);

    setError("");
    if (!userEmail || !userPassword) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, userPassword }),
      });
      if (response.ok) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      setError("Błąd logowania");
    }
  };
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
                  className="absolute right-3 inset-y-0 top-6 text-gray-500"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex my-6">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2  rounded-md text-sm font-medium transition-all shrink-0 h-9 px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
            >
              Log in
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
