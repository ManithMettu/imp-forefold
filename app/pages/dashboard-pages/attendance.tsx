// Attendance.tsx
import * as Form from "@radix-ui/react-form";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import FormInput from "~/components/ui/form-input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/form-radio-group";
import { Label } from "~/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface Employee {
  id: number;
  name: string;
  phone: string;
  designation: string;
  siteLocation: string;
  present: boolean;
  hoursWorked: number;
  overtime: number;
}

const initialEmployees: Employee[] = [
  { id: 1, name: "John Doe", phone: "123-456-7890", designation: "Supervisor", siteLocation: "Site 1", present: true, hoursWorked: 8, overtime: 0 },
  { id: 2, name: "Jane Smith", phone: "987-654-3210", designation: "Labor", siteLocation: "Site 2", present: true, hoursWorked: 8, overtime: 0 },
  { id: 3, name: "Alice Johnson", phone: "555-123-4567", designation: "Mestri", siteLocation: "Site 3", present: true, hoursWorked: 8, overtime: 0 },
  { id: 4, name: "Bob Wilson", phone: "444-555-6666", designation: "Labor", siteLocation: "Site 1", present: true, hoursWorked: 8, overtime: 0 },
  { id: 5, name: "Carol Brown", phone: "777-888-9999", designation: "Supervisor", siteLocation: "Site 2", present: true, hoursWorked: 8, overtime: 0 },
  { id: 6, name: "David Lee", phone: "111-222-3333", designation: "Mestri", siteLocation: "Site 3", present: true, hoursWorked: 8, overtime: 0 },
];

const Attendance: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isHoliday, setIsHoliday] = useState(false);

  const toggleAttendance = (id: number, status: 'present' | 'absent') => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          if (isHoliday) {
            return { ...emp, present: true, hoursWorked: 0 };
          }
          return { 
            ...emp, 
            present: status === 'present',
            hoursWorked: status === 'absent' ? 0 : emp.hoursWorked
          };
        }
        return emp;
      })
    );
  };

  const updateHours = (id: number, change: number) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id && !isHoliday ? { ...emp, hoursWorked: Math.max(0, emp.hoursWorked + change) } : emp
      )
    );
  };

  const updateOvertime = (id: number, change: number) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id && !isHoliday ? { ...emp, overtime: Math.max(0, emp.overtime + change) } : emp
      )
    );
  };

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleHolidayChange = (value: string) => {
    const isHolidayValue = value === "yes";
    setIsHoliday(isHolidayValue);
    setEmployees((prev) =>
      prev.map((emp) => ({ 
        ...emp, 
        present: isHolidayValue ? false : emp.present,
        hoursWorked: isHolidayValue ? 0 : emp.hoursWorked 
      }))
    );
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.phone.includes(searchQuery) ||
    emp.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadTemplate = () => {
    // Implementation of downloadTemplate function
  };

  return (
    <Form.Root className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Form.Field name="holiday">
              <Form.Control asChild>
                <RadioGroup
                  name="holiday"
                  value={isHoliday ? "yes" : "no"}
                  onValueChange={handleHolidayChange}
                  className="flex items-center bg-gray-50 rounded-md overflow-hidden"
                >
                  <div className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 border-r border-gray-200">
                    Holiday
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem 
                      value="yes" 
                      id="holiday-yes" 
                      className="peer sr-only"
                    />
                    <Label 
                      htmlFor="holiday-yes" 
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors",
                        isHoliday 
                          ? "bg-white text-blue-600" 
                          : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem 
                      value="no" 
                      id="holiday-no" 
                      className="peer sr-only"
                    />
                    <Label 
                      htmlFor="holiday-no" 
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors",
                        !isHoliday 
                          ? "bg-white text-blue-600" 
                          : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </Form.Control>
            </Form.Field>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDateChange(-1)}
                className="h-7 w-7"
              >
                <ChevronLeftIcon className="h-3 w-3" />
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal h-7 text-xs",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {format(selectedDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDateChange(1)}
                className="h-7 w-7"
              >
                <ChevronRightIcon className="h-3 w-3" />
              </Button>
            </div>

            <Form.Field name="search">
              <Form.Control asChild>
                <FormInput
                  name="search"
                  label=""
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-7 text-xs"
                />
              </Form.Control>
            </Form.Field>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Site</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">OT</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 whitespace-nowrap text-gray-900">{employee.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-900">{employee.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-900">{employee.phone}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-900">{employee.designation}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-900">{employee.siteLocation}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Form.Field name={`attendance-${employee.id}`}>
                      <Form.Control asChild>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAttendance(employee.id, 'present')}
                            className={cn(
                              "w-16 h-6 text-xs",
                              employee.present && !isHoliday && "bg-green-500 text-white hover:bg-green-600",
                              isHoliday && "bg-gray-200 hover:bg-gray-300 text-gray-700"
                            )}
                            disabled={isHoliday && !employee.present}
                          >
                            Present
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAttendance(employee.id, 'absent')}
                            className={cn(
                              "w-16 h-6 text-xs",
                              !employee.present && "bg-red-500 text-white hover:bg-red-600",
                              isHoliday && "bg-gray-200 hover:bg-gray-300 text-gray-700"
                            )}
                            disabled={isHoliday && employee.present}
                          >
                            Absent
                          </Button>
                        </div>
                      </Form.Control>
                    </Form.Field>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Form.Field name={`hours-${employee.id}`}>
                      <Form.Control asChild>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateHours(employee.id, -1)}
                            disabled={isHoliday}
                            className="h-6 w-6 text-xs"
                          >
                            -
                          </Button>
                          <span className="text-gray-900 w-4 text-center">{employee.hoursWorked}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateHours(employee.id, 1)}
                            disabled={isHoliday}
                            className="h-6 w-6 text-xs"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Control>
                    </Form.Field>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Form.Field name={`overtime-${employee.id}`}>
                      <Form.Control asChild>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateOvertime(employee.id, -1)}
                            disabled={isHoliday}
                            className="h-6 w-6 text-xs"
                          >
                            -
                          </Button>
                          <span className="text-gray-900 w-4 text-center">{employee.overtime}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateOvertime(employee.id, 1)}
                            disabled={isHoliday}
                            className="h-6 w-6 text-xs"
                          >
                            +
                          </Button>
                        </div>
                      </Form.Control>
                    </Form.Field>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Form.Root>
  );
};

export default Attendance;