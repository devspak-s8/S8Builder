import BackgroundBlobs from "@/components/BackgroundBlobs";
import { ResetPasswordForm } from "./Components/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="min-h-screen relative bg-background overflow-hidden">
      <BackgroundBlobs />
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Welcome Section */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
          <div className="flex flex-col justify-center h-full px-12 lg:px-16">
            {/* Welcome Text */}
            <div className="mb-16">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block fade-in-up delay-100 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Create New
                </span>
                <span className="block fade-in-up delay-200 bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                  Password
                </span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground fade-in-up delay-400 max-w-lg">
                You're almost there! Just set up your new secure password.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {[
                { icon: "🛡️", title: "Enhanced Security", description: "Strong password requirements for your protection" },
                { icon: "🔄", title: "Password Strength", description: "Real-time feedback on password security" },
                { icon: "✅", title: "Instant Access", description: "Immediate login after successful reset" }
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`flex items-center space-x-4 fade-in-left delay-${500 + index * 100} group cursor-pointer`}
                >
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/20 transition-all duration-300 text-2xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;