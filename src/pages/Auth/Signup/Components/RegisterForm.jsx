import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RocketAnimation from '../../../../components/RocketAnimation';
import API from "../../../../utils/axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const getStrengthColor = (strength) => {
    if (strength < 2) return 'bg-destructive';
    if (strength < 4) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = (strength) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const { fullName, email, password, confirmPassword } = formData;

  // Frontend validations
  if (!fullName || !email || !password || !confirmPassword) {
    setMessage("⚠️ Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    setMessage("❌ Passwords do not match.");
    return;
  }

  if (passwordStrength < 3) {
    setMessage("⚠️ Password is too weak.");
    return;
  }

  // Backend payload (excluding confirmPassword)
  const payload = {
    name: fullName,
    email,
    password,
  };

  try {
    setIsLoading(true);
    setShowRocket(true);
    setMessage("");

    const response = await API.post("/auth/register", payload);
    setMessage("✅ Account created successfully!");
    console.log(response.data);
    setTimeout(() => {
      setShowRocket(false);
      navigate("/user-dashboard");
    }, 2000);
  } catch (err) {
    const errorData = err.response?.data;
    console.log(err.response.data);
    if (Array.isArray(errorData?.detail)) {
      const combinedErrors = errorData.detail.map((e) => `❌ ${e.msg}`).join(" ");
      setMessage(combinedErrors);
    } else {
      setMessage(errorData?.detail || "❌ Registration failed. Please try again.");
    }

    setShowRocket(false);
    setIsLoading(false);
  }
};

  const handleRocketComplete = () => {
    setShowRocket(false);
    setIsLoading(false);
  };

  return (
    <>
      <div className="glass-card p-8 lg:p-12 w-full max-w-md fade-in-up delay-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
          <p className="text-muted-foreground">Join S8Builder and start building amazing applications.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                id="fullName"
                type="text"
                required
                className="glass-input w-full pl-12"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
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

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="glass-input w-full pl-12 pr-12"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Password strength</span>
                  <span className={`font-medium ${passwordStrength < 2 ? 'text-destructive' : passwordStrength < 4 ? 'text-warning' : 'text-success'}`}>
                    {getStrengthText(passwordStrength)}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < passwordStrength ? getStrengthColor(passwordStrength) : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="glass-input w-full pl-12 pr-12"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {formData.confirmPassword && (
              <div className="flex items-center space-x-2 text-xs">
                {passwordsMatch ? (
                  <>
                    <CheckCircle className="text-success" size={16} />
                    <span className="text-success">Passwords match</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-destructive" size={16} />
                    <span className="text-destructive">Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !passwordsMatch || passwordStrength < 3}
            className="btn-gradient w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:text-primary-glow font-medium transition-colors">Sign in</a>
          </p>
        </div>
      </div>

      <RocketAnimation
        isVisible={showRocket}
        message="Creating Account..."
        onComplete={handleRocketComplete}
      />
    </>
  );
};

export default RegisterForm;
