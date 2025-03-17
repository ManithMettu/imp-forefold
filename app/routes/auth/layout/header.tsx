import { Building } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-gray-50 py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
            <Building size={18} className="text-white" />
          </div>
          <span className="ml-2 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">
            Payments360°
          </span>
        </div>
      </div>
    </header>
  );
}
