import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import API from "../.././../../utils/axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import RocketAnimation from '@/components/RocketAnimation';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
   const response = await API.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`); // ✅ Right

    console.log('Reset email sent:', response.data);
    setIsSubmitted(true);
  } catch (err) {
    console.error('Reset error:', err);
    // optionally show an error message here
  } finally {
    setIsLoading(false);
  }
};



  if (isSubmitted) {
    return (
      <Card className="glass-card w-full max-w-md mx-auto fade-in-up delay-200">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Check Your Email</CardTitle>
          <CardDescription className="text-muted-foreground">
            We've sent a password reset link to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or{" "}
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-primary hover:text-primary-glow font-medium underline"
            >
              try again
            </button>
          </div>
          <Link to="/login">
            <Button className="w-full btn-gradient group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    
      <Card className="glass-card p-8 lg:p-12 w-full max-w-md fade-in-up delay-300">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-foreground">Forgot Password?</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full btn-gradient"
              disabled={isLoading}
            >
              {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <RocketAnimation 
          message="Sending Reset Link..." 
          isVisible={isLoading}
        />
      )}
    </>
  );
};