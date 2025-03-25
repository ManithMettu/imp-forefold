// index.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "~/components/main/sidebar/sidebar";

export default function Dashboard() {
  const [isMini, setIsMini] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar onMiniChange={setIsMini} />

      {/* Main content area */}
      <motion.main 
        animate={{ 
          marginLeft: isMini ? "50px" : "190px", 
          transition: { duration: 0.3, ease: "easeInOut" }
        }} 
        className="flex-1 min-h-screen relative w-full"
      >
        <div className="p-6 pl-2 mt-[40px] w-full">
          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
