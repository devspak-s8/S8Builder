"use client"

import { useState } from "react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, Rocket } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 magnetic">
          <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">S8Builder</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="#hero"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 magnetic"
          >
            Home
          </Link>
          <Link
            to="#templates"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 magnetic"
          >
            Templates
          </Link>
          <Link
            to="#services"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 magnetic"
          >
            Services
          </Link>
          <Link
            to="#about"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 magnetic"
          >
            About
          </Link>
          <Link
            to="#contact"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 magnetic"
          >
            Contact
          </Link>
          <Link to="/booking">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 pulse-glow btn-hover-effect ripple magnetic"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Start Project
            </Button>
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="magnetic">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-4 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="#hero"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="#templates"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Templates
          </Link>
          <Link
            to="#services"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link
            to="#about"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="#contact"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link to="/booking">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 pulse-glow btn-hover-effect ripple"
              onClick={toggleMenu}
            >
              <Rocket className="mr-2 h-4 w-4" />
              Start Project
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
