import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import RocketAnimation from '../../../../components/RocketAnimation';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API from "../../../../utils/axios";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRocket, setShowRocket] = useState(false);

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowRocket(true);
    setMessage('');

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await API.post("/auth/login", payload);
      const data = response.data;
      console.log("User:", data);

      // Store tokens & role flag
      const storage = formData.rememberMe ? localStorage : sessionStorage;
      storage.setItem("access_token", data.access_token);
      storage.setItem("refresh_token", data.refresh_token);
      storage.setItem("is_admin", JSON.stringify(data.is_admin));

      setMessage('✅ Login successful! Redirecting...');

      setTimeout(() => {
        setShowRocket(false);
        setMessage('');
        setIsLoading(false);

        // Navigate based on role
        if (data.is_admin) {
          navigate("/admin-dashboard", { replace: true });
        } else {
          navigate("/user-dashboard", { replace: true });
        }
      }, 2000);

    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.detail || '❌ Login failed. Try again.');

      setTimeout(() => {
        setShowRocket(false);
        setMessage('');
        setIsLoading(false);
      }, 2000);
    }
  };


  return (
    <>
      <div className="glass-card p-8 lg:p-12 w-full max-w-md fade-in-up delay-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Sign In</h2>
          <p className="text-muted-foreground">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                id="email"
                type="email"
                required
                className="glass-input w-full pl-12"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="glass-input w-full pl-12 pr-12"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
           <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-glow transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gradient w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
 {message && <p className="mt-4 text-center">{message}</p>}
        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a
              href="/signup"
              className="text-primary hover:text-primary-glow transition-colors font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Rocket Animation */}
      <RocketAnimation
        isVisible={showRocket}
        message="Signing In..."
        onComplete={() => { }}
      />
    </>
  );
};

export default LoginForm;
