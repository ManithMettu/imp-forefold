import { CalendarCheck, FileBarChart, IndianRupee, Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router";

export default function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <button
          onClick={() => navigate("/dashboard/staffbook")}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" />
          Organizaton Setup
        </button>
      </div>

      {/* Stats Grid */}
     

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <button
            onClick={() => navigate("/dashboard/attendance")}
            className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
              <CalendarCheck size={24} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-700 mt-4 group-hover:text-blue-600">Mark Attendance</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Update daily attendance</p>
          </button>

          <button
            onClick={() => navigate("/dashboard/payments")}
            className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
              <IndianRupee size={24} className="text-green-600" />
            </div>
            <h3 className="font-medium text-gray-700 mt-4 group-hover:text-green-600">Process Payments</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Handle employee payments</p>
          </button>

          <button
            onClick={() => navigate("/dashboard/emp-onboarding")}
            className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
              <UserPlus size={24} className="text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-700 mt-4 group-hover:text-purple-600">New Employee</h3>
            <p className="text-sm text-gray-500 text-center mt-1">Start onboarding process</p>
          </button>

          <button
            onClick={() => navigate("/dashboard/reports")}
            className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
              <FileBarChart size={24} className="text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-700 mt-4 group-hover:text-orange-600">Generate Reports</h3>
            <p className="text-sm text-gray-500 text-center mt-1">View and export reports</p>
          </button>
        </div>
      </div>
    </div>
  );
} 