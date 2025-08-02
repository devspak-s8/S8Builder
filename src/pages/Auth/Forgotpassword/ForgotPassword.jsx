import BackgroundBlobs from "@/components/BackgroundBlobs";
import { ForgotPasswordForm } from "./Components/ForrgotPasswordForm";
import WelcomeSection from "@/components/WelcomeSection";
const ForgotPassword = () => {
  return (
    <div className="min-h-screen relative bg-background overflow-hidden">
      <BackgroundBlobs />
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Welcome Section */}
       
         <div className="hidden lg:block">
          <WelcomeSection />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;