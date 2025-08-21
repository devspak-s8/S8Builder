import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ErrorModal } from "@/components/ui/error-modal";
import API from "../../../../utils/axios";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loadingState, setLoadingState] = useState({
    isVisible: false,
    status: "loading",
    errorMessage: ""
  });
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState({ isVisible: true, status: "loading", errorMessage: "" });

    try {
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { access_token, refresh_token, is_admin } = response.data;

      // Save tokens depending on "Remember Me"
      const storage = formData.rememberMe ? localStorage : sessionStorage;
      storage.setItem("access_token", access_token);
      storage.setItem("refresh_token", refresh_token);
      storage.setItem("is_admin", JSON.stringify(is_admin));
      storage.setItem("email", formData.email);

      setLoadingState({
        isVisible: true,
        status: "success",
        errorMessage: "✅ Logging you in...",
      });

      setTimeout(() => {
        setLoadingState(prev => ({ ...prev, isVisible: false }));
        navigate(is_admin ? "/admin-dashboard" : "/user-dashboard", { replace: true });
      }, 1000);

    } catch (err) {
      let errorMessage = "❌ Login failed. Try again.";
      const data = err.response?.data;

      if (data) {
        if (Array.isArray(data.detail)) errorMessage = data.detail.map(e => `❌ ${e.msg}`).join(" ");
        else if (typeof data.detail === "string") errorMessage = `❌ ${data.detail}`;
        else if (typeof data.message === "string") errorMessage = `❌ ${data.message}`;
      }

      setLoadingState({ isVisible: true, status: "error", errorMessage });
      setTimeout(() => {
        setLoadingState(prev => ({ ...prev, isVisible: false }));
        setShowErrorModal(true);
      }, 1000);
    }
  };

  return (
    <>
      <div className="glass-card p-8 lg:p-12 w-full max-w-md fade-in-up delay-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Sign In</h2>
          <p className="text-muted-foreground">Welcome back! Please sign in to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-4">
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
          <div className="space-y-8">
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
            disabled={loadingState.isVisible}
            className="btn-gradient w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingState.status === "loading" ? "Sign In" : "Signing In..."}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary-glow transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Overlays */}
      <LoadingOverlay
        isVisible={loadingState.isVisible}
        status={loadingState.status}
        loadingText="Signing In..."
        successText="Login successful!"
        errorText={loadingState.errorMessage}
        onComplete={() => setLoadingState(prev => ({ ...prev, isVisible: false }))}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Authentication Failed"
        message={loadingState.errorMessage}
      />
    </>
  );
}
