"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Code, Layers, Zap, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section based on scroll position
      const sections = ["home", "features", "how-it-works", "testimonials", "integrations", "pricing", "faq"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { name: "Features", href: "#features", icon: <Layers className="w-4 h-4 mr-2" />, id: "features" },
    { name: "How It Works", href: "#how-it-works", icon: <Code className="w-4 h-4 mr-2" />, id: "how-it-works" },
    { name: "Testimonials", href: "#testimonials", icon: <Users className="w-4 h-4 mr-2" />, id: "testimonials" },
    { name: "Integrations", href: "#integrations", icon: <Sparkles className="w-4 h-4 mr-2" />, id: "integrations" },
    ]

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};


  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-white/10" : ""
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.div
            className="text-2xl font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">S8</span>
            <span className="text-white">Builder</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-gray-300 hover:text-[#8B5CF6] transition-colors flex items-center relative ${
                activeSection === link.id ? "text-[#8B5CF6]" : ""
              }`}
              onClick={() => setActiveSection(link.id)}
            >
              {link.icon}
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9]"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-[#8B5CF6] hover:bg-white/5 transition-all duration-300"
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20">
                Sign up
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-[#E2E8F0]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-white/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} custom={i} variants={menuItemVariants} initial="hidden" animate="visible">
                  <Link
                    href={link.href}
                    className={`text-gray-300 hover:text-[#8B5CF6] transition-colors py-2 flex items-center ${
                      activeSection === link.id ? "text-[#8B5CF6]" : ""
                    }`}
                    onClick={() => {
                      setIsOpen(false)
                      setActiveSection(link.id)
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-white/10">
                <div className="flex justify-center py-2">
                  <ThemeToggle />
                </div>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-300 hover:text-[#8B5CF6] hover:bg-white/5 transition-all duration-300"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
