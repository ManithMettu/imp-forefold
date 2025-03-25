import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import FormInput from "~/components/ui/form-input";
import FormSelect from "~/components/ui/form-select";
import FormSubmitButton from "~/components/ui/form-submit-button";
import { Label } from "~/components/ui/label";

export default function BankKYCDetails() {
  const [employmentType, setEmploymentType] = useState("permanent");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const idTypes = ["Aadhaar", "PAN", "Voter ID"];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Bank & KYC Details</h2>
      
      <Form.Root onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Bank Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-700">Bank Account Details</h3>
          
          {/* Account Number */}
          <div className="space-y-2">
            <FormInput
              name="accountNumber"
              label="Account Number"
              type="number"
              placeholder="Enter bank account number"
              required
            />
          </div>

          {/* Bank Name */}
          <div className="space-y-2">
            <FormInput
              name="bankName"
              label="Bank Name"
              type="text"
              placeholder="Enter bank name"
              required
            />
          </div>

          {/* Branch Name */}
          <div className="space-y-2">
            <FormInput
              name="branchName"
              label="Branch Name"
              type="text"
              placeholder="Enter branch name"
              required
            />
          </div>

          {/* IFSC Code */}
          <div className="space-y-2">
            <FormInput
              name="ifscCode"
              label="IFSC Code"
              type="text"
              placeholder="Enter IFSC code"
              className="uppercase"
              required
            />
          </div>
        </div>

        {/* Right Column - KYC Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-700">KYC & Legal Details</h3>
          
          {/* ID Type */}
          <div className="space-y-2">
            <FormSelect
              name="idType"
              label="ID Type"
              options={idTypes.map(type => ({ value: type, label: type }))}
              placeholder="Select ID Type"
              required
            />
          </div>

          {/* ID Number */}
          <div className="space-y-2">
            <FormInput
              name="idNumber"
              label="ID Number"
              type="text"
              placeholder="Enter ID number"
              required
            />
          </div>

          {/* Permanent Employee Specific Fields */}
          {employmentType === "permanent" && (
            <>
              {/* ESI ID */}
              <div className="space-y-2">
                <FormInput
                  name="esiId"
                  label="ESI ID"
                  type="text"
                  placeholder="Enter ESI ID"
                />
              </div>

              {/* PF Account Number */}
              <div className="space-y-2">
                <FormInput
                  name="pfNumber"
                  label="PF Account Number"
                  type="text"
                  placeholder="Enter PF account number"
                />
              </div>

              {/* UAN */}
              <div className="space-y-2">
                <FormInput
                  name="uan"
                  label="UAN (for PF)"
                  type="text"
                  placeholder="Enter UAN"
                />
              </div>

              {/* PRAN ID */}
              <div className="space-y-2">
                <FormInput
                  name="pranId"
                  label="PRAN ID for NPS"
                  type="text"
                  placeholder="Enter PRAN ID"
                />
              </div>
            </>
          )}

          {/* Document Upload Section */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Upload Documents</Label>
            <input
              type="file"
              multiple
              className="w-full p-2 border rounded-md border-gray-200 focus:ring-2 focus:ring-blue-500/20"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload scanned copies of your ID proof and other documents (PDF, JPG, PNG)
            </p>
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
  