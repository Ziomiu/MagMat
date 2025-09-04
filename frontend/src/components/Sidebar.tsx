import { type ReactNode } from "react";
import { Link } from "react-router-dom";
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
  return (
    <aside
      className={`bg-white border-r shadow-md transition-all duration-300 ease-in-out
    ${isOpen ? "w-64" : "w-0"}
     overflow-hidden`}
    >
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
