import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../context/UseAuth.tsx";

interface NavItem {
  name: string;
  path: string;
  icon: ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  navItems: NavItem[];
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, navItems, onClose }) => {
  const { logout } = useAuth();
  const isMobile = () => window.innerWidth < 640;
  return (
    <aside
      className={`bg-white border-r shadow-md transition-all duration-300 ease-in-out
      fixed inset-0 z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      sm:static sm:translate-x-0 sm:w-64
      flex flex-col`}
    >
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => {
                if (onClose && isMobile()) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition ${
                  isActive ? "border shadow-xl" : ""
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t p-2 bg-foreground">
        <button
          onClick={logout}
          className="w-full flex items-center text-background gap-2 p-2 rounded hover:bg-foreground/90 transition"
        >
          <CiLogout className="size-5" />
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
