"use client"

import React from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollRevealEnhanced } from "@/components/animations/scroll-reveal-enhanced"
import { ParallaxSection } from "@/components/animations/parallax-section"
import { StaggeredText } from "@/components/animations/staggered-text"
import { MagneticElement } from "@/components/animations/magnetic-element"
import {
  Code,
  Layers,
  Zap,
  Palette,
  Globe,
  Rocket,
  Sparkles,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react"

export function Features() {

    
    return (
        <>

            {/* Enhanced Features Section */}
            <section id="features" className="py-24 md:py-32 relative overflow-hidden">
                <ParallaxSection speed={-0.1}>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/2 to-gray-400/2"></div>
                </ParallaxSection>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <ScrollRevealEnhanced direction="scale">
                        <div className="text-center mb-20">
                            <Badge className="mb-6 bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Core Features
                            </Badge>
                            <StaggeredText
                                text="Everything you need to build faster"
                                className="text-4xl md:text-5xl font-bold mb-6"
                            />
                            <ScrollRevealEnhanced direction="up" delay={0.3}>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    Powerful tools designed for the next generation of digital creators. Build, deploy, and scale with
                                    confidence.
                                </p>
                            </ScrollRevealEnhanced>
                        </div>
                    </ScrollRevealEnhanced>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                icon: <Layers className="h-8 w-8" />,
                                title: "Drag & Drop Interface",
                                description:
                                    "Build responsive layouts with an intuitive drag-and-drop interface that feels natural and powerful.",
                                gradient: "from-gray-400 to-gray-600",
                                features: ["Visual Editor", "Component Library", "Responsive Grid"],
                            },
                            {
                                icon: <Code className="h-8 w-8" />,
                                title: "No Backend Code",
                                description:
                                    "Focus on design while we handle the complex backend logic, databases, and server configurations.",
                                gradient: "from-gray-300 to-gray-500",
                                features: ["Auto-generated APIs", "Database Management", "Server Configuration"],
                            },
                            {
                                icon: <Palette className="h-8 w-8" />,
                                title: "Component Library",
                                description:
                                    "Access hundreds of pre-built, customizable components to speed up your development process.",
                                gradient: "from-gray-500 to-gray-700",
                                features: ["500+ Components", "Custom Styling", "Theme System"],
                            },
                            {
                                icon: <Globe className="h-8 w-8" />,
                                title: "Responsive Previews",
                                description: "Test your designs across different device sizes with real-time responsive previews.",
                                gradient: "from-gray-200 to-gray-400",
                                features: ["Multi-device Preview", "Real-time Updates", "Breakpoint Testing"],
                            },
                            {
                                icon: <Rocket className="h-8 w-8" />,
                                title: "One-Click Deployment",
                                description: "Deploy your projects to production with a single click, no configuration required.",
                                gradient: "from-gray-600 to-gray-800",
                                features: ["Instant Deployment", "CDN Integration", "SSL Certificates"],
                            },
                            {
                                icon: <Zap className="h-8 w-8" />,
                                title: "High Performance",
                                description:
                                    "Enjoy blazing-fast load times with optimized code and assets for maximum performance.",
                                gradient: "from-gray-100 to-gray-300",
                                features: ["Code Optimization", "Asset Compression", "Lazy Loading"],
                            },
                        ].map((feature, index) => (
                            <ScrollRevealEnhanced key={index} delay={index * 0.1} direction="up" stagger={index * 0.05}>
                                <MagneticElement strength={0.1}>
                                    <motion.div
                                        className="group relative h-full"
                                        whileHover={{
                                            y: -12,
                                            rotateX: 5,
                                            scale: 1.02,
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <motion.div
                                            className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                                            whileHover={{ scale: 1.05 }}
                                        />
                                        <div className="relative bg-black/40 border border-white/10 rounded-2xl p-8 h-full backdrop-blur-sm group-hover:bg-black/60 transition-all duration-300">
                                            <div className="flex items-start justify-between mb-6">
                                                <motion.div
                                                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    {feature.icon}
                                                </motion.div>
                                                <motion.div
                                                    className="w-2 h-2 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                                />
                                            </div>

                                            <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed mb-6">{feature.description}</p>

                                            <div className="space-y-2">
                                                {feature.features.map((item, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        className="flex items-center text-sm text-gray-300"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        <motion.div
                                                            className="w-1.5 h-1.5 bg-white rounded-full mr-3 flex-shrink-0"
                                                            animate={{ scale: [1, 1.2, 1] }}
                                                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: idx * 0.2 }}
                                                        />
                                                        {item}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </MagneticElement>
                            </ScrollRevealEnhanced>
                        ))}
                    </div>

                    {/* Enhanced Feature Highlights */}
                    <ScrollRevealEnhanced direction="up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <MagneticElement strength={0.05}>
                                <motion.div
                                    className="bg-gradient-to-br from-white/5 to-gray-400/5 rounded-2xl p-8 border border-white/10"
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="flex items-center mb-4">
                                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                                            <Shield className="h-8 w-8 text-white mr-3" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold">Enterprise Security</h3>
                                    </div>
                                    <p className="text-gray-300 mb-4">
                                        Bank-level security with SSL encryption, secure hosting, and compliance with industry standards.
                                    </p>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        SOC 2 Compliant
                                    </div>
                                </motion.div>
                            </MagneticElement>

                            <MagneticElement strength={0.05}>
                                <motion.div
                                    className="bg-gradient-to-br from-gray-400/5 to-white/5 rounded-2xl p-8 border border-white/10"
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="flex items-center mb-4">
                                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                                            <Clock className="h-8 w-8 text-white mr-3" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold">24/7 Support</h3>
                                    </div>
                                    <p className="text-gray-300 mb-4">
                                        Get help when you need it with our dedicated support team and comprehensive documentation.
                                    </p>
                                    <div className="flex items-center text-sm text-gray-300">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Average 2min response time
                                    </div>
                                </motion.div>
                            </MagneticElement>
                        </div>
                    </ScrollRevealEnhanced>
                </div>
            </section>

            {/* Upcoming Features Section */}
            <section className="py-24 md:py-32 bg-gradient-to-br from-black/95 to-black/90 relative overflow-hidden">
                <ParallaxSection speed={-0.2}>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/2 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                </ParallaxSection>
                <ParallaxSection speed={0.1}>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-400/2 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
                </ParallaxSection>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <ScrollRevealEnhanced direction="scale">
                        <div className="text-center mb-20">
                            <Badge className="mb-6 bg-gradient-to-r from-white/10 to-gray-400/10 text-gray-300 border border-white/20">
                                <Rocket className="w-4 h-4 mr-2" />
                                Coming Soon
                            </Badge>
                            <StaggeredText text="The future of web building" className="text-4xl md:text-5xl font-bold mb-6" />
                            <ScrollRevealEnhanced direction="up" delay={0.3}>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    We're constantly innovating to bring you the most advanced tools. Here's what's coming next to
                                    S8Builder.
                                </p>
                            </ScrollRevealEnhanced>
                        </div>
                    </ScrollRevealEnhanced>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "🔗",
                                title: "AI-Powered Template Generator",
                                description: "Just describe your idea, get a full page layout instantly with AI magic.",
                                status: "Q2 2024",
                                gradient: "from-gray-500/20 to-gray-300/20",
                            },
                            {
                                icon: "🛠️",
                                title: "Custom Domain Linking",
                                description: "Deploy directly with your own domain and custom SSL certificates.",
                                status: "Q1 2024",
                                gradient: "from-gray-400/20 to-gray-600/20",
                            },
                            {
                                icon: "🧱",
                                title: "No-Code Backend Integration",
                                description: "Connect APIs, Firebase, Supabase, Airtable, or MongoDB with visual workflows.",
                                status: "Q2 2024",
                                gradient: "from-gray-300/20 to-gray-500/20",
                            },
                            {
                                icon: "👥",
                                title: "Team Collaboration",
                                description: "Real-time co-editing and project roles for seamless team workflows.",
                                status: "Q1 2024",
                                gradient: "from-gray-600/20 to-gray-400/20",
                            },
                            {
                                icon: "🧁",
                                title: "Theme Marketplace",
                                description: "Buy and sell ready-made templates and UI kits in our community marketplace.",
                                status: "Q3 2024",
                                gradient: "from-gray-200/20 to-gray-400/20",
                            },
                            {
                                icon: "📈",
                                title: "Analytics Plugin",
                                description: "Built-in user traffic insights dashboard with detailed performance metrics.",
                                status: "Q2 2024",
                                gradient: "from-gray-700/20 to-gray-500/20",
                            },
                            {
                                icon: "📤",
                                title: "Direct Deployment",
                                description: "Push live to Netlify, Vercel, or custom servers with one-click deployment.",
                                status: "Q1 2024",
                                gradient: "from-gray-100/20 to-gray-300/20",
                            },
                            {
                                icon: "🔒",
                                title: "Auth System Templates",
                                description:
                                    "Ready-to-use login, signup, OTP, and password reset flows with security best practices.",
                                status: "Q2 2024",
                                gradient: "from-gray-800/20 to-gray-600/20",
                            },
                        ].map((feature, index) => (
                            <ScrollRevealEnhanced key={index} delay={index * 0.1} direction="up" stagger={index * 0.05}>
                                <MagneticElement strength={0.08}>
                                    <motion.div
                                        className="group relative"
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <motion.div
                                            className="absolute -inset-0.5 bg-gradient-to-r from-white/5 to-gray-400/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        />
                                        <div
                                            className={`relative bg-gradient-to-br ${feature.gradient} border border-white/10 rounded-2xl p-6 backdrop-blur-sm group-hover:border-white/20 transition-all duration-300`}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="text-4xl mb-2">{feature.icon}</div>
                                                <Badge className="bg-white/10 text-gray-300 text-xs px-2 py-1">{feature.status}</Badge>
                                            </div>

                                            <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">Coming Soon</span>
                                                    <motion.div
                                                        className="w-2 h-2 bg-white rounded-full"
                                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </MagneticElement>
                            </ScrollRevealEnhanced>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <ScrollRevealEnhanced direction="scale">
                            <MagneticElement strength={0.1}>
                                <div className="bg-black/60 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
                                    <h3 className="text-2xl font-bold mb-4">Want early access?</h3>
                                    <p className="text-gray-400 mb-6">
                                        Join our beta program and be the first to try these exciting new features.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Button className="bg-white text-black hover:bg-gray-100 transition-colors">
                                            Join Beta Program
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-white/20 hover:bg-white/5 bg-transparent hover:text-white"
                                        >
                                            Get Notified
                                        </Button>
                                    </div>
                                </div>
                            </MagneticElement>
                        </ScrollRevealEnhanced>
                    </div>
                </div>
            </section>


        </>
    );
}