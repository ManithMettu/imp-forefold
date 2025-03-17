// import SignupForm from "./forms/signup-form";
import OtpForm from "./forms/otp-form";
import Footer from "./layout/footer";
import Header from "./layout/header";

export default function Signup() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
            {/* {currentStep === "signup" && "Create Your Account"}
            {currentStep === "email-verification" && "Verify Your Email"}
            {currentStep === "phone-verification" && "Verify Your Phone"}
            {currentStep === "complete" && "Registration Complete"} */}
          </h1>
        </div>
        <OtpForm
          type="email"
          organization_id=""
          onSuccess={() => {}}
          onBack={() => {}}
        />
        {/* <SignupForm /> */}
      </main>
      <Footer />
    </div>
  );
}
