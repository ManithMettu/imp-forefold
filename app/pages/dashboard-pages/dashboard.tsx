import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "~/components/main/sidebar/sidebar";

export default function DashboardLayout() {
  const [isMini, setIsMini] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Include Sidebar */}
      <Sidebar onMiniChange={setIsMini} />

      {/* Main Content Area */}
      <main 
        className={`flex-1 min-h-screen transition-all duration-300 ease-in-out ${
          isMini ? "ml-[60px]" : "ml-[200px]"
        }`}
      >
        {/* Render child routes */}
        <div className="p-4 pt-[70px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
