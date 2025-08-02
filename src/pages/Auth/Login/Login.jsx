/** @jsxImportSource react */
import React from 'react';
import BackgroundBlobs from '../../../components/BackgroundBlobs';
import WelcomeSection from '../../../components/WelcomeSection';
import LoginForm from '../Login/Components/LoginForm';

function Login() {
  return (
    <div className="min-h-screen relative">
      <BackgroundBlobs />

      {/* Main Content */}
        <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* Left Column - Welcome Section */}
        <div className="hidden lg:block">
          <WelcomeSection />
        </div>

        {/* Right Column - Login Form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;

