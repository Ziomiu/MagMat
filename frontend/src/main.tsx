import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../globals.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Layout from "./pages/Layout.tsx";
import QuizDashboard from "./components/quiz/QuizDashboard.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import QuizForm from "./components/quiz/QuizForm.tsx";
import { AuthProvider } from "./context/AuthContextProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <QuizDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/create"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <QuizForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:id/edit"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <QuizForm />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
