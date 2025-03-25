import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import FormInput from "~/components/ui/form-input";
import FormPhoneInput from "~/components/ui/form-phone-input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/form-radio-group";
import FormSubmitButton from "~/components/ui/form-submit-button";
import { Label } from "~/components/ui/label";

export default function BasicInfo() {
  // Auto-generate Employee ID (you might want to handle this differently based on your requirements)
  const [employeeId] = useState(`EMP${Math.floor(Math.random() * 10000)}`);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Basic Information</h2>
      <Form.Root onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Employee ID */}
            <div className="space-y-2">
              <FormInput
                name="empId"
                label="Employee ID"
                value={employeeId}
                readOnly
                className="bg-gray-50"
              />
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <FormInput
                name="firstName"
                label="First Name"
                type="text"
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <FormInput
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Gender</Label>
              <RadioGroup name="gender" className="flex space-x-6">
                <div className="flex items-center">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="ml-2 text-sm font-medium text-gray-700">Male</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="ml-2 text-sm font-medium text-gray-700">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Disability */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Disability</Label>
              <RadioGroup name="disability" className="flex space-x-6">
                <div className="flex items-center">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="ml-2 text-sm font-medium text-gray-700">Yes</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="ml-2 text-sm font-medium text-gray-700">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <FormInput
                name="dob"
                label="Date of Birth"
                type="date"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <FormPhoneInput
                name="phone"
                label="Phone Number"
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <FormInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-4">
              <div className="space-y-2">
                <FormInput
                  name="addressLine1"
                  label="Address Line 1"
                  placeholder="Enter street address"
                  required
                />
              </div>
              <div className="space-y-2">
                <FormInput
                  name="addressLine2"
                  label="Address Line 2"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormInput
                    name="city"
                    label="City"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormInput
                    name="state"
                    label="State"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormInput
                    name="country"
                    label="Country"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormInput
                    name="pincode"
                    label="Pincode"
                    type="text"
                    pattern={["[0-9]{6}", "Please enter a valid 6-digit pincode"]}
                    maxLength={6}
                    placeholder="Enter 6-digit pincode"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date of Joining */}
            <div className="space-y-2">
              <FormInput
                name="doj"
                label="Date of Joining"
                type="date"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t">
          <FormSubmitButton isSubmitting={isSubmitting}>
            Save & Continue
          </FormSubmitButton>
        </div>
      </Form.Root>
    </div>
  );
}
  