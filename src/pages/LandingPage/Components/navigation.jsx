"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useState } from "react"


export function Navigation({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const location = useLocation();
const pathname = location.pathname;
const navItems = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/booking", label: "Book Service" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];


  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 animate-on-scroll">
      <div className="container mx-auto px-14 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center floating">
            <span className="text-white font-bold text-sm">S8</span>
          </div>
          <span className="text-xl font-bold text-gray-900">S8Builder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-gray-600 hover:text-gray-900 transition-colors relative group ${
                pathname === item.href ? "text-purple-600" : ""
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 pulse-glow btn-hover-effect">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="space-y-2 pt-4 border-t">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-4 border-t">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
