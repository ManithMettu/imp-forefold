import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import FormInput from "~/components/ui/form-input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/form-radio-group";
import FormSelect from "~/components/ui/form-select";
import FormSubmitButton from "~/components/ui/form-submit-button";
import { Label } from "~/components/ui/label";

export default function EmploymentDetails() {
  const [employmentType, setEmploymentType] = useState("permanent");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample data for dropdowns - Replace with your actual data
  const designations = ["Software Engineer", "Project Manager", "Team Lead", "Designer"];
  const businessUnits = ["IT Services", "Product Development", "Operations"];
  const divisions = ["North", "South", "East", "West"];
  const departments = ["Engineering", "Design", "Marketing", "Sales"];
  const managers = ["John Doe", "Jane Smith", "Mike Johnson"];
  const shifts = ["Morning", "General", "Evening", "Full Night"];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Employment Details</h2>
      
      <Form.Root onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Employment Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Employment Type</Label>
            <RadioGroup 
              name="employmentType" 
              className="flex space-x-6"
              value={employmentType}
              onValueChange={setEmploymentType}
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value="permanent" 
                  id="permanent"
                />
                <Label htmlFor="permanent" className="ml-2 text-sm font-medium text-gray-700">Permanent</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem 
                  value="contract" 
                  id="contract"
                />
                <Label htmlFor="contract" className="ml-2 text-sm font-medium text-gray-700">Contract</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Contract-specific fields */}
          {employmentType === "contract" && (
            <>
              {/* Payment Term */}
              <div className="space-y-2">
                <FormSelect
                  name="paymentTerm"
                  label="Payment Term"
                  options={[
                    { value: "hourly", label: "Hourly" },
                    { value: "daily", label: "Daily" },
                    { value: "monthly", label: "Monthly" }
                  ]}
                  placeholder="Select Payment Term"
                />
              </div>

              {/* Payment Rate */}
              <div className="space-y-2">
                <FormInput
                  name="paymentRate"
                  label="Payment Rate"
                  type="number"
                  placeholder="Enter payment rate"
                />
              </div>
            </>
          )}

          {/* Permanent-specific fields */}
          {employmentType === "permanent" && (
            <div className="space-y-2">
              <FormInput
                name="monthlySalary"
                label="Monthly Salary"
                type="number"
                placeholder="Enter monthly salary"
              />
            </div>
          )}

          {/* Designation */}
          <div className="space-y-2">
            <FormSelect
              name="designation"
              label="Designation"
              options={designations.map(designation => ({ value: designation, label: designation }))}
              placeholder="Select Designation"
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Business Unit */}
          <div className="space-y-2">
            <FormSelect
              name="businessUnit"
              label="Business Unit"
              options={businessUnits.map(unit => ({ value: unit, label: unit }))}
              placeholder="Select Business Unit"
              required
            />
          </div>

          {/* Division */}
          <div className="space-y-2">
            <FormSelect
              name="division"
              label="Division"
              options={divisions.map(division => ({ value: division, label: division }))}
              placeholder="Select Division"
              required
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <FormSelect
              name="department"
              label="Department"
              options={departments.map(department => ({ value: department, label: department }))}
              placeholder="Select Department"
              required
            />
          </div>

          {/* Reporting Manager */}
          <div className="space-y-2">
            <FormSelect
              name="manager"
              label="Reporting Manager"
              options={managers.map(manager => ({ value: manager, label: manager }))}
              placeholder="Select Reporting Manager"
              required
            />
          </div>

          {/* Shift */}
          <div className="space-y-2">
            <FormSelect
              name="shift"
              label="Shift"
              options={shifts.map(shift => ({ value: shift, label: shift }))}
              placeholder="Select Shift"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full flex justify-end pt-6 border-t">
          <FormSubmitButton isSubmitting={isSubmitting}>
            Save & Continue
          </FormSubmitButton>
        </div>
      </Form.Root>
    </div>
  );
}
  