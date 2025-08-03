"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Code, 
  Layers, 
  Zap, 
  Sparkles, 
  Users, 
  BookOpen,
  FileText,
  Globe,
  Palette,
  Database,
  Shield,
  HelpCircle,
  Mail,
  Building,
  Newspaper
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ setActiveSection] = useState("home");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ["home", "features", "how-it-works", "testimonials", "integrations", "pricing", "faq"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDropdownToggle = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleMobileDropdownToggle = (name) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  const navLinks = [
    {
      name: "Products",
      icon: <Layers className="w-4 h-4 mr-2" />,
      children: [
        {
          name: "Website Builder",
          href: "#website-builder",
          icon: <Globe className="w-4 h-4" />,
          description: "Create stunning websites with drag & drop"
        },
        {
          name: "Dashboard Builder",
          href: "#dashboard-builder",
          icon: <Layers className="w-4 h-4" />,
          description: "Build powerful admin dashboards"
        },
        {
          name: "App Builder",
          href: "#app-builder",
          icon: <Zap className="w-4 h-4" />,
          description: "Develop mobile and web applications"
        },
        {
          name: "Design System",
          href: "#design-system",
          icon: <Palette className="w-4 h-4" />,
          description: "Consistent UI components and themes"
        }
      ]
    },
    {
      name: "Resources",
      icon: <BookOpen className="w-4 h-4 mr-2" />,
      children: [
        {
          name: "Documentation",
          href: "#docs",
          icon: <FileText className="w-4 h-4" />,
          description: "Complete guides and API reference"
        },
        {
          name: "Templates",
          href: "#templates",
          icon: <Sparkles className="w-4 h-4" />,
          description: "Pre-built templates to get started"
        },
        {
          name: "Community",
          href: "#community",
          icon: <Users className="w-4 h-4" />,
          description: "Connect with other builders"
        },
        {
          name: "Security",
          href: "#security",
          icon: <Shield className="w-4 h-4" />,
          description: "Enterprise-grade security features"
        }
      ]
    },
    {
      name: "Company",
      icon: <Building className="w-4 h-4 mr-2" />,
      children: [
        {
          name: "About Us",
          href: "#about",
          icon: <Building className="w-4 h-4" />,
          description: "Learn about our mission and team"
        },
        {
          name: "Blog",
          href: "#blog",
          icon: <Newspaper className="w-4 h-4" />,
          description: "Latest news and insights"
        },
        {
          name: "Careers",
          href: "#careers",
          icon: <Users className="w-4 h-4" />,
          description: "Join our growing team"
        }
      ]
    },
    {
      name: "Support",
      icon: <HelpCircle className="w-4 h-4 mr-2" />,
      children: [
        {
          name: "Help Center",
          href: "#help",
          icon: <HelpCircle className="w-4 h-4" />,
          description: "Find answers to common questions"
        },
        {
          name: "Contact Us",
          href: "#contact",
          icon: <Mail className="w-4 h-4" />,
          description: "Get in touch with our team"
        },
        {
          name: "API Reference",
          href: "#api",
          icon: <Database className="w-4 h-4" />,
          description: "Comprehensive API documentation"
        }
      ]
    }
  ];


  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } }
  };


  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20" 
          : "bg-transparent"
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center z-10">
            <motion.div
              className="text-xl sm:text-2xl font-bold flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text">S8</span>
              <span className="text-white">Builder</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative dropdown-container">
                <motion.button
                  className={`px-3 xl:px-4 py-2 text-gray-300 hover:text-white transition-colors flex items-center rounded-lg hover:bg-white/5 ${
                    activeDropdown === link.name ? "text-white bg-white/5" : ""
                  }`}
                  onClick={() => handleDropdownToggle(link.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.icon}
                  <span className="text-sm xl:text-base">{link.name}</span>
                  <ChevronDown 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === link.name ? "rotate-180" : ""
                    }`} 
                  />
                </motion.button>

                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      ref={(el) => dropdownRefs.current[link.name] = el}
                      className="absolute top-full left-0 mt-2 w-72 xl:w-80 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="p-2">
                        {link.children?.map((child, index) => (
                          <motion.div
                            key={child.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={child.href}
                              className="flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex-shrink-0 mr-3 mt-0.5 text-gray-400 group-hover:text-white transition-colors">
                                {child.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                                  {child.name}
                                </p>
                                {child.description && (
                                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                    {child.description}
                                  </p>
                                )}
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

         
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <ThemeToggle />
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-purple-500/20"
              >
                Sign up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
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
              className="lg:hidden mt-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
                {/* Mobile Dropdown Navigation */}
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="border-b border-white/5 last:border-b-0 pb-2 last:pb-0">
                      <button
                        className={`w-full text-left py-3 px-2 text-gray-300 hover:text-white transition-colors flex items-center justify-between rounded-lg hover:bg-white/5 ${
                          mobileDropdown === link.name ? "text-white bg-white/5" : ""
                        }`}
                        onClick={() => handleMobileDropdownToggle(link.name)}
                      >
                        <div className="flex items-center">
                          {link.icon}
                          <span className="font-medium">{link.name}</span>
                        </div>
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileDropdown === link.name ? "rotate-180" : ""
                          }`} 
                        />
                      </button>

                      <AnimatePresence>
                        {mobileDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-2 space-y-1"
                          >
                            {link.children?.map((child, index) => (
                              <motion.div
                                key={child.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  to={child.href}
                                  className="flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setMobileDropdown(null);
                                  }}
                                >
                                  <div className="flex-shrink-0 mr-3 mt-0.5 text-gray-400 group-hover:text-white transition-colors">
                                    {child.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                                      {child.name}
                                    </p>
                                    {child.description && (
                                      <p className="text-xs text-gray-400 mt-1">
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}

                {/* Simple Links in Mobile */}
          

                {/* Mobile Action Buttons */}
                <motion.div
                  className="flex flex-col space-y-2 pt-4 border-t border-white/10"
                  custom={navLinks.length }
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex justify-center py-2">
                    <ThemeToggle />
                  </div>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-purple-500/20">
                      Sign up
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}