import { PinInput } from "@ark-ui/react/pin-input";
import ky from "ky";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import useTimer from "~/hooks/use-timer";
import { cn } from "~/lib/utils";

type OtpSentResponse = {
  message: string;
  data: {
    otp_id: string;
  };
};

type OptVerifiedResponse = {
  message: string;
};

type Props = {
  type: "email" | "phone";
  organization_id: string;
  onSuccess: () => void;
  onBack: () => void;
};

export default function OtpVerificationForm({
  type,
  organization_id,
  onSuccess,
  onBack,
}: Props) {
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpId, setOtpId] = useState<string>();
  const [error, setError] = useState<string>();
  const { time, isRunning, start, reset } = useTimer(30);

  async function sendOtp(afterFn?: () => void) {
    setIsSending(true);
    try {
      const response = await ky.post(`/api/auth/send-otp/${type}`, {
        json: { organization_id },
      });
      const result = await response.json<OtpSentResponse>();
      console.log(result.message);
      setOtpId(result.data.otp_id);
      afterFn?.();
    } catch (err) {
      console.error(err);
      // TODO: Set error.
    } finally {
      setIsSending(false);
    }
  }

  async function verifyOtp(details: PinInput.ValueChangeDetails) {
    setError(undefined);
    setIsVerifying(true);
    try {
      const response = await ky.post("/api/auth/verify-otp", {
        json: { type, id: otpId, code: details.valueAsString },
      });
      const result = await response.json<OptVerifiedResponse>();
      console.log(result.message);
      onSuccess();
    } catch (err) {
      console.error(err);
      // TODO: Set error.
    } finally {
      setIsVerifying(false);
    }
  }

  function resendOtp() {
    sendOtp(() => {
      reset();
      start();
    });
  }

  useEffect(() => {
    sendOtp(start);
  }, []);

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Verify your {type}
        </h2>
        <p className="text-gray-600">
          Enter the 6-digit code sent to your {type}.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <PinInput.Root
            onValueComplete={verifyOtp}
            count={6}
            autoFocus={true}
            disabled={isSending || isVerifying}
            placeholder=""
            otp
          >
            <PinInput.Control className="space-x-2">
              {[0, 1, 2, 3, 4, 5].map((id) => (
                <PinInput.Input
                  key={id}
                  index={id}
                  className="h-14 w-12 rounded-md border border-gray-300 text-center text-xl font-bold shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              ))}
            </PinInput.Control>
            <PinInput.HiddenInput />
          </PinInput.Root>
          {error && (
            <div className="mt-2 text-center text-sm text-red-500">{error}</div>
          )}
        </div>

        <div className="text-center text-sm">
          Didn't receive the code?&nbsp;
          <button
            type="button"
            onClick={resendOtp}
            disabled={isRunning || isSending || isVerifying}
            className={cn(
              "font-medium underline underline-offset-2",
              isRunning || isSending || isVerifying
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-blue-600",
            )}
          >
            {isRunning ? `Resend (in ${time}s)` : "Resend"}
          </button>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Sign Up
        </button>
      </div>
    </div>
  );
}
