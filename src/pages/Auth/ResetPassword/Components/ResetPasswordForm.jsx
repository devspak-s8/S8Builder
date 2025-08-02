import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import API from "../../../../utils/axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, CheckCircle, Lock } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import RocketAnimation from "@/components/RocketAnimation";

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: ""
  });

  const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return "Password must contain uppercase, lowercase, and number";
  }
  return "";
};

const handlePasswordChange = (value) => {
  setPassword(value);
  const error = validatePassword(value);
  setErrors((prev) => ({ ...prev, password: error }));
};

const handleConfirmPasswordChange = (value) => {
  setConfirmPassword(value);
  const error = value !== password ? "Passwords do not match" : "";
  setErrors((prev) => ({ ...prev, confirmPassword: error }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const passwordError = validatePassword(password);
  const confirmError = password !== confirmPassword ? "Passwords do not match" : "";

  if (passwordError || confirmError) {
    setErrors({ password: passwordError, confirmPassword: confirmError });
    return;
  }

  setIsLoading(true);
  try {
    const payload = { token, password };
    await API.post("/auth/reset-password", payload);
    setIsSuccess(true);
  } catch (error) {
    console.error("Reset error:", error);
    setErrors((prev) => ({
      ...prev,
      password: error.response?.data?.detail || "Something went wrong. Try again.",
    }));
  } finally {
    setIsLoading(false);
  }
};


  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, text: "" };
    if (password.length < 6) return { strength: 1, text: "Weak" };
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 2, text: "Medium" };
    }
    return { strength: 3, text: "Strong" };
  };

  const passwordStrength = getPasswordStrength();

  if (!token) {
    return (
      <Card className="glass-card w-full max-w-md mx-auto fade-in-up delay-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-destructive">Invalid Reset Link</CardTitle>
          <CardDescription className="text-muted-foreground">
            This password reset link is invalid or has expired
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/forgot-password">
            <Button className="w-full btn-gradient">
              Request New Reset Link
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="glass-card w-full max-w-md mx-auto fade-in-up delay-200">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Password Reset Successfully</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your password has been updated. You can now sign in with your new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/login">
            <Button className="w-full btn-gradient">
              Sign In Now
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass-card w-full max-w-md mx-auto fade-in-up delay-200">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Reset Your Password</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="glass-input pr-10"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength.strength
                            ? level === 1
                              ? "bg-destructive"
                              : level === 2
                              ? "bg-warning"
                              : "bg-success"
                            : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password strength: <span className="font-medium">{passwordStrength.text}</span>
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  className="glass-input pr-10"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full btn-gradient"
              disabled={isLoading || !!errors.password || !!errors.confirmPassword}
            >
              {isLoading ? "Updating Password..." : "Update Password"}
            </Button>
          </form>

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <RocketAnimation 
          message="Updating Password..." 
          isVisible={isLoading}
        />
      )}
    </>
  );
};