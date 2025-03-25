import { motion } from "framer-motion";
import {
  Axe,
  BookUser,
  CalendarCheck,
  CircleChevronRight,
  ClipboardMinus,
  HandCoins,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Menu,
  PersonStanding,
  Users
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import logo from './logo.png';

interface SidebarProps {
  onMiniChange: (isMini: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMiniChange }) => {
  const [isMini, setIsMini] = useState<boolean>(false);
  const location = useLocation();

  const menuItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard", exact: true },
    { to: "/dashboard/staffbook", icon: <Users size={18} />, label: "Staff Book" },
    { to: "/dashboard/attendance", icon: <CalendarCheck size={18} />, label: "Attendance" },
    { to: "/dashboard/payments", icon: <IndianRupee size={18} />, label: "Employee Payments" },
    { to: "/dashboard/inventory", icon: <Axe size={18} />, label: "Inventory Book" },
    { to: "/dashboard/expense", icon: <HandCoins size={18} />, label: "General Expense Book" },
    { to: "/dashboard/contractors", icon: <PersonStanding size={18} />, label: "Contractors Book" },
    { to: "/dashboard/customer", icon: <BookUser size={18} />, label: "Customer Book" },
    { to: "/dashboard/reports", icon: <ClipboardMinus size={18} />, label: "Reports" },
  ];

  const handleMiniToggle = () => {
    const newMiniState = !isMini;
    setIsMini(newMiniState);
    onMiniChange(newMiniState);
  };

  const isPathActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path + '/') || location.pathname === path;
  };

  return (
    <>
      {/* Header */}
      <header className="w-full bg-blue-900 shadow-md p-2 flex items-center justify-between fixed top-0 left-0 right-0 z-50 h-[50px]">
        <div className="flex items-center gap-4">
          <button onClick={handleMiniToggle} className="text-white hover:text-blue-100">
            {isMini ? <CircleChevronRight size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md shadow-sm">
            <img
              src={logo}
              alt="Logo"
              className="rounded-md min-w-[20px]"
              style={{ width: 25 }}
            />
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#282878]">
                Payments<span className="text-[#282878]">360</span>
              </span>
              <span className="text-[10px] font-semibold text-red-500 self-end">
                By ForeFold AI
              </span>
            </div>
          </div>
        </div>

        {/* Centered KGRCET */}
        <span className="text-lg font-bold text-blue-100 absolute left-1/2 -translate-x-1/2">
          KGRCET
        </span>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Welcome, Suneel</span>
        </div>
      </header>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: isMini ? 60 : 200,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        className="min-h-screen h-full bg-blue-900 text-white p-3 flex flex-col shadow-lg fixed top-[50px] z-40"
      >
        {/* Sidebar Menu */}
        <nav className="flex flex-col space-y-1 flex-grow">
          {menuItems.map(({ to, icon, label, exact }) => {
            const isActive = isPathActive(to, exact);
            return (
              <Link
                key={label}
                to={to}
                className={`flex items-center p-2 rounded-lg text-xs transition-all duration-300 
                  ${isActive ? "bg-blue-400" : "hover:bg-blue-600"} 
                  ${isMini ? "justify-center" : "space-x-2"}`}
              >
                {icon}
                {!isMini && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <Link
          to="/login"
          className={`mb-15 flex items-center p-2 rounded-lg cursor-pointer text-xs transition-all duration-300 hover:bg-red-600 ${isMini ? "justify-center" : "space-x-2"}`}
        >
          <LogOut size={18} />
          {!isMini && <span>Logout</span>}
        </Link>
      </motion.div>

      {/* Footer */}
      <footer className="w-full bg-white shadow-md p-2 text-center text-xs text-gray-500 fixed bottom-0 left-0 right-0">
        Copyrights reserved. Payments360 and ForeFold AI are registered trademarks of ForeFold Consulting Services LLP.
      </footer>
    </>
  );
};

export default Sidebar;
