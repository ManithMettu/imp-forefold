import { ChevronLeft, ChevronRight, Download, DownloadCloud, Plus, Search, SquarePen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";


interface Employee {
  "Emp ID": string;
  "Employee Name": string;
  "Designation": string;
  "Site": string;
  "Shift": string;
  "Phone": string;
}

const StaffBook = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json<Employee>(sheet);
          setEmployees(parsedData);
        } catch (error) {
          console.error("Error parsing file:", error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        "Emp ID": "",
        "Employee Name": "",
        "Designation": "",
        "Site": "",
        "Shift": "",
        "Phone": "",
      },
    ];
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Employee_Template.xlsx");
  };

  const totalPages = Math.ceil(employees.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentEmployees = employees.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Employee Directory</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/dashboard/add-employee")}
            className="flex items-center bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            <Plus size={16} className="mr-1" /> Add
          </button>
          <label className="flex items-center bg-green-700 text-white text-sm px-4 py-1.5 rounded-lg shadow-md hover:bg-green-600 transition duration-300 cursor-pointer">
            <Download size={16} className="mr-1" /> Import
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            onClick={downloadTemplate}
            className="flex items-center bg-yellow-600 text-white text-sm px-4 py-1.5 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
          >
            <DownloadCloud size={16} className="mr-1" /> Template
          </button>
          <div className="bg-white px-3 py-1.5 rounded-lg flex items-center space-x-2 shadow-md border border-gray-300">
            <Search className="text-gray-600" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none placeholder-gray-600 w-40 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Display message if no employees are available */}
      {employees.length === 0 ? (
        <div className="flex justify-center items-center py-6 bg-white rounded-lg shadow-md border border-gray-300">
          <p className="text-sm text-gray-600">
            No employees added yet. Please{" "}
            <button
              onClick={() => navigate("/dashboard/emp-onboarding")}
              className="text-blue-600 underline"
            >
              Add Employees
            </button>{" "}
            or{" "}
            <button
              onClick={downloadTemplate}
              className="text-yellow-600 underline"
            >
              Download the Template
            </button>{" "}
            and import employees from an Excel sheet.
          </p>
        </div>
      ) : (
        <div className="overflow-auto shadow-lg rounded-lg border border-gray-300 bg-white">
          <table className="w-full border-collapse text-xs">
            <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <tr>
                <th className="p-2 text-left">Emp ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Designation</th>
                <th className="p-2 text-center">Site</th>
                <th className="p-2 text-left">Shift</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr key={index} className="odd:bg-gray-200 even:bg-gray-100 hover:bg-blue-200 transition duration-200">
                  <td className="p-2 border-b">{employee["Emp ID"]}</td>
                  <td className="p-2 border-b font-semibold text-gray-900">{employee["Employee Name"]}</td>
                  <td className="p-2 border-b">{employee["Designation"]}</td>
                  <td className="p-2 border-b text-center">{employee["Site"]}</td>
                  <td className="p-2 border-b">{employee["Shift"]}</td>
                  <td className="p-2 border-b">{employee["Phone"]}</td>
                  <td className="p-2 border-b text-center">
                    <button className="text-blue-700 hover:text-blue-900 transition">
                      <SquarePen size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {employees.length > 0 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            className={`px-3 py-1 bg-gray-400 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"}`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-400 hover:bg-gray-500"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 bg-gray-400 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-500"}`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      
    </div>
  );
};

export default StaffBook;
