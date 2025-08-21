import React from 'react';
import RegisterForm from '../Signup/Components/RegisterForm';
import {BackgroundAnimation} from '../../../components/animations/background-animation';
import {FloatingElements} from '../../../components/animations/floating-elements';  
import {MorphingBackground} from '../../../components/animations/morphing-background';
function Register() {
  return (
    <div className="min-h-screen relative">
 <BackgroundAnimation />
      <FloatingElements />
      <MorphingBackground />
  
        {/* Right Column - Login Form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <RegisterForm />
        </div>
      </div>
  );
}


export default Register;