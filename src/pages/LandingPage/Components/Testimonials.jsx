"use client"

import React from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ScrollRevealEnhanced } from "@/components/animations/scroll-reveal-enhanced"
import { StaggeredText } from "@/components/animations/staggered-text"
import { MagneticElement } from "@/components/animations/magnetic-element"
import {
  Layers,
  Sparkles,
} from "lucide-react"
export function Testimonials() {
    
  const testimonials = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "Frontend Developer",
      company: "TechCorp",
      avatar: "/diverse-group.png",
      content:
        "S8Builder has completely transformed our workflow. The drag-and-drop interface is intuitive, and the component library saves us countless hours.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jamie Chen",
      role: "UX Designer",
      company: "DesignHub",
      avatar: "/diverse-group.png",
      content:
        "As a designer, I love how S8Builder bridges the gap between design and development. I can quickly bring my ideas to life without writing complex code.",
      rating: 5,
    },
    {
      id: 3,
      name: "Taylor Williams",
      role: "Startup Founder",
      company: "LaunchPad",
      avatar: "/diverse-group.png",
      content:
        "S8Builder helped us launch our MVP in record time. The no-code approach allowed our small team to build a professional-looking product.",
      rating: 5,
    },
  ]
    return (
        <>



            {/* Enhanced Testimonials Section */}
            <section id="testimonials" className="py-24 md:py-32">
                <div className="container mx-auto px-6 lg:px-8">
                    <ScrollRevealEnhanced direction="scale">
                        <div className="text-center mb-20">
                            <Badge className="mb-6 bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10">
                                <Layers className="w-4 h-4 mr-2" /> {/* Changed from Users to Layers for consistency */}
                                Testimonials
                            </Badge>
                            <StaggeredText text="Loved by creators worldwide" className="text-4xl md:text-5xl font-bold mb-6" />
                            <ScrollRevealEnhanced direction="up" delay={0.3}>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    See what our users are saying about their experience with S8Builder
                                </p>
                            </ScrollRevealEnhanced>
                        </div>
                    </ScrollRevealEnhanced>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {testimonials.map((testimonial, index) => (
                            <ScrollRevealEnhanced key={testimonial.id} delay={index * 0.2} direction="up" stagger={index * 0.05}>
                                <MagneticElement strength={0.08}>
                                    <motion.div
                                        className="group relative"
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <motion.div
                                            className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        />
                                        <div className="relative bg-black/40 border border-white/10 rounded-2xl p-8 h-full backdrop-blur-sm">
                                            <motion.div
                                                className="h-8 w-8 text-white/20 mb-6"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <Layers className="h-8 w-8" /> {/* Changed from Quote to Layers for consistency */}
                                            </motion.div>
                                            <p className="text-gray-100 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black font-bold mr-4">
                                                        {testimonial.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-100">{testimonial.name}</h4>
                                                        <p className="text-sm text-gray-400">
                                                            {testimonial.role}, {testimonial.company}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ scale: 0 }}
                                                            whileInView={{ scale: 1 }}
                                                            transition={{ delay: i * 0.1 + 0.3 }}
                                                            viewport={{ once: true }}
                                                        >
                                                            <Sparkles className="h-4 w-4 text-yellow-400 fill-current" />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </MagneticElement>
                            </ScrollRevealEnhanced>
                        ))}
                    </div>

                    <div className="text-center">
                        <ScrollRevealEnhanced direction="scale">
                            <p className="text-gray-400 mb-6">Join thousands of satisfied customers</p>
                            <div className="flex items-center justify-center space-x-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-400 border-2 border-black flex items-center justify-center text-black text-sm font-bold"
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            {i}
                                        </motion.div>
                                    ))}
                                </div>
                                <span className="text-gray-300 ml-4">+10,000 happy users</span>
                            </div>
                        </ScrollRevealEnhanced>
                    </div>
                </div>
            </section></>
    );
}