import { Building, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="flex justify-between items-center px-6 md:px-10 py-4 bg-white/90 backdrop-blur-md fixed w-full top-0 z-50 shadow-sm">
      <div className="flex items-center text-2xl font-bold">
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 mr-3 flex items-center justify-center rounded-lg shadow-lg">
          <Building size={20} className="text-white" />
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
          Payments360°
        </span>
      </div>

      <nav className="hidden md:flex items-center justify-center space-x-1">
        <a
          href="#home"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeSection === "home"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Home
        </a>
        <a
          href="#products"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeSection === "products"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Solutions
        </a>
        <a
          href="#"
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all duration-300"
        >
          Pricing
        </a>
      </nav>

      <div className="hidden md:flex items-center space-x-3">
        <button className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-100 transition-all duration-300">
          Login
        </button>
        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300">
          Request Demo
        </button>
        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          Sign Up
        </button>
      </div>

      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-all duration-300"
      >
        <Menu size={24} className="text-gray-600" />
      </button>

      {/* Mobile sliding menu */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center text-xl font-bold">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 mr-2 flex items-center justify-center rounded-lg">
                <Building size={16} className="text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                Payments360°
              </span>
            </div>
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <nav className="flex flex-col space-y-1 mb-8">
            <a
              href="#home"
              onClick={toggleMenu}
              className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-100 transition-all duration-300"
            >
              Home
              <ChevronRight size={18} className="text-gray-400" />
            </a>
            <a
              href="#products"
              onClick={toggleMenu}
              className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-100 transition-all duration-300"
            >
              Solutions
              <ChevronRight size={18} className="text-gray-400" />
            </a>
            <a
              href="#"
              onClick={toggleMenu}
              className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-100 transition-all duration-300"
            >
              Pricing
              <ChevronRight size={18} className="text-gray-400" />
            </a>
          </nav>

          <div className="flex flex-col space-y-3 mt-auto">
            <button
              onClick={toggleMenu}
              className="w-full px-4 py-3 rounded-lg text-base font-medium border border-gray-200 hover:bg-gray-100 transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={toggleMenu}
              className="w-full px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Background overlay for mobile menu */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </header>
  );
}
