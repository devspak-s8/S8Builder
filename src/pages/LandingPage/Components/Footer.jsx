"use client";

import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="py-12 px-6 sm:px-10 md:px-14 bg-gray-900 text-white animate-on-scroll">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center floating">
                <span className="text-white font-bold text-sm">S8</span>
              </div>
              <span className="text-xl font-bold">S8Builder</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your on-demand creative tech studio for fast, beautiful, and affordable digital solutions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 relative inline-block">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-500"></span>
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {["Landing Pages", "Website Design", "Brand Design", "Mobile Optimization"].map((item, i) => (
                <li key={i} className="group flex items-center cursor-pointer hover:text-white transition">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-500"></span>
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="group flex items-center hover:text-white transition">
                <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link to="/">Home</Link>
              </li>
              <li className="group flex items-center hover:text-white transition">
                <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link to="/templates">Templates</Link>
              </li>
              <li className="group flex items-center hover:text-white transition">
                <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link to="/booking">Booking</Link>
              </li>
              <li className="group flex items-center hover:text-white transition">
                <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link to="/#contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 relative inline-block">
              Connect
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-500"></span>
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {["Twitter", "LinkedIn", "Instagram", "Email"].map((platform, i) => (
                <li key={i} className="group flex items-center cursor-pointer hover:text-white transition">
                  <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {platform}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} S8Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
