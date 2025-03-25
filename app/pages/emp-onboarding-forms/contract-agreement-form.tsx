import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { Label } from "~/components/ui/label";

export default function ContractAgreement() {
  const [fullName, setFullName] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
        Contractual Agreement
      </h2>

      <Form.Root onSubmit={handleSubmit} className="space-y-6">
        {/* Employment Agreement Terms */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Employment Agreement Terms
          </Label>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-medium mb-4">Standard Terms and Conditions</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>1. The employee agrees to work according to the company's policies and procedures.</p>
              <p>2. Working hours shall be as per company standard or as agreed upon in writing.</p>
              <p>3. The probation period shall be 3 months from the date of joining.</p>
              <p>4. Notice period for resignation shall be as per company policy.</p>
              {/* Add more terms as needed */}
            </div>
          </div>
        </div>

        {/* Additional Terms for Contract Employees */}
        <Form.Field name="contractTerms">
          <Form.Label className="text-sm font-medium text-gray-700">
            Additional Contract Terms (Optional)
          </Form.Label>
          <Form.Control asChild>
            <textarea
              className="w-full p-3 border rounded-md border-gray-200 focus:ring-2 focus:ring-blue-500/20 min-h-[100px]"
              placeholder="Enter any additional terms specific to this contract..."
            />
          </Form.Control>
        </Form.Field>

        {/* Full Name Section */}
        <Form.Field name="fullName">
          <Form.Label className="text-sm font-medium text-gray-700">
            Full Name (As Signature)
          </Form.Label>
          <div className="border rounded-lg p-4 bg-white">
            <Form.Control asChild>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border rounded-md border-gray-200 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your full name as signature"
                required
              />
            </Form.Control>
          </div>
        </Form.Field>

        {/* Additional Notes */}
        <Form.Field name="additionalNotes">
          <Form.Label className="text-sm font-medium text-gray-700">
            Additional Notes (Optional)
          </Form.Label>
          <Form.Control asChild>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value.slice(0, 100))}
              className="w-full p-3 border rounded-md border-gray-200 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Enter any additional notes (max 100 characters)"
              maxLength={100}
            />
          </Form.Control>
          <p className="text-sm text-gray-500">
            {additionalNotes.length}/100 characters
          </p>
        </Form.Field>

        {/* Agreement Checkbox */}
        <Form.Field name="agreement" className="flex items-center space-x-2 py-4">
          <Form.Control asChild>
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </Form.Control>
          <Form.Label className="text-sm text-gray-700">
            I have read and agree to the terms and conditions
          </Form.Label>
        </Form.Field>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t">
          <Form.Submit asChild>
            <button
              disabled={!isAgreed || !fullName.trim()}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Onboarding
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
}
  