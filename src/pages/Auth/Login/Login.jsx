"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowRight, Mail, Lock, CheckCircle, Github, Chrome } from "lucide-react"
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import { Navigation } from "@/pages/LandingPage/Components/navigation"
import { Footer } from "@/pages/LandingPage/Components/Footer"

export default function LoginPage() {
 const observerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
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

        console.log("Login attempt:", formData);
        alert("Login functionality would be implemented here!");
    };


    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-slate-50 to-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >


            <Navigation />

            {/* Login Section */}
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
                            <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 shimmer">👋 Welcome Back</Badge>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Welcome back to{" "}
                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    S8Builder
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Sign in to access your dashboard, manage your projects, and continue building your digital presence.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-gray-600">Access your project dashboard</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-gray-600">Track project progress</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-gray-600">Download completed projects</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-gray-600">24/7 support access</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="fade-left">
                            <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="text-3xl font-bold text-gray-900">Sign In</CardTitle>
                                    <CardDescription className="text-lg">Enter your credentials to access your account</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
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

                                        {/* Password Field */}
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
                                                    placeholder="Enter your password"
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

                                        {/* Remember Me & Forgot Password */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="rememberMe"
                                                    checked={formData.rememberMe}
                                                    onCheckedChange={(checked) => handleInputChange("rememberMe", Boolean(checked))}
                                                />

                                                <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
                                                    Remember me
                                                </Label>
                                            </div>
                                            <Link
                                                href="/forgot-password"
                                                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>

                                        {/* Sign In Button */}
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect text-lg font-medium"
                                        >
                                            Sign In
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>

                                        {/* Divider */}
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                            </div>
                                        </div>

                                        {/* Social Login Buttons */}
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

                                        {/* Sign Up Link */}
                                        <div className="text-center pt-4">
                                            <p className="text-gray-600">
                                                Don't have an account?{" "}
                                                <Link
                                                    to="/signup"
                                                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                                                >
                                                    Sign up for free
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
