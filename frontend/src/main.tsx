import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../globals.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Layout from "./pages/Layout.tsx";
import QuizManagementPage from "./components/quiz/teacher/QuizManagementPage.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import QuizManagementForm from "./components/quiz/teacher/QuizManagementForm.tsx";
import { AuthProvider } from "./context/AuthContextProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import StudentQuizzesList from "./components/quiz/student/StudentQuizzesList.tsx";
import QuizTakingForm from "./components/quiz/student/QuizTakingForm.tsx";
import SubmissionsPage from "./components/quiz/teacher/SubmissionsPage.tsx";
import SubmissionDetails from "./components/quiz/teacher/SubmissionDetails.tsx";
import SubmissionsList from "./components/quiz/student/SubmissionList.tsx";
import StudentFeedback from "./components/quiz/student/StudentFeedback.tsx";
import QuizSubmissionsPage from "./components/quiz/teacher/ViewQuizSubmissionsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
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
                  <QuizManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/create"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <QuizManagementForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:id/edit"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <QuizManagementForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/quiz/take"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <StudentQuizzesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/quiz/take/:id"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <QuizTakingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/quiz/:id/submissions"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <SubmissionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/submission/:submissionId"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <SubmissionDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/submissions"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <SubmissionsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/submission/:submissionId/feedback"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <StudentFeedback />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/quiz/submissions"
              element={
                <ProtectedRoute roles={["TEACHER", "STUDENT"]}>
                  <QuizSubmissionsPage />
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
