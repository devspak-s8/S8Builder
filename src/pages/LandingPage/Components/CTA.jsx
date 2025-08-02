"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import { ScrollRevealEnhanced } from "@/components/animations/scroll-reveal-enhanced";

import { StaggeredText } from "@/components/animations/staggered-text";
import { MagneticElement } from "@/components/animations/magnetic-element";

import { ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";
export function CTA() {
  return (
    <>
      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <ScrollRevealEnhanced direction="scale">
            <MagneticElement strength={0.05}>
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-white/5 to-black rounded-2xl p-12 md:p-16 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 text-center">
                  <StaggeredText
                    text="Ready to start building?"
                    className="text-4xl md:text-5xl font-bold mb-6"
                  />
                  <ScrollRevealEnhanced direction="up" delay={0.3}>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                      Join thousands of developers, designers, and creators who
                      are building the next generation of web experiences with
                      S8Builder.
                    </p>
                  </ScrollRevealEnhanced>
                  <ScrollRevealEnhanced direction="up" delay={0.4}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <MagneticElement strength={0.2}>
                        <Link to="/signup">
                          <Button
                            size="lg"
                            className="bg-white text-black hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 px-8 py-4 text-lg transform hover:scale-105"
                          >
                            Get started for free
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                      </MagneticElement>
                      <MagneticElement strength={0.15}>
                        <Link to="/login">
                          <Button
                            size="lg"
                            variant="outline"
                            className="border-white/20 hover:bg-white/5 bg-transparent px-8 py-4 text-lg transform hover:scale-105"
                          >
                            <Layers className="mr-2 h-5 w-5" />{" "}
                            {/* Changed from Play to Layers for consistency */}
                            Watch Demo
                          </Button>
                        </Link>
                      </MagneticElement>
                    </div>
                  </ScrollRevealEnhanced>
                </div>
              </div>
            </MagneticElement>
          </ScrollRevealEnhanced>
        </div>
      </section>
    </>
  );
}
