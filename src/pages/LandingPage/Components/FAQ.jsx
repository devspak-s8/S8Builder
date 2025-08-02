"use client"

import React from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollRevealEnhanced } from "@/components/animations/scroll-reveal-enhanced"
import { StaggeredText } from "@/components/animations/staggered-text"
import { MagneticElement } from "@/components/animations/magnetic-element"
import {
    CheckCircle,
    Minus,
    Plus,
} from "lucide-react"
import { Link } from "react-router-dom"

export function FAQ() {
    const [openFAQ, setOpenFAQ] = React.useState(null);

    const faqs = [
        {
            question: "What is S8Builder?",
            answer:
                "S8Builder is a sleek, modern web and app-building platform developed under the S8Globals ecosystem. It empowers users to design and deploy high-performance websites, dashboards, and apps without writing backend code.",
        },
        {
            question: "Do I need coding experience to use S8Builder?",
            answer:
                "No, S8Builder is designed to be accessible to users with varying levels of technical expertise. While coding knowledge can be helpful, our drag-and-drop interface and component library make it possible to build sophisticated web applications without writing code.",
        },
        {
            question: "Can I deploy my projects to my own domain?",
            answer:
                "Yes, S8Builder supports custom domain deployment. You can connect your own domain to your projects and deploy them with a single click. We handle all the technical aspects of deployment and hosting.",
        },
        {
            question: "Is there a limit to how many projects I can create?",
            answer:
                "The number of projects you can create depends on your subscription plan. Free accounts have a limit on the number of projects, while paid plans offer increased or unlimited project creation.",
        },
        {
            question: "How does the pricing work?",
            answer:
                "S8Builder offers tiered pricing plans starting with a free tier for personal use. Paid plans include additional features, higher usage limits, and priority support. You can view our detailed pricing on the pricing section.",
        },
        {
            question: "Can I collaborate with my team on projects?",
            answer:
                "Team collaboration features are coming soon to S8Builder. You'll be able to work together with your team in real-time with comments, version history, and role management.",
        },
    ]
    return (
        <>
            {/* Enhanced FAQ Section */}
            <section id="faq" className="py-24 md:py-32 bg-gradient-to-br from-black/90 to-black/80">
                <div className="container mx-auto px-6 lg:px-8">
                    <ScrollRevealEnhanced direction="scale">
                        <div className="text-center mb-20">
                            <Badge className="mb-6 bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                FAQ
                            </Badge>
                            <StaggeredText text="Frequently asked questions" className="text-4xl md:text-5xl font-bold mb-6" />
                            <ScrollRevealEnhanced direction="up" delay={0.3}>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    Everything you need to know about S8Builder. Can't find what you're looking for? Contact our
                                    support team.
                                </p>
                            </ScrollRevealEnhanced>
                        </div>
                    </ScrollRevealEnhanced>

                    <div className="max-w-4xl mx-auto">
                        {faqs.map((faq, index) => (
                            <ScrollRevealEnhanced key={index} delay={index * 0.1} direction="up" stagger={index * 0.05}>
                                <MagneticElement strength={0.05}>
                                    <motion.div
                                        className="mb-4"
                                        whileHover={{ y: -5 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <div
                                            className={`border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm ${openFAQ === index ? "bg-black/60" : "bg-black/40"
                                                }`}
                                        >
                                            <button
                                                className="w-full p-8 text-left flex justify-between items-center focus:outline-none group"
                                                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                            >
                                                <h3 className="text-xl font-semibold text-gray-100 group-hover:text-white transition-colors duration-300">
                                                    {faq.question}
                                                </h3>
                                                <motion.div
                                                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={`flex items-center justify-center w-8 h-8 rounded-full ${openFAQ === index ? "bg-white/20" : "bg-black/60"
                                                        }`}
                                                >
                                                    {openFAQ === index ? (
                                                        <Minus className="w-4 h-4 text-white" />
                                                    ) : (
                                                        <Plus className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </motion.div>
                                            </button>
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    height: openFAQ === index ? "auto" : 0,
                                                    opacity: openFAQ === index ? 1 : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-8 pb-8 text-gray-300 leading-relaxed">{faq.answer}</div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </MagneticElement>
                            </ScrollRevealEnhanced>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <ScrollRevealEnhanced direction="scale">
                            <MagneticElement strength={0.1}>
                                <div className="bg-black/60 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm text-center">
                                    <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                                    <p className="text-gray-400 mb-6">
                                        Our support team is here to help you get the most out of S8Builder.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <Link to="/contact">
                                            <Button className="bg-white text-black hover:bg-gray-100 transition-colors">
                                                Contact Support
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            className="border-white/20 hover:bg-white/5 bg-transparent hover:text-white"
                                        >
                                            View Documentation
                                        </Button>
                                    </div>
                                </div>
                            </MagneticElement>
                        </ScrollRevealEnhanced>
                    </div>
                </div>
            </section></>
    );

}