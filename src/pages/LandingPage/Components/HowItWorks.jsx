"use client"

import React from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollRevealEnhanced } from "@/components/animations/scroll-reveal-enhanced"
import { StaggeredText } from "@/components/animations/staggered-text"
import { MagneticElement } from "@/components/animations/magnetic-element"

import { ParallaxSection } from "@/components/animations/parallax-section";
import {
    ArrowRight,
    Rocket,
    MousePointer,
    LayoutTemplate,
    Cpu,
    Clock,
} from "lucide-react"
import { Link } from "react-router-dom"


export function HowItWorks() {
    return (
        <>

            {/* Enhanced How It Works Section */}
            <section
                id="how-it-works"
                className="py-24 md:py-32 bg-gradient-to-br from-black/90 to-black/80 relative overflow-hidden"
            >
                <ParallaxSection speed={-0.2}>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                </ParallaxSection>

                <ParallaxSection speed={0.1}>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
                </ParallaxSection>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <ScrollRevealEnhanced direction="scale">
                        <div className="text-center mb-20">
                            <Badge className="mb-6 bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10">
                                <Clock className="w-4 h-4 mr-2" />
                                Simple Process
                            </Badge>
                            <StaggeredText text="How S8Builder works" className="text-4xl md:text-5xl font-bold mb-6" />
                            <ScrollRevealEnhanced direction="up" delay={0.3}>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    From concept to deployment in minutes, not days. Our streamlined process gets you online faster.
                                </p>
                            </ScrollRevealEnhanced>
                        </div>
                    </ScrollRevealEnhanced>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {[
                            {
                                number: 1,
                                title: "Choose a Template",
                                description: "Start with a pre-built template or begin from scratch with a blank canvas.",
                                icon: <LayoutTemplate className="h-8 w-8" />,
                                color: "from-gray-400 to-gray-600",
                            },
                            {
                                number: 2,
                                title: "Customize Design",
                                description: "Drag and drop components to build your layout and customize every detail.",
                                icon: <MousePointer className="h-8 w-8" />,
                                color: "from-gray-300 to-gray-500",
                            },
                            {
                                number: 3,
                                title: "Add Functionality",
                                description: "Connect APIs, add interactions, and set up your backend without coding.",
                                icon: <Cpu className="h-8 w-8" />,
                                color: "from-gray-200 to-gray-400",
                            },
                            {
                                number: 4,
                                title: "Deploy & Share",
                                description: "Publish your project with one click and share it with the world.",
                                icon: <Rocket className="h-8 w-8" />,
                                color: "from-gray-600 to-gray-800",
                            },
                        ].map((step, index) => (
                            <ScrollRevealEnhanced key={index} delay={index * 0.2} direction="up" stagger={index * 0.1}>
                                <MagneticElement strength={0.1}>
                                    <motion.div
                                        className="relative group"
                                        whileHover={{
                                            y: -15,
                                            rotateY: 5,
                                            scale: 1.02,
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <motion.div
                                            className="absolute -inset-1 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        />
                                        <div className="relative bg-black/60 border border-white/10 rounded-2xl p-8 h-full backdrop-blur-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <motion.div
                                                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}
                                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    {step.icon}
                                                </motion.div>
                                                <motion.div
                                                    className="text-6xl font-bold text-white/5"
                                                    animate={{
                                                        scale: [1, 1.05, 1],
                                                        opacity: [0.05, 0.1, 0.05],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Number.POSITIVE_INFINITY,
                                                        delay: index * 0.5,
                                                    }}
                                                >
                                                    {step.number}
                                                </motion.div>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                        </div>
                                    </motion.div>
                                </MagneticElement>
                            </ScrollRevealEnhanced>
                        ))}
                    </div>

                    <div className="text-center">
                        <ScrollRevealEnhanced delay={0.8} direction="scale">
                            <MagneticElement strength={0.2}>
                                <Link to="/signup">
                                    <Button
                                        size="lg"
                                        className="bg-white text-black hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-white/10 px-8 py-4 text-lg transform hover:scale-105"
                                    >
                                        Start building now
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </MagneticElement>
                        </ScrollRevealEnhanced>
                    </div>
                </div>
            </section>
        </>
    )
}