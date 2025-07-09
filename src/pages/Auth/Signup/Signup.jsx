"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, CheckCircle, Github, Chrome, Shield } from "lucide-react"
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import { Navigation } from "@/pages/LandingPage/Components/navigation"
import { Footer } from "@/pages/LandingPage/Components/Footer"

export default function SignupPage() {
 const observerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
        subscribeNewsletter: true,
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 100)

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in")
                    }
                })
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -100px 0px",
            },
        )

        const elements = document.querySelectorAll(".animate-on-scroll, .fade-up, .fade-left, .fade-right, .zoom-in")
        elements.forEach((el) => observerRef.current?.observe(el))

        return () => {
            clearTimeout(timer)
            observerRef.current?.disconnect()
        }
    }, [])
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        if (!formData.agreeToTerms) {
            alert("Please agree to the terms and conditions!");
            return;
        }

        // Handle signup logic here
        console.log("Signup attempt:", formData);
        alert("Account created successfully! Welcome to S8Builder!");
    };


    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-slate-50 to-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >


            <Navigation />

            {/* Signup Section */}
            <section className="py-20 px-4 relative overflow-hidden min-h-screen flex items-center">
                {/* Animated background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating"></div>
                    <div
                        className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating"
                        style={{ animationDelay: "2s" }}
                    ></div>
                    <div
                        className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating"
                        style={{ animationDelay: "4s" }}
                    ></div>
                </div>

                <div className="container mx-auto max-w-6xl relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Welcome Message */}
                        <div className="fade-right">
                            <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 shimmer">
                                🚀 Join S8Builder
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Start building your{" "}
                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    digital future
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Join thousands of satisfied clients who've transformed their digital presence with S8Builder. Create
                                your account and get started today.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-gray-600">Free consultation included</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-gray-600">Access to 20+ premium templates</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-gray-600">Project management dashboard</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-gray-600">24/7 priority support</span>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Shield className="h-5 w-5 text-purple-600" />
                                    <span className="font-semibold text-purple-900">Secure & Private</span>
                                </div>
                                <p className="text-sm text-purple-700">
                                    Your data is protected with enterprise-grade security. We never share your information with third
                                    parties.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Signup Form */}
                        <div className="fade-left">
                            <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="text-3xl font-bold text-gray-900">Create Account</CardTitle>
                                    <CardDescription className="text-lg">
                                        Join S8Builder and start your digital transformation
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name Fields */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                                    First Name
                                                </Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                    <Input
                                                        id="firstName"
                                                        type="text"
                                                        value={formData.firstName}
                                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                                        placeholder="John"
                                                        required
                                                        className="pl-10 h-12 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                                    Last Name
                                                </Label>
                                                <Input
                                                    id="lastName"
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                                    placeholder="Doe"
                                                    required
                                                    className="h-12 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                                />
                                            </div>
                                        </div>

                                        {/* Email Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    placeholder="john@example.com"
                                                    required
                                                    className="pl-10 h-12 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                                />
                                            </div>
                                        </div>

                                        {/* Password Fields */}
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                                    Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        value={formData.password}
                                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                                        placeholder="Create a strong password"
                                                        required
                                                        className="pl-10 pr-10 h-12 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                                    Confirm Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                    <Input
                                                        id="confirmPassword"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        value={formData.confirmPassword}
                                                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                                        placeholder="Confirm your password"
                                                        required
                                                        className="pl-10 pr-10 h-12 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Terms and Newsletter */}
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-2">
                                                <Checkbox
                                                    id="agreeToTerms"
                                                    checked={formData.agreeToTerms}
                                                    onCheckedChange={(checked) =>
                                                        handleInputChange("agreeToTerms", Boolean(checked))
                                                    }
                                                    className="mt-1"
                                                />
                                                <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                                                    I agree to the{" "}
                                                    <Link to="/terms" className="text-purple-600 hover:text-purple-700 underline">
                                                        Terms of Service
                                                    </Link>{" "}
                                                    and{" "}
                                                    <Link to="/privacy" className="text-purple-600 hover:text-purple-700 underline">
                                                        Privacy Policy
                                                    </Link>
                                                </Label>
                                            </div>
                                            <div className="flex items-start space-x-2">
                                                <Checkbox
                                                    id="subscribeNewsletter"
                                                    checked={formData.subscribeNewsletter}
                                                    onCheckedChange={(checked) =>
                                                        handleInputChange("subscribeNewsletter", Boolean(checked))
                                                    }
                                                    className="mt-1"
                                                />
                                                <Label
                                                    htmlFor="subscribeNewsletter"
                                                    className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                                                >
                                                    Subscribe to our newsletter for updates, tips, and exclusive offers
                                                </Label>
                                            </div>
                                        </div>

                                        {/* Create Account Button */}
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect text-lg font-medium"
                                        >
                                            Create Account
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>

                                        {/* Divider */}
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                            </div>
                                        </div>

                                        {/* Social Signup Buttons */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="h-12 border-gray-300 hover:bg-gray-50 transition-all duration-300 bg-transparent"
                                            >
                                                <Chrome className="h-5 w-5 mr-2" />
                                                Google
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="h-12 border-gray-300 hover:bg-gray-50 transition-all duration-300 bg-transparent"
                                            >
                                                <Github className="h-5 w-5 mr-2" />
                                                GitHub
                                            </Button>
                                        </div>

                                        {/* Sign In Link */}
                                        <div className="text-center pt-4">
                                            <p className="text-gray-600">
                                                Already have an account?{" "}
                                                <Link
                                                    href="/login"
                                                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                                                >
                                                    Sign in here
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
