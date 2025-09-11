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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/quiz" element={<QuizDashboard />} />
          <Route path="/quiz/create" element={<QuizForm />} />
          <Route path="/quiz/:id/edit" element={<QuizForm />} />
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
