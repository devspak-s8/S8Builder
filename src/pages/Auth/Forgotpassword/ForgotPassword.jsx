import BackgroundBlobs from "@/components/BackgroundBlobs";
import { ForgotPasswordForm } from "./Components/ForrgotPasswordForm";
import WelcomeSection from "@/components/WelcomeSection";
const ForgotPassword = () => {
  return (
   <div className="min-h-screen relative">
        <BackgroundBlobs />
  
        {/* Main Content */}
          {/* Left Column - Welcome Section */}
  
          {/* Right Column - Login Form */}
          <div className="flex items-center justify-center p-8 lg:p-12 mt-10">
            <ForgotPasswordForm />
        </div>
      </div>
  );
};

export default ForgotPassword;