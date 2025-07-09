

"use client"

import { Calendar } from "@/components/ui/calendar"
import '../../styles/animations.css';
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  Users,
  Zap,
  Globe,
  Palette,
  Smartphone,
  Settings,
  ArrowRight,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Eye,
  Sparkles,
  Rocket,
  Heart,
} from "lucide-react"
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import { Navigation } from "@/pages/LandingPage/Components/navigation"
import { Footer } from "@/pages/LandingPage/Components/Footer"
export default function HomePage() {
 const observerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animation helpers outside useEffect for better clarity
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute("data-target") || "0", 10);
    const duration = 2500;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    let startTime = null;

    const updateCounter = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      const current = Math.floor(easedProgress * target);
      element.textContent = current.toString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toString();
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const animateTypewriter = (element) => {
    const text = element.getAttribute("data-text") || element.textContent || "";
    element.textContent = "";
    element.style.borderRight = "2px solid #9333ea";

    let i = 0;
    const typeSpeed = 50;

    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i += 1;
        setTimeout(typeWriter, typeSpeed);
      } else {
        setTimeout(() => {
          element.style.borderRight = "2px solid transparent";
        }, 1000);
      }
    };

    setTimeout(typeWriter, 500);
  };

  const animateStaggeredChildren = (element) => {
    const children = Array.from(element.children);
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add("animate-in");
      }, index * 100);
    });
  };

  const animateMorph = (element) => {
    element.style.clipPath = "polygon(0 0, 0 0, 0 100%, 0% 100%)";
    setTimeout(() => {
      element.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
    }, 200);
  };

  useEffect(() => {
    // Page load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.classList.add("page-loaded");
    }, 100);

    // Mouse move handler for parallax
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    // Intersection Observer setup
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (!(element instanceof HTMLElement)) return;

            element.classList.add("animate-in");

            if (element.classList.contains("counter-animate")) {
              animateCounter(element);
            }

            if (element.classList.contains("typewriter-animate")) {
              animateTypewriter(element);
            }

            if (element.classList.contains("stagger-children")) {
              animateStaggeredChildren(element);
            }

            if (element.classList.contains("morph-animate")) {
              animateMorph(element);
            }
          }
        });
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all animated elements
    const elements = document.querySelectorAll(`
      .animate-on-scroll, .fade-up, .fade-down, .fade-left, .fade-right, 
      .zoom-in, .zoom-out, .counter-animate, .slide-up, .slide-down,
      .slide-left, .slide-right, .rotate-in, .flip-in, .bounce-in,
      .typewriter-animate, .stagger-children, .morph-animate, .reveal-up,
      .reveal-left, .reveal-right, .scale-bounce, .elastic-in
    `);
    elements.forEach((el) => observerRef.current?.observe(el));

    // Scroll handler for parallax and scroll tracking
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollY / docHeight;

      document.documentElement.style.setProperty("--scroll-y", scrollY.toString());
      document.documentElement.style.setProperty("--scroll-percent", scrollPercent.toString());

      // Parallax effects
      const parallaxElements = document.querySelectorAll(".parallax");
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed") || "0.5");
        const yPos = -(scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Mock templates data with enhanced images
  const featuredTemplates = [
    {
      id: 1,
      name: "Modern Portfolio",
      category: "Portfolio",
      image: "/placeholder.svg?height=300&width=400&text=Modern+Portfolio+Template&bg=6366f1&color=white",
      price: "$299",
      features: ["Responsive Design", "Dark Mode", "Contact Form"],
    },
    {
      id: 2,
      name: "Business Landing",
      category: "Business",
      image: "/placeholder.svg?height=300&width=400&text=Business+Landing+Page&bg=3b82f6&color=white",
      price: "$199",
      features: ["SEO Optimized", "Fast Loading", "Mobile First"],
    },
    {
      id: 3,
      name: "E-commerce Store",
      category: "E-commerce",
      image: "/placeholder.svg?height=300&width=400&text=E-commerce+Store+Template&bg=10b981&color=white",
      price: "$499",
      features: ["Payment Integration", "Inventory Management", "Admin Panel"],
    },
    {
      id: 4,
      name: "Creative Agency",
      category: "Agency",
      image: "/placeholder.svg?height=300&width=400&text=Creative+Agency+Website&bg=8b5cf6&color=white",
      price: "$399",
      features: ["Portfolio Gallery", "Team Section", "Blog"],
    },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-white transition-all duration-1000 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Enhanced Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 transition-all duration-300 ease-out shadow-lg"
          style={{
            width: "calc(var(--scroll-percent, 0) * 100%)",
            boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)",
          }}
        ></div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Link to="/booking">
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 pulse-glow"
          >
            <Rocket className="h-6 w-6" />
          </Button>
        </Link>
      </div>


      <Navigation />

      {/* Enhanced Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden scroll-snap-start">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob parallax"
            data-speed="0.3"
          ></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 parallax"
            data-speed="0.5"
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 parallax"
            data-speed="0.2"
          ></div>

          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60 floating"></div>
          <div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-pink-400 rounded-full opacity-40 floating"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-50 floating"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto text-center max-w-4xl relative">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 scale-bounce shimmer magnetic">
            <Sparkles className="w-4 h-4 mr-2" />
            Your On-Demand Creative Tech Studio
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight slide-up stagger-1">
            Need a website or brand in <span className="gradient-text">days, not months?</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed fade-up stagger-2">
            S8Builder offers premium digital services built fast, built right.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 stagger-children">
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3 pulse-glow btn-hover-effect ripple magnetic"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Book. Build. Launch.
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/templates">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3 bg-transparent hover:bg-purple-50 transition-all duration-300 ripple magnetic"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Templates
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 stagger-children">
            <div className="flex items-center space-x-2 transition-all hover:scale-110 duration-300 magnetic">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 transition-all hover:scale-110 duration-300 magnetic">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Professional Quality</span>
            </div>
            <div className="flex items-center space-x-2 transition-all hover:scale-110 duration-300 magnetic">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Affordable Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Templates Showcase Section */}
      <section className="py-20 px-14 bg-white scroll-snap-start">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 bounce-in shimmer magnetic">
              <Palette className="w-4 h-4 mr-2" />
              Built Over 20+ Templates
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 reveal-up">
              Choose From Our Premium Template Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up stagger-1">
              Professional, responsive templates designed to make your business stand out online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 stagger-children">
            {featuredTemplates.map((template, index) => (
              <Card
                key={template.id}
                className="group overflow-hidden border-2 hover:border-purple-200 transition-all duration-500 hover:shadow-lg card-3d magnetic"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white backdrop-blur-sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-purple-600 text-white transform group-hover:scale-110 transition-transform duration-300">
                    {template.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg group-hover:text-purple-600 transition-colors duration-300">
                      {template.name}
                    </CardTitle>
                    <span className="text-lg font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                      {template.price}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {template.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-gray-600 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center elastic-in">
            <Link to="/templates">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect ripple magnetic"
              >
                View All Templates
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Banner */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-100 to-pink-100 morph-animate">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto">
            <div className="mb-4 md:mb-0 slide-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Transform Your Digital Presence?</h3>
              <p className="text-gray-600">Join 500+ satisfied clients who chose S8Builder</p>
            </div>
            <div className="slide-left">
              <Link to="/booking">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect ripple magnetic">
                  <Heart className="mr-2 h-4 w-4" />
                  Start Your Project Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Available Services */}
      <section id="services" className="py-20 px-24 bg-white scroll-snap-start">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100 flip-in shimmer magnetic">
              <CheckCircle className="w-4 h-4 mr-2" />
              Available Now
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 typewriter-animate" data-text="What We Offer Today">
              What We Offer Today
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto reveal-up">
              Professional digital solutions ready to launch your business online
            </p>
          </div>

          <div className="grid md:grid-cols-2 px-14 lg:grid-cols-3 gap-8 stagger-children">
            {[
              {
                icon: Globe,
                title: "Landing Page Design",
                desc: "Perfect for personal brands, products, and events",
                color: "purple",
              },
              {
                icon: Globe,
                title: "Website Creation",
                desc: "Portfolio, Corporate, Blog, and custom websites",
                color: "blue",
              },
              {
                icon: Settings,
                title: "Service Booking System",
                desc: "Streamlined booking and project management",
                color: "green",
              },
              {
                icon: Palette,
                title: "Brand Design",
                desc: "Logo, Color Palette, Typography suggestions",
                color: "pink",
              },
              {
                icon: Smartphone,
                title: "Mobile Optimization",
                desc: "Responsive design for all devices",
                color: "orange",
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                desc: "Quick turnaround without compromising quality",
                color: "indigo",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="border-2 hover:border-purple-200 transition-all duration-500 hover:shadow-lg card-3d magnetic group"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 bg-${service.color}-100 rounded-lg flex items-center justify-center mb-4 floating group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className={`h-6 w-6 text-${service.color}-600`} />
                  </div>
                  <CardTitle className="group-hover:text-purple-600 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-16 px-14 bg-gradient-to-br from-gray-50 to-gray-100 scroll-snap-start">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100 rotate-in magnetic">
              <Rocket className="w-4 h-4 mr-2" />
              Our Impact
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 slide-up">The Numbers Speak For Themselves</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {[
              { target: 500, label: "Happy Clients", color: "purple" },
              { target: 750, label: "Projects Completed", color: "blue" },
              { target: 20, label: "Templates Available", color: "green" },
              { target: 98, label: "Satisfaction Rate %", color: "pink" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center card-3d magnetic group"
              >
                <div
                  className={`text-4xl font-bold text-${stat.color}-600 mb-2 counter-animate group-hover:scale-110 transition-transform duration-300`}
                  data-target={stat.target}
                >
                  0
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Target Audience */}
      <section className="py-20 px-4 bg-white scroll-snap-start">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 bounce-in shimmer magnetic">
              <Users className="w-4 h-4 mr-2" />
              Perfect For
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 reveal-left">Who We Serve</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up">
              Empowering diverse businesses and individuals to succeed online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {[
              {
                icon: Users,
                title: "Small Businesses",
                desc: "Establish your professional online presence",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Star,
                title: "Coaches & Creators",
                desc: "Build your personal brand and reach more clients",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Globe,
                title: "Event Organizers",
                desc: "Create stunning event pages that convert",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Zap,
                title: "Students & Startups",
                desc: "Scale your digital presence affordably",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((audience, index) => (
              <div key={index} className="text-center group magnetic">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${audience.gradient} rounded-full flex items-center justify-center mx-auto mb-4 floating group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                >
                  <audience.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {audience.title}
                </h3>
                <p className="text-gray-600">{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Vision Section */}
      <section
        id="about"
        className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden scroll-snap-start"
      >
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 parallax"
            data-speed="0.3"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob parallax"
            data-speed="0.4"
          ></div>
        </div>

        <div className="container mx-auto text-center max-w-4xl relative">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 scale-bounce shimmer magnetic">
            <Globe className="w-4 h-4 mr-2" />
            Our Vision
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 slide-up">Africa's Most Accessible Digital Agency</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8 fade-up stagger-1">
            To be Africa's most accessible digital agency-as-a-service, empowering everyone — regardless of tech skill —
            to launch online faster and smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center stagger-children">
            <Link to="/booking">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 pulse-glow btn-hover-effect ripple magnetic"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start Your Project
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-purple-50 transition-all duration-300 ripple bg-transparent magnetic"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white scroll-snap-start">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100 elastic-in shimmer magnetic">
              <Phone className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 reveal-right">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto morph-animate">
              Ready to start your project? Get in touch and let's build something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <Card className="p-8 slide-right shadow-lg hover:shadow-xl transition-shadow duration-300 card-3d">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4 stagger-children">
                  <div className="group">
                    <Label
                      htmlFor="firstName"
                      className="group-focus-within:text-purple-600 transition-colors duration-300"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300 hover:border-purple-300"
                    />
                  </div>
                  <div className="group">
                    <Label
                      htmlFor="lastName"
                      className="group-focus-within:text-purple-600 transition-colors duration-300"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300 hover:border-purple-300"
                    />
                  </div>
                </div>

                <div className="group fade-up">
                  <Label htmlFor="email" className="group-focus-within:text-purple-600 transition-colors duration-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300 hover:border-purple-300"
                  />
                </div>

                <div className="group fade-up stagger-1">
                  <Label htmlFor="phone" className="group-focus-within:text-purple-600 transition-colors duration-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300 hover:border-purple-300"
                  />
                </div>

                <div className="group fade-up stagger-2">
                  <Label
                    htmlFor="service"
                    className="group-focus-within:text-purple-600 transition-colors duration-300"
                  >
                    Service Needed
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300 hover:border-purple-300">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landing-page">Landing Page Design</SelectItem>
                      <SelectItem value="website">Full Website</SelectItem>
                      <SelectItem value="branding">Brand Design</SelectItem>
                      <SelectItem value="mobile">Mobile Optimization</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="group fade-up stagger-3">
                  <Label htmlFor="budget" className="group-focus-within:text-purple-600 transition-colors duration-300">
                    Budget Range
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1 focus:border-purple-600 focus:ring-purple-600 transition-all duration-300 hover:border-purple-300">
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1k">Under $1,000</SelectItem>
                      <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-plus">$10,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="group fade-up stagger-4">
                  <Label
                    htmlFor="message"
                    className="group-focus-within:text-purple-600 transition-colors duration-300"
                  >
                    Project Details
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    className="mt-1 min-h-[120px] focus:border-purple-600 focus:ring-purple-600 transition-all duration-300 hover:border-purple-300"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect ripple magnetic scale-bounce"
                  size="lg"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Enhanced Contact Info */}
            <div className="space-y-8 slide-left">
              <div className="fade-up">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>
                <p className="text-gray-600 mb-8">
                  We're here to help you build your digital presence. Reach out through any of these channels.
                </p>
              </div>

              <div className="space-y-6 stagger-children">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    value: "hello@s8builder.com",
                    desc: "We'll respond within 24 hours",
                    color: "purple",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    value: "+234 (0) 123 456 7890",
                    desc: "Mon-Fri 9AM-6PM WAT",
                    color: "blue",
                  },
                  {
                    icon: MapPin,
                    title: "Location",
                    value: "Lagos, Nigeria",
                    desc: "Serving clients globally",
                    color: "green",
                  },
                  {
                    icon: Clock,
                    title: "Response Time",
                    value: "Within 24 hours",
                    desc: "Usually much faster!",
                    color: "orange",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 group hover:bg-purple-50 p-3 rounded-lg transition-all duration-300 magnetic"
                  >
                    <div
                      className={`w-12 h-12 bg-${contact.color}-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 floating`}
                    >
                      <contact.icon className={`h-6 w-6 text-${contact.color}-600`} />
                    </div>
                    <div>
                      <h4
                        className={`font-semibold text-gray-900 group-hover:text-${contact.color}-600 transition-colors duration-300`}
                      >
                        {contact.title}
                      </h4>
                      <p className="text-gray-600">{contact.value}</p>
                      <p className="text-sm text-gray-500">{contact.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow duration-300 card-3d magnetic bounce-in">
                <h4 className="font-semibold text-gray-900 mb-2">Quick Start</h4>
                <p className="text-gray-600 mb-4">
                  Ready to get started immediately? Book a free 15-minute consultation call.
                </p>
                <Link to="/booking">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect ripple">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Free Consultation
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div
              className="absolute top-10 left-1/4 w-64 h-64 bg-white rounded-full opacity-10 animate-blob parallax"
              data-speed="0.2"
            ></div>
            <div
              className="absolute top-40 right-1/4 w-80 h-80 bg-white rounded-full opacity-10 animate-blob animation-delay-2000 parallax"
              data-speed="0.3"
            ></div>
            <div
              className="absolute bottom-10 left-1/3 w-72 h-72 bg-white rounded-full opacity-10 animate-blob animation-delay-4000 parallax"
              data-speed="0.4"
            ></div>
          </div>
        </div>

        <div className="container mx-auto text-center max-w-4xl relative">
          <h2 className="text-4xl font-bold mb-6 slide-up">Ready to Build Your Digital Presence?</h2>
          <p className="text-xl mb-8 opacity-90 fade-up stagger-1">
            Join hundreds of satisfied clients who've launched their online success with S8Builder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center stagger-children">
            <Link to="/booking">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100 pulse-glow btn-hover-effect ripple group magnetic"
              >
                <span className="relative z-10 flex items-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Book Your Project Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <Link to="/templates">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent transition-all duration-300 ripple magnetic"
              >
                <Eye className="mr-2 h-4 w-4" />
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
