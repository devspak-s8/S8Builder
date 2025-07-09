"use client"

import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="py-12 px-14 bg-gray-900 text-white animate-on-scroll">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center floating">
                <span className="text-white font-bold text-sm">S8</span>
              </div>
              <span className="text-xl font-bold">S8Builder</span>
            </div>
            <p className="text-gray-400">
              Your on-demand creative tech studio for fast, beautiful, and affordable digital solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 relative inline-block">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-500"></span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                Landing Pages
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                Website Design
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                Brand Design
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                Mobile Optimization
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-500"></span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <Link href="/">
                  <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <Link to="/templates">
                  <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Templates
                </Link>
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <Link to="/booking">
                  <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Booking
                </Link>
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <Link to="/#contact">
                  <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 relative inline-block">
              Connect
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-500"></span>
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                Twitter
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                LinkedIn
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                Instagram
              </li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer hover:translate-x-1 transform transition-transform">
                <ChevronRight className="inline-block h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                Email
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} S8Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
