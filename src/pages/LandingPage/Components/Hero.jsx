"use client";

import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useTransform, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollRevealEnhanced } from "@/components/animations/scroll-reveal-enhanced";
import { ParallaxSection } from "@/components/animations/parallax-section";
import { StaggeredText } from "@/components/animations/staggered-text";
import { MagneticElement } from "@/components/animations/magnetic-element";
import { ScrollTriggeredCounter } from "@/components/animations/scroll-triggered-counter";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export function Hero() {

    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    return (
        <>
            {/* Enhanced Hero Section */}
            <section
                id="home"
                className="relative px-12 py-24 md:py-32 overflow-hidden"
            >
                {/* Animated Background Elements with Parallax */}
                <ParallaxSection speed={-0.3}>
                    <motion.div
                        className="hero-gradient absolute inset-0 z-0"
                        style={{ opacity, scale }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    ></motion.div>
                </ParallaxSection>

                <ParallaxSection speed={-0.1}>
                    <div className="grid-background absolute inset-0 z-0 animate-grid-fade"></div>
                </ParallaxSection>

                {/* Enhanced Floating Elements with Parallax */}
                <ParallaxSection speed={0.2}>
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-400 rounded-full opacity-40"
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0.4, 0.6, 0.4],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                </ParallaxSection>

                <ParallaxSection speed={0.4}>
                    <motion.div
                        className="absolute top-1/3 right-1/4 w-3 h-3 bg-gray-300 rounded-full opacity-30"
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.5, 0.3],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />
                </ParallaxSection>

                <ParallaxSection speed={0.1}>
                    <motion.div
                        className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-gray-500 rounded-full opacity-40"
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.4, 0.6, 0.4],
                            x: [0, 10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                    />
                </ParallaxSection>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left Content with Enhanced Animations */}
                        <motion.div
                            className="flex-1 text-left max-w-2xl"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <ScrollRevealEnhanced justify="start" direction="scale" delay={0}>
                                <Badge className="mb-6 bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10">
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                        }}
                                        className="mr-2"
                                    >
                                        ✨
                                    </motion.span>
                                    Build Without Limits
                                </Badge>
                            </ScrollRevealEnhanced>
                            <StaggeredText
                                text="Create stunning digital experiences"
                                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
                                delay={0.1}
                            />
                            <ScrollRevealEnhanced direction="up" delay={0.3} justify="start">
                                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl">
                                    S8Builder empowers you to design and deploy high-performance
                                    websites, dashboards, and apps without writing backend code.
                                    Launch faster, scale smarter.
                                </p>
                            </ScrollRevealEnhanced>

                            <ScrollRevealEnhanced direction="up" delay={0.4} justify="start">
                                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                    <MagneticElement strength={0.2}>
                                        <Link to="/signup">
                                            <Button
                                                size="lg"
                                                className="bg-white text-black hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-white/10 group transform hover:scale-105"
                                            >
                                                Start building for free
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </Button>
                                        </Link>
                                    </MagneticElement>

                                    <MagneticElement strength={0.15}>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="border-white/20 hover:bg-white/5 bg-transparent group transform hover:scale-105 transition-all duration-300"
                                        >
                                            <motion.span
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    delay: 1,
                                                }}
                                                className="mr-2"
                                            >
                                                👀
                                            </motion.span>
                                            Watch demo
                                        </Button>
                                    </MagneticElement>
                                </div>
                            </ScrollRevealEnhanced>

                            {/* Enhanced Stats Indicators */}
                            <motion.div
                                className="flex justify-between items-center gap-12 mt-4 flex-wrap md:flex-nowrap"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                {[
                                    { label: "Active Users", value: "10K+" },
                                    { label: "Projects Created", value: "50K+" },
                                    { label: "Satisfaction Rate", value: "99%" },
                                ].map((stat, index) => (
                                    <ScrollRevealEnhanced
                                        key={index}
                                        direction="scale"
                                        delay={0.6 + index * 0.1}
                                        stagger={index * 0.1}
                                    >
                                        <motion.div
                                            className="flex flex-col items-start md:items-center"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 20,
                                            }}
                                        >
                                            <span className="text-white font-bold text-2xl">
                                                {stat.value}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {stat.label}
                                            </span>
                                        </motion.div>
                                    </ScrollRevealEnhanced>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Hero Image with Enhanced Parallax */}
                        <ParallaxSection speed={-0.2} className="flex-1 relative">
                            <ScrollRevealEnhanced direction="scale" delay={0.4}>
                                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-lg blur-lg opacity-75 animate-pulse-glow"></div>
                                <motion.div
                                    className="relative bg-[#000000] border border-white/10 rounded-lg overflow-hidden"
                                    whileHover={{
                                        y: -10,
                                        rotateX: 5,
                                        rotateY: 5,
                                        boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.15)",
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <img
                                        src="/dark-web-builder.png"
                                        width={1200}
                                        height={600}
                                        alt="S8Builder Interface"
                                        className="w-full h-auto"
                                    />

                                    {/* Enhanced Floating UI Elements */}
                                    <motion.div
                                        className="absolute top-5 right-5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex items-center"
                                        animate={{
                                            y: [0, -8, 0],
                                            rotate: [0, 2, 0],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <span className="text-xs text-white">✓ Live Preview</span>
                                    </motion.div>

                                    <motion.div
                                        className="absolute bottom-5 left-5 bg-gray-400/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex items-center"
                                        animate={{
                                            y: [0, -8, 0],
                                            rotate: [0, -2, 0],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                            delay: 1,
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <span className="text-xs text-white">
                                            ⚡ No-code Builder
                                        </span>
                                    </motion.div>
                                </motion.div>
                            </ScrollRevealEnhanced>
                        </ParallaxSection>
                    </div>
                </div>

                {/* Enhanced Scroll Indicator */}
                <motion.div
                    className="scroll-indicator hidden md:block"
                    animate={{
                        y: [0, 10, 0],
                        opacity: [0.7, 0.3, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.2 }}
                ></motion.div>
            </section>

            {/* Enhanced Stats Section */}
            <section className="py-20 px-12 bg-black/20 border-y border-white/10 relative overflow-hidden">
                <ParallaxSection speed={0.1}>
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: "Active Users", value: 10000, suffix: "+" },
                                { label: "Projects Created", value: 50000, suffix: "+" },
                                { label: "Components", value: 500, suffix: "+" },
                                { label: "Deployments", value: 100000, suffix: "+" },
                            ].map((stat, index) => (
                                <ScrollRevealEnhanced key={index} delay={index * 0.1} direction="scale">
                                    <MagneticElement strength={0.1}>
                                        <motion.div
                                            className="text-center"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                                <ScrollTriggeredCounter end={stat.value} suffix={stat.suffix} />
                                            </h3>
                                            <p className="text-gray-400">{stat.label}</p>
                                        </motion.div>
                                    </MagneticElement>
                                </ScrollRevealEnhanced>
                            ))}
                        </div>
                    </div>
                </ParallaxSection>
            </section>

        </>
    );
}
