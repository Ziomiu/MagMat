import { type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

interface NavItem {
  name: string;
  path: string;
  icon: ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, navItems }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
    <aside
      className={`bg-white border-r shadow-md transition-all duration-300 ease-in-out
    ${isOpen ? "w-64" : "w-0"}
     overflow-hidden flex flex-col `}
    >
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
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
      <div className="border-t p-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
        >
          <CiLogout className="size-5" />
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
