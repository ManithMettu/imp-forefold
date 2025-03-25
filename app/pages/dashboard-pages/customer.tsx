import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const Customer = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Customer Details</h1>

        <div className="flex items-center space-x-4">
          {/* Add site Button */}
          <button
            onClick={() => navigate("/add-customer")}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-cyan-400 transition"
          >
            <Plus size={18} className="mr-2" />
            Add Customer
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default Customer;
