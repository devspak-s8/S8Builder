"use client"

import React from "react"
// eslint-disable-next-line no-unused-vars
import { PageTransition } from "@/components/animations/page-transition"
import { Hero } from "../LandingPage/Components/Hero"
import { Features } from "./Components/Features"
import { HowItWorks } from "./Components/HowItWorks"
import { Testimonials } from "./Components/Testimonials"
import { Integrations } from "./Components/Integrations"
import { FAQ } from "./Components/FAQ"
import { CTA } from "./Components/CTA"
import { Navbar } from "../LandingPage/Components/navbar"
import { BackgroundAnimation } from "@/components/animations/background-animation"
import { ScrollProgress } from "@/components/animations/scroll-progress"
import { FloatingElements } from "@/components/animations/floating-elements"
import { MorphingBackground } from "@/components/animations/morphing-background"
import { Link } from "react-router-dom"
export default function LandingPage({ children }) {

  return (
    <>
      <ScrollProgress />

      {/* fixed/global UI elements */}
      <Navbar />
      <BackgroundAnimation />
      <FloatingElements />
      <MorphingBackground />

      {/* main page content */}
      <PageTransition>

        <main className="flex flex-col min-h-screen pt-16 text-center">

          
          <Hero />
          <Features />
          <HowItWorks />
          <Testimonials />
          <Integrations />
          <FAQ />
          <CTA />

          {/* Footer */}
          <footer className="py-16 border-t border-white/10">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-8 md:mb-0">
                  <div className="text-2xl font-bold flex items-center mb-4">
                    <span className="gradient-text">S8</span>
                    <span className="text-white">Builder</span>
                  </div>
                  <p className="text-sm text-gray-400">© {new Date().getFullYear()} S8Globals. All rights reserved.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                  <div>
                    <h4 className="font-medium mb-4 text-gray-100">Product</h4>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                        >
                          Features
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                        >
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                        >
                          Roadmap
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4 text-gray-100">Resources</h4>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                        >
                          Documentation
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                        >
                          Tutorials
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                        >
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4 text-gray-100">Company</h4>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                        >
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </PageTransition>
      {children}
    </>
  )
}
