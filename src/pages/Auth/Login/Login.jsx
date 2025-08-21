/** @jsxImportSource react */
import LoginForm from '../Login/Components/LoginForm';

import {BackgroundAnimation} from '../../../components/animations/background-animation';
import {FloatingElements} from '../../../components/animations/floating-elements';  
import {MorphingBackground} from '../../../components/animations/morphing-background';
function Login() {
  return (
    <div className="min-h-screen relative">
 <BackgroundAnimation />
      <FloatingElements />
      <MorphingBackground />
        {/* Right Column - Login Form */}
        <div className="flex items-center justify-center p-8 lg:p-12 mt-10">
          <LoginForm />
      </div>
    </div>
  );
}

export default Login;

