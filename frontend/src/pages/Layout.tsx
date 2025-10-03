import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import { IoIosMenu } from "react-icons/io";
import { FaHome, FaUser } from "react-icons/fa";
import { PiExam, PiExamFill } from "react-icons/pi";
import { MdQuiz } from "react-icons/md";

import { useAuth } from "../context/UseAuth.tsx";
import logo from "../assets/logo.png";

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const { role, loading } = useAuth();
  const commonNav = [{ name: "Home", path: "/", icon: <FaHome size={20} /> }];

  const studentNav = [
    {
      name: "Rozwiąż Quiz",
      path: "/student/quiz/take",
      icon: <MdQuiz size={20} />,
    },
    {
      name: "Twoje wyniki",
      path: "/student/submissions",
      icon: <PiExamFill size={20} />,
    },
  ];

  const teacherNav = [
    { name: "Quiz Dashboard", path: "/quiz", icon: <PiExam size={20} /> },
    {
      name: "Quiz submissions",
      path: "/teacher/quiz/submissions",
      icon: <PiExam size={20} />,
    },
    { name: "User roles", path: "/roles", icon: <FaUser size={20} /> },
  ];

  const navItems =
    role === "TEACHER"
      ? [...commonNav, ...teacherNav]
      : [...commonNav, ...studentNav];

  if (loading) {
    return;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between bg-foreground text-secondary p-4 shadow">
        <button
          className="p-2 rounded hover:bg-gray-700 sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoIosMenu size={24} />
        </button>
        <h1 className="text-lg font-bold">MagMat</h1>
        <div>
          <img src={logo} height="32" width="32" />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <Sidebar
          isOpen={isOpen}
          navItems={navItems}
          onClose={() => {
            setIsOpen(false);
          }}
        />
        <main className="flex-1 bg-background overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
