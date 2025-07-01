
import '../../styles/animations.css';

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    CheckCircle,
    Users,
    Zap,
    Globe,
    Palette,
    Smartphone,
    Settings,
    BarChart3,
    Shield,
    ArrowRight,
    Star,
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    ChevronRight,
} from "lucide-react"
import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react"

export default function LandingPage() {
const observerRef = useRef(null); 
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        console.log("🚀 useEffect started");

        const timer = setTimeout(() => {
            setIsLoaded(true);
            console.log("✅ Loaded state set to true");
        }, 100);

        const animateCounter = (element) => {
            console.log("🔥 Counter triggered");
            const target = parseInt(element.getAttribute("data-target"), 10);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current).toString();
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toString();
                }
            };

            updateCounter();
        };

        // Intersection Observer
        observerRef.current = new IntersectionObserver((entries) => {
            console.log("👀 Observing entries...");
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("✅ Element intersected:", entry.target);
                    entry.target.classList.add("animate-in");

                    if (entry.target.classList.contains("counter-animate")) {
                        animateCounter(entry.target);
                    }
                }
            });
        });

        const elements = document.querySelectorAll(
            ".animate-on-scroll, .fade-up, .fade-down, .fade-left, .fade-right, .zoom-in, .zoom-out, .counter-animate"
        );

        console.log("📦 Elements found:", elements.length);

        elements.forEach((el) => observerRef.current.observe(el));

        // Scroll
        const handleScroll = () => {
            document.documentElement.style.setProperty("--scroll-y", window.scrollY.toString());
            const scrollTop = window.scrollY;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            document.documentElement.style.setProperty("--scroll-percent", scrollPercent.toString());
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timer);
            observerRef.current?.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    },[]); // ✅ DON’T FORGET THIS EMPTY ARRAY!


    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-slate-50 to-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
            {/* Scroll Progress Indicator */}
            <div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 z-50"
                style={{ width: "calc(var(--scroll-percent, 0) * 100%)" }}
            ></div>

            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 animate-on-scroll">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center floating">
                            <span className="text-white font-bold text-sm">S8</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">S8Builder</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="#services" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                            Services
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 pulse-glow btn-hover-effect">
                            Book Now
                        </Button>
                    </nav>
                </div>
            </header>

            {/* Hero Section with Animated Background */}
            <section className="py-20 px-4 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto text-center max-w-4xl relative">
                    <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 zoom-in">
                        ✨ Your On-Demand Creative Tech Studio
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight fade-up">
                        Need a website or brand in{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent gradient-animate">
                            days, not months?
                        </span>
                    </h1>
                    <p
                        className="text-xl text-gray-600 mb-8 leading-relaxed fade-up typewriter"
                        style={{ transitionDelay: "0.2s" }}
                    >
                        S8Builder offers premium digital services built fast, built right.
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-up"
                        style={{ transitionDelay: "0.4s" }}
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3 pulse-glow btn-hover-effect ripple"
                        >
                            Book. Build. Launch.
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-lg px-8 py-3 bg-transparent hover:bg-purple-50 transition-all duration-300 ripple"
                        >
                            View Portfolio
                        </Button>
                    </div>
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 stagger-children">
                        <div className="flex items-center space-x-2 transition-transform hover:scale-110 duration-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Fast Delivery</span>
                        </div>
                        <div className="flex items-center space-x-2 transition-transform hover:scale-110 duration-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Professional Quality</span>
                        </div>
                        <div className="flex items-center space-x-2 transition-transform hover:scale-110 duration-300">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Affordable Pricing</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner with Gradient Animation */}
            <section className="py-12 px-4 bg-gradient-to-r from-purple-100 to-pink-100 animate-on-scroll morphing-bg">
                <div className="container mx-auto text-center">
                    <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Transform Your Digital Presence?</h3>
                            <p className="text-gray-600">Join 500+ satisfied clients who chose S8Builder</p>
                        </div>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect ripple">
                            Start Your Project Today
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Available Services with 3D Card Effects */}
            <section id="services" className="py-20 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100 zoom-in shimmer">
                            ✅ Available Now
                        </Badge>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 clip-reveal">What We Offer Today</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up">
                            Professional digital solutions ready to launch your business online
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card
                            className="border-2 hover:border-purple-200 transition-all duration-500 hover:shadow-lg card-3d fade-left"
                            style={{ transitionDelay: "0.1s" }}
                        >
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 floating">
                                    <Globe className="h-6 w-6 text-purple-600" />
                                </div>
                                <CardTitle>Landing Page Design</CardTitle>
                                <CardDescription>Perfect for personal brands, products, and events</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card
                            className="border-2 hover:border-purple-200 transition-all duration-500 hover:shadow-lg card-3d fade-up"
                            style={{ transitionDelay: "0.2s" }}
                        >
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 floating">
                                    <Globe className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle>Website Creation</CardTitle>
                                <CardDescription>Portfolio, Corporate, Blog, and custom websites</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card
                            className="border-2 hover:border-purple-200 transition-all duration-500 hover:shadow-lg card-3d fade-right"
                            style={{ transitionDelay: "0.3s" }}
                        >
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 floating">
                                    <Settings className="h-6 w-6 text-green-600" />
                                </div>
                                <CardTitle>Service Booking System</CardTitle>
                                <CardDescription>Streamlined booking and project management</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card
                            className="border-2 hover:border-purple-200 transition-all duration-500 hover:shadow-lg card-3d fade-left"
                            style={{ transitionDelay: "0.4s" }}
                        >
                            <CardHeader>
                                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 floating">
                                    <Palette className="h-6 w-6 text-pink-600" />
                                </div>
                                <CardTitle>Brand Design</CardTitle>
                                <CardDescription>Logo, Color Palette, Typography suggestions</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card
                            className="border-2 hover:border-purple-200 transition-all duration-500 hover:shadow-lg card-3d fade-up"
                            style={{ transitionDelay: "0.5s" }}
                        >
                            <CardHeader>
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 floating">
                                    <Smartphone className="h-6 w-6 text-orange-600" />
                                </div>
                                <CardTitle>Mobile Optimization</CardTitle>
                                <CardDescription>Responsive design for all devices</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card
                            className="border-2 hover:border-purple-200 transition-all duration-500 hover:shadow-lg card-3d fade-right"
                            style={{ transitionDelay: "0.6s" }}
                        >
                            <CardHeader>
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 floating">
                                    <Zap className="h-6 w-6 text-indigo-600" />
                                </div>
                                
                                <CardTitle>Fast Delivery</CardTitle>
                                <CardDescription>Quick turnaround without compromising quality</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Mid-Page CTA with Parallax Effect */}
            <section className="py-16 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white animate-on-scroll relative overflow-hidden">
                {/* Parallax background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-500 rounded-full opacity-10 parallax parallax-slow"></div>
                        <div className="absolute top-40 right-1/4 w-48 h-48 bg-pink-500 rounded-full opacity-10 parallax parallax-medium"></div>
                        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-indigo-500 rounded-full opacity-10 parallax parallax-fast"></div>
                    </div>
                </div>

                <div className="container mx-auto text-center max-w-3xl relative">
                    <h3 className="text-3xl font-bold mb-4 reveal-text" data-text="Don't Wait Months for Your Website">
                        Don't Wait Months for Your Website
                    </h3>
                    <p className="text-xl mb-8 opacity-90">
                        While others take months, we deliver professional results in days. Your competition won't wait – why should
                        you?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect ripple"
                        >
                            Get Started Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent transition-all duration-300 ripple"
                        >
                            See Our Work
                        </Button>
                    </div>
                </div>
            </section>

            {/* Coming Soon with Hover Reveal Effects */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100 animate-on-scroll scale-in shimmer">
                            🧩 Coming Soon
                        </Badge>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-on-scroll stagger-1">
                            The Future of S8Builder
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll stagger-2">
                            Exciting features in development to make your digital journey even smoother
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="opacity-75 hover:opacity-100 transition-all duration-500 hover:shadow-lg card-3d animate-on-scroll slide-in-left stagger-1">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors duration-300">
                                    <Settings className="h-6 w-6 text-gray-500 group-hover:text-purple-600 transition-colors duration-300" />
                                </div>
                                <CardTitle className="text-gray-700">Drag-and-Drop Builder</CardTitle>
                                <CardDescription>Build websites visually with our intuitive editor</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="opacity-75 hover:opacity-100 transition-all duration-500 hover:shadow-lg card-3d animate-on-scroll stagger-2">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                                    <Zap className="h-6 w-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
                                </div>
                                <CardTitle className="text-gray-700">Business Automation</CardTitle>
                                <CardDescription>Ready-made templates for common business processes</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="opacity-75 hover:opacity-100 transition-all duration-500 hover:shadow-lg card-3d animate-on-scroll slide-in-right stagger-3">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors duration-300">
                                    <BarChart3 className="h-6 w-6 text-gray-500 group-hover:text-green-600 transition-colors duration-300" />
                                </div>
                                <CardTitle className="text-gray-700">Client Dashboard</CardTitle>
                                <CardDescription>Track your projects with real-time updates</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="opacity-75 hover:opacity-100 transition-all duration-500 hover:shadow-lg card-3d animate-on-scroll slide-in-left stagger-4">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-100 transition-colors duration-300">
                                    <Globe className="h-6 w-6 text-gray-500 group-hover:text-pink-600 transition-colors duration-300" />
                                </div>
                                <CardTitle className="text-gray-700">Instant Deployment</CardTitle>
                                <CardDescription>One-click publishing to the web</CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="opacity-75 hover:opacity-100 transition-all duration-500 hover:shadow-lg card-3d animate-on-scroll stagger-5">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                                    <Shield className="h-6 w-6 text-gray-500 group-hover:text-orange-600 transition-colors duration-300" />
                                </div>
                                <CardTitle className="text-gray-700">Secure Auth & Payments</CardTitle>
                                <CardDescription>Built-in security and payment processing</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Target Audience with Rotating Icons */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-6">
                        <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 zoom-in shimmer">🧠 Perfect For</Badge>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 clip-reveal">Who We Serve</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up">
                            Empowering diverse businesses and individuals to succeed online
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center flip-y" style={{ transitionDelay: "0.1s" }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 floating group-hover:scale-110 transition-transform duration-300">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                                Small Businesses
                            </h3>
                            <p className="text-gray-600">Establish your professional online presence</p>
                        </div>

                        <div className="text-center flip-y" style={{ transitionDelay: "0.2s" }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 floating group-hover:scale-110 transition-transform duration-300">
                                <Star className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                Coaches & Creators
                            </h3>
                            <p className="text-gray-600">Build your personal brand and reach more clients</p>
                        </div>

                        <div className="text-center flip-y" style={{ transitionDelay: "0.3s" }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 floating group-hover:scale-110 transition-transform duration-300">
                                <Globe className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                                Event Organizers
                            </h3>
                            <p className="text-gray-600">Create stunning event pages that convert</p>
                        </div>

                        <div className="text-center flip-y" style={{ transitionDelay: "0.4s" }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 floating group-hover:scale-110 transition-transform duration-300">
                                <Zap className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                Students & Startups
                            </h3>
                            <p className="text-gray-600">Scale your digital presence affordably</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section with Counter Animations */}
            <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto">
                    <div className="text-center mb-10">
                        <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100 zoom-in">🚀 Our Impact</Badge>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 clip-reveal">The Numbers Speak For Themselves</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center fade-up">
                            <div className="text-4xl font-bold text-purple-600 mb-2 counter-animate" data-target="500">
                                0
                            </div>
                            <p className="text-gray-600">Happy Clients</p>
                        </div>

                        <div
                            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center fade-up"
                            style={{ transitionDelay: "0.1s" }}
                        >
                            <div className="text-4xl font-bold text-blue-600 mb-2 counter-animate" data-target="750">
                                0
                            </div>
                            <p className="text-gray-600">Projects Completed</p>
                        </div>

                        <div
                            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center fade-up"
                            style={{ transitionDelay: "0.2s" }}
                        >
                            <div className="text-4xl font-bold text-green-600 mb-2 counter-animate" data-target="15">
                                0
                            </div>
                            <p className="text-gray-600">Years Experience</p>
                        </div>

                        <div
                            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center fade-up"
                            style={{ transitionDelay: "0.3s" }}
                        >
                            <div className="text-4xl font-bold text-pink-600 mb-2 counter-animate" data-target="98">
                                0
                            </div>
                            <p className="text-gray-600">Satisfaction Rate %</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section with Scroll Animations */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100 zoom-in">🔄 Our Process</Badge>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 clip-reveal">How We Work</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up">
                            Our streamlined process ensures quality results delivered on time
                        </p>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 z-0"></div>

                        <div className="relative z-10">
                            {/* Step 1 */}
                            <div className="flex flex-col md:flex-row items-center mb-16">
                                <div className="md:w-1/2 md:pr-12 fade-right">
                                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                            <span className="text-purple-600 font-bold">1</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Discovery</h3>
                                        <p className="text-gray-600">
                                            We learn about your business, goals, and requirements to create a tailored solution.
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-1/2 hidden md:block"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col md:flex-row items-center mb-16">
                                <div className="md:w-1/2 hidden md:block"></div>
                                <div className="md:w-1/2 md:pl-12 fade-left">
                                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                            <span className="text-blue-600 font-bold">2</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Design</h3>
                                        <p className="text-gray-600">
                                            Our creative team crafts beautiful, functional designs that align with your brand.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col md:flex-row items-center mb-16">
                                <div className="md:w-1/2 md:pr-12 fade-right">
                                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                            <span className="text-green-600 font-bold">3</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Development</h3>
                                        <p className="text-gray-600">
                                            We build your solution using the latest technologies and best practices.
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-1/2 hidden md:block"></div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-1/2 hidden md:block"></div>
                                <div className="md:w-1/2 md:pl-12 fade-left">
                                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                                            <span className="text-pink-600 font-bold">4</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Launch</h3>
                                        <p className="text-gray-600">
                                            We deploy your project and provide ongoing support to ensure success.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision with Animated Background */}
            <section id="about" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                </div>

                <div className="container mx-auto text-center max-w-4xl relative">
                    <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 animate-on-scroll scale-in shimmer">
                        🌍 Our Vision
                    </Badge>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-on-scroll stagger-1">
                        Africa's Most Accessible Digital Agency
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-8 animate-on-scroll stagger-2">
                        To be Africa's most accessible digital agency-as-a-service, empowering everyone — regardless of tech skill —
                        to launch online faster and smarter.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll stagger-3">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 pulse-glow btn-hover-effect ripple"
                        >
                            Start Your Project
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="hover:bg-purple-50 transition-all duration-300 ripple bg-transparent"
                        >
                            Learn More About Us
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Section with Animated Form */}
            <section id="contact" className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100 animate-on-scroll scale-in shimmer">
                            📞 Get In Touch
                        </Badge>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-on-scroll stagger-1">Contact Us</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-on-scroll stagger-2">
                            Ready to start your project? Get in touch and let's build something amazing together.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form with Focus Animations */}
                        <Card className="p-8 shadow-pop border-draw">
                            <CardHeader className="px-0 pt-0">
                                <CardTitle className="text-2xl">Send us a message</CardTitle>
                                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
                            </CardHeader>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="group">
                                        <Label
                                            htmlFor="firstName"
                                            className="group-focus-within:text-purple-600 transition-colors duration-300"
                                        >
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                        />
                                    </div>
                                    <div className="group">
                                        <Label
                                            htmlFor="lastName"
                                            className="group-focus-within:text-purple-600 transition-colors duration-300"
                                        >
                                            Last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <Label htmlFor="email" className="group-focus-within:text-purple-600 transition-colors duration-300">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                    />
                                </div>

                                <div className="group">
                                    <Label htmlFor="phone" className="group-focus-within:text-purple-600 transition-colors duration-300">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                    />
                                </div>

                                <div className="group">
                                    <Label
                                        htmlFor="service"
                                        className="group-focus-within:text-purple-600 transition-colors duration-300"
                                    >
                                        Service Needed
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300">
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="landing-page">Landing Page Design</SelectItem>
                                            <SelectItem value="website">Full Website</SelectItem>
                                            <SelectItem value="branding">Brand Design</SelectItem>
                                            <SelectItem value="mobile">Mobile Optimization</SelectItem>
                                            <SelectItem value="consultation">Consultation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="group">
                                    <Label htmlFor="budget" className="group-focus-within:text-purple-600 transition-colors duration-300">
                                        Budget Range
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300">
                                            <SelectValue placeholder="Select your budget" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="under-1k">Under $1,000</SelectItem>
                                            <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                                            <SelectItem value="10k-plus">$10,000+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="group">
                                    <Label
                                        htmlFor="message"
                                        className="group-focus-within:text-purple-600 transition-colors duration-300"
                                    >
                                        Project Details
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                                        className="mt-1 min-h-[120px] focus:border-purple-600 focus:ring-purple-600 transition-all duration-300"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect ripple"
                                    size="lg"
                                >
                                    Send Message
                                    <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </Card>

                        {/* Contact Info with Hover Effects */}
                        <div className="space-y-8 animate-on-scroll slide-in-right">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>
                                <p className="text-gray-600 mb-8">
                                    We're here to help you build your digital presence. Reach out through any of these channels.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4 group hover:bg-purple-50 p-3 rounded-lg transition-all duration-300">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                                            Email
                                        </h4>
                                        <p className="text-gray-600">hello@s8builder.com</p>
                                        <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-300">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                            Phone
                                        </h4>
                                        <p className="text-gray-600">+234 903 7063 075</p>
                                        <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM WAT</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group hover:bg-green-50 p-3 rounded-lg transition-all duration-300">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                                            Location
                                        </h4>
                                        <p className="text-gray-600">Lagos, Nigeria</p>
                                        <p className="text-sm text-gray-500">Serving clients globally</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group hover:bg-orange-50 p-3 rounded-lg transition-all duration-300">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Clock className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                                            Response Time
                                        </h4>
                                        <p className="text-gray-600">Within 24 hours</p>
                                        <p className="text-sm text-gray-500">Usually much faster!</p>
                                    </div>
                                </div>
                            </div>

                            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow duration-300 card-3d">
                                <h4 className="font-semibold text-gray-900 mb-2">Quick Start</h4>
                                <p className="text-gray-600 mb-4">
                                    Ready to get started immediately? Book a free 15-minute consultation call.
                                </p>
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect ripple">
                                    Book Free Consultation
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section with Animated Background */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20">
                        <div className="absolute top-10 left-1/4 w-64 h-64 bg-white rounded-full opacity-10 animate-blob"></div>
                        <div className="absolute top-40 right-1/4 w-80 h-80 bg-white rounded-full opacity-10 animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-white rounded-full opacity-10 animate-blob animation-delay-4000"></div>
                    </div>
                </div>

                <div className="container mx-auto text-center max-w-4xl animate-on-scroll relative">
                    <h2 className="text-4xl font-bold mb-6">Ready to Build Your Digital Presence?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join hundreds of satisfied clients who've launched their online success with S8Builder
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-white text-purple-600 hover:bg-gray-100 pulse-glow btn-hover-effect ripple group"
                        >
                            <span className="relative z-10 flex items-center">
                                Book Your Project Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent transition-all duration-300 ripple"
                        >
                            Schedule a Consultation
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer with Hover Effects */}
            <footer className="py-12 px-4 bg-gray-900 text-white animate-on-scroll">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center floating">
                                    <span className="text-white font-bold text-sm">S8</span>
                                </div>
                                <span className="text-xl font-bold">S8Builder</span>
                            </div>
                            <p className="text-gray-400">
                                Your on-demand creative tech studio for fast, beautiful, and affordable digital solutions.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 relative inline-block">
                                Services
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-500"></span>
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Landing Pages
                                </li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Website Design
                                </li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Brand Design
                                </li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Mobile Optimization
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 relative inline-block">
                                Company
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-500"></span>
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    About Us
                                </li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Portfolio
                                </li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Pricing
                                </li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Contact
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 relative inline-block">
                                Connect
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-500"></span>
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Twitter
                                </li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    LinkedIn
                                </li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Instagram
                                </li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                                    <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Email
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} S8Builder. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
