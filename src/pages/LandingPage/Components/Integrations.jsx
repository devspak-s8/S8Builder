"use client";

import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ScrollRevealEnhanced } from "@/components/animations/scroll-reveal-enhanced";
import { StaggeredText } from "@/components/animations/staggered-text";
import { MagneticElement } from "@/components/animations/magnetic-element";
import { Code, Zap, Sparkles, CheckCircle } from "lucide-react";
export function Integrations() {
  const integrationLogos = [
    { name: "Vercel", src: "/vercel-logo.png" },
    { name: "Netlify", src: "/netlify-logo.png" },
    { name: "GitHub", src: "/github-logo.png" },
    { name: "Stripe", src: "/stripe-logo.png" },
    { name: "Supabase", src: "/supabase-logo.png" },
    { name: "Firebase", src: "/firebase-logo.png" },
    { name: "AWS", src: "/aws-logo.png" },
    { name: "MongoDB", src: "/mongodb-logo.png" },
  ];

  return (
    <>
      {/* Enhanced Integrations Section */}
      <section
        id="integrations"
        className="py-24 md:py-32 bg-gradient-to-br from-black/90 to-black/80"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <ScrollRevealEnhanced direction="scale">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10">
                <Code className="w-4 h-4 mr-2" />{" "}
                {/* Changed from Database to Code for consistency */}
                Integrations
              </Badge>
              <StaggeredText
                text="Seamless connections"
                className="text-4xl md:text-5xl font-bold mb-6"
              />
              <ScrollRevealEnhanced direction="up" delay={0.3}>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Connect with your favorite tools and services without any
                  hassle. Build powerful integrations in minutes.
                </p>
              </ScrollRevealEnhanced>
            </div>
          </ScrollRevealEnhanced>

          <ScrollRevealEnhanced direction="fade">
            <div className="mb-20">
              {/* MarqueeLogos component is not provided in the current context, assuming it exists */}
              {/* <MarqueeLogos logos={integrationLogos} direction="left" speed="normal" /> */}
              {/* Placeholder for MarqueeLogos if it's not available */}
              <div className="flex justify-center items-center flex-wrap gap-8 py-8 border-y border-white/10">
                {integrationLogos.map((logo, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 mx-4 grayscale hover:grayscale-0 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <img
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.name}
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain opacity-70 hover:opacity-100"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollRevealEnhanced>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8 text-white" />,
                title: "Database Connections",
                description:
                  "Connect to popular databases like Supabase, Firebase, MongoDB, and more with visual configuration.",
                features: [
                  "Visual Query Builder",
                  "Real-time Sync",
                  "Auto-scaling",
                ],
                color: "from-gray-300 to-gray-500",
              },
              {
                icon: <Sparkles className="h-8 w-8 text-white" />,
                title: "AI Integration",
                description:
                  "Leverage AI capabilities with OpenAI, Hugging Face, and other AI services for smart features.",
                features: [
                  "Natural Language Processing",
                  "Image Recognition",
                  "Smart Automation",
                ],
                color: "from-gray-400 to-gray-600",
              },
              {
                icon: <Zap className="h-8 w-8 text-white" />,
                title: "Payment Processing",
                description:
                  "Integrate payment gateways like Stripe and PayPal to handle transactions securely.",
                features: [
                  "Secure Payments",
                  "Multi-currency",
                  "Subscription Management",
                ],
                color: "from-gray-200 to-gray-400",
              },
            ].map((integration, index) => (
              <ScrollRevealEnhanced
                key={index}
                delay={index * 0.2}
                direction="up"
                stagger={index * 0.05}
              >
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
                    <div className="relative bg-black/60 border border-white/10 rounded-2xl p-8 h-full backdrop-blur-sm">
                      <motion.div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {integration.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                        {integration.title}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {integration.description}
                      </p>
                      <ul className="space-y-2">
                        {integration.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-center text-sm text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="h-4 w-4 text-white mr-2 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </MagneticElement>
              </ScrollRevealEnhanced>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
