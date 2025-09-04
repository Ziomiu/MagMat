import React, { type ReactNode, useEffect, useState } from "react";
import { PiExam } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import Sidebar from "../components/Sidebar.tsx";
import { Outlet, useNavigate } from "react-router-dom";
interface NavItem {
  name: string;
  path: string;
  icon: ReactNode;
}
const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems: NavItem[] = [
    { name: "Home", path: "/", icon: <FaHome size={20} /> },
    { name: "Quiz", path: "/quiz", icon: <PiExam size={20} /> },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between bg-foreground text-secondary p-4 shadow">
        <button
          className="p-2 rounded hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoIosMenu size={24} />
        </button>
        <h1 className="text-lg font-bold">Tutor App</h1>
        <div>Account</div>
      </header>
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} navItems={navItems} />
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;