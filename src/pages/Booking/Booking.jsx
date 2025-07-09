"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Calendar,
    Clock,
    CheckCircle,
    Globe,
    Palette,
    Smartphone,
    Settings,
    Zap,
    Star,
    Users,
    Phone,
    Mail,
    MapPin,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
// eslint-disable-next-line no-unused-vars
import { useLocation } from "react-router-dom";
import { Navigation } from "@/pages/LandingPage/Components/navigation"
import { Footer } from "@/pages/LandingPage/Components/Footer"

export default function BookingPage() {
 const observerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedService, setSelectedService] = useState("")
    const [selectedPackage, setSelectedPackage] = useState("")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
        preferredDate: "",
        preferredTime: "",
        additionalServices: [],
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true)
        }, 100)

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in")
                    }
                })
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -100px 0px",
            },
        )

        const elements = document.querySelectorAll(".animate-on-scroll, .fade-up, .fade-left, .fade-right, .zoom-in")
        elements.forEach((el) => observerRef.current?.observe(el))

        return () => {
            clearTimeout(timer)
            observerRef.current?.disconnect()
        }
    }, [])

    const services = [
        {
            id: "landing-page",
            name: "Landing Page Design",
            icon: Globe,
            description: "Perfect for personal brands, products, and events",
            price: "From $199",
            features: ["Responsive Design", "SEO Optimized", "Contact Form", "Fast Loading"],
            timeline: "3-5 days",
        },
        {
            id: "website",
            name: "Full Website",
            icon: Globe,
            description: "Complete website solution for your business",
            price: "From $499",
            features: ["Multi-page Design", "CMS Integration", "Mobile Optimized", "Analytics Setup"],
            timeline: "7-14 days",
        },
        {
            id: "ecommerce",
            name: "E-commerce Store",
            icon: Settings,
            description: "Online store with payment integration",
            price: "From $799",
            features: ["Payment Gateway", "Inventory Management", "Admin Panel", "Security Features"],
            timeline: "14-21 days",
        },
        {
            id: "branding",
            name: "Brand Design",
            icon: Palette,
            description: "Complete brand identity package",
            price: "From $299",
            features: ["Logo Design", "Color Palette", "Typography", "Brand Guidelines"],
            timeline: "5-7 days",
        },
        {
            id: "mobile",
            name: "Mobile App Design",
            icon: Smartphone,
            description: "Mobile app UI/UX design",
            price: "From $599",
            features: ["UI/UX Design", "Prototype", "Design System", "Developer Handoff"],
            timeline: "10-14 days",
        },
        {
            id: "custom",
            name: "Custom Solution",
            icon: Zap,
            description: "Tailored solution for your specific needs",
            price: "Quote on request",
            features: ["Custom Development", "Consultation", "Support", "Maintenance"],
            timeline: "Varies",
        },
    ]

    const packages = [
        {
            id: "starter",
            name: "Starter Package",
            price: "$199",
            description: "Perfect for small projects and personal brands",
            features: ["1 Landing Page", "Responsive Design", "Basic SEO", "Contact Form", "2 Revisions", "7-day delivery"],
            popular: false,
        },
        {
            id: "professional",
            name: "Professional Package",
            price: "$499",
            description: "Ideal for growing businesses and startups",
            features: [
                "Up to 5 Pages",
                "Custom Design",
                "Advanced SEO",
                "CMS Integration",
                "5 Revisions",
                "14-day delivery",
                "3 months support",
            ],
            popular: true,
        },
        {
            id: "enterprise",
            name: "Enterprise Package",
            price: "$999",
            description: "Complete solution for established businesses",
            features: [
                "Unlimited Pages",
                "Custom Development",
                "E-commerce Ready",
                "Advanced Features",
                "Unlimited Revisions",
                "21-day delivery",
                "6 months support",
                "Priority Support",
            ],
            popular: false,
        },
    ]

    const additionalServices = [
        { id: "seo", name: "SEO Optimization", price: "+$99" },
        { id: "analytics", name: "Analytics Setup", price: "+$49" },
        { id: "maintenance", name: "Monthly Maintenance", price: "+$99/month" },
        { id: "hosting", name: "Hosting Setup", price: "+$29" },
        { id: "ssl", name: "SSL Certificate", price: "+$19" },
        { id: "backup", name: "Automated Backups", price: "+$39" },
    ]

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAdditionalServiceChange = (serviceId, checked) => {
        setFormData((prev) => ({
            ...prev,
            additionalServices: checked
                ? [...prev.additionalServices, serviceId]
                : prev.additionalServices.filter((id) => id !== serviceId),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Booking request submitted! We'll contact you within 24 hours.");
    };


    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-slate-50 to-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >

            <Navigation />

            {/* Hero Section */}
            <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating"></div>
                    <div
                        className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>

                <div className="container mx-auto text-center max-w-4xl relative">
                    <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 zoom-in shimmer">
                        📅 Book Your Service
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight fade-up">
                        Let's Build Your{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Digital Presence
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed fade-up" style={{ transitionDelay: "0.2s" }}>
                        Choose your service, select a package, and schedule a consultation. We'll bring your vision to life in days,
                        not months.
                    </p>
                    <div
                        className="flex items-center justify-center space-x-8 text-sm text-gray-500 fade-up"
                        style={{ transitionDelay: "0.4s" }}
                    >
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Free Consultation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Fast Delivery</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Selection */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 fade-up">Choose Your Service</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up">
                            Select the service that best fits your needs. Not sure? Book a free consultation and we'll help you
                            decide.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {services.map((service, index) => {
                            const IconComponent = service.icon
                            return (
                                <Card
                                    key={service.id}
                                    className={`cursor-pointer transition-all duration-300 card-3d fade-up ${selectedService === service.id
                                            ? "border-purple-500 bg-purple-50 shadow-lg"
                                            : "border-gray-200 hover:border-purple-300 hover:shadow-md"
                                        }`}
                                    style={{ transitionDelay: `${index * 0.1}s` }}
                                    onClick={() => setSelectedService(service.id)}
                                >
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-4">
                                            <div
                                                className={`w-12 h-12 rounded-lg flex items-center justify-center floating ${selectedService === service.id ? "bg-purple-600" : "bg-purple-100"
                                                    }`}
                                            >
                                                <IconComponent
                                                    className={`h-6 w-6 ${selectedService === service.id ? "text-white" : "text-purple-600"}`}
                                                />
                                            </div>
                                            <span className="text-lg font-bold text-purple-600">{service.price}</span>
                                        </div>
                                        <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                                        <CardDescription className="mb-4">{service.description}</CardDescription>

                                        <div className="space-y-2 mb-4">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center text-sm text-gray-600">
                                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>{service.timeline}</span>
                                        </div>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Package Selection */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 fade-up">Select Your Package</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up">
                            Choose the package that matches your project scope and budget. All packages include our quality guarantee.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {packages.map((pkg, index) => (
                            <Card
                                key={pkg.id}
                                className={`cursor-pointer transition-all duration-300 card-3d fade-up relative ${selectedPackage === pkg.id
                                        ? "border-purple-500 bg-white shadow-xl scale-105"
                                        : "border-gray-200 hover:border-purple-300 hover:shadow-lg bg-white"
                                    } ${pkg.popular ? "ring-2 ring-purple-500" : ""}`}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                                onClick={() => setSelectedPackage(pkg.id)}
                            >
                                {pkg.popular && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                        Most Popular
                                    </Badge>
                                )}
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                                    <div className="text-4xl font-bold text-purple-600 mb-2">{pkg.price}</div>
                                    <CardDescription className="mb-6">{pkg.description}</CardDescription>

                                    <div className="space-y-3 text-left">
                                        {pkg.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-sm">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 fade-up">Book Your Consultation</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up">
                            Fill out the form below to schedule your free consultation. We'll discuss your project and provide a
                            detailed proposal.
                        </p>
                    </div>

                    <Card className="p-8 shadow-lg fade-up">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="firstName">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            placeholder="John"
                                            required
                                            className="mt-1 focus:border-purple-600 focus:ring-purple-600"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            placeholder="Doe"
                                            required
                                            className="mt-1 focus:border-purple-600 focus:ring-purple-600"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            placeholder="john@example.com"
                                            required
                                            className="mt-1 focus:border-purple-600 focus:ring-purple-600"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            placeholder="+1 (555) 123-4567"
                                            className="mt-1 focus:border-purple-600 focus:ring-purple-600"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Label htmlFor="company">Company/Organization</Label>
                                        <Input
                                            id="company"
                                            value={formData.company}
                                            onChange={(e) => handleInputChange("company", e.target.value)}
                                            placeholder="Your Company Name"
                                            className="mt-1 focus:border-purple-600 focus:ring-purple-600"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="budget">Budget Range *</Label>
                                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                                            <SelectTrigger className="mt-1 focus:border-purple-600 focus:ring-purple-600">
                                                <SelectValue placeholder="Select your budget" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="under-500">Under $500</SelectItem>
                                                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                                                <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                                                <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                                                <SelectItem value="5000-plus">$5,000+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="timeline">Project Timeline *</Label>
                                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                                            <SelectTrigger className="mt-1 focus:border-purple-600 focus:ring-purple-600">
                                                <SelectValue placeholder="When do you need this?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="asap">ASAP (Rush job)</SelectItem>
                                                <SelectItem value="1-week">Within 1 week</SelectItem>
                                                <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                                                <SelectItem value="1-month">Within 1 month</SelectItem>
                                                <SelectItem value="flexible">I'm flexible</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Label htmlFor="description">Project Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Tell us about your project, goals, target audience, and any specific requirements..."
                                        required
                                        className="mt-1 min-h-[120px] focus:border-purple-600 focus:ring-purple-600"
                                    />
                                </div>
                            </div>

                            {/* Additional Services */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Services</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {additionalServices.map((service) => (
                                        <div key={service.id} className="flex items-center space-x-3">
                                            <Checkbox
                                                id={service.id}
                                                checked={formData.additionalServices.includes(service.id)}
                                                onCheckedChange={(checked) => handleAdditionalServiceChange(service.id, Boolean(checked))}
                                            />

                                            <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                                                <span className="font-medium">{service.name}</span>
                                                <span className="text-purple-600 ml-2">{service.price}</span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Preferred Consultation Time */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Preferred Consultation Time</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="preferredDate">Preferred Date</Label>
                                        <Input
                                            id="preferredDate"
                                            type="date"
                                            value={formData.preferredDate}
                                            onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                                            min={new Date().toISOString().split("T")[0]}
                                            className="mt-1 focus:border-purple-600 focus:ring-purple-600"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="preferredTime">Preferred Time</Label>
                                        <Select
                                            value={formData.preferredTime}
                                            onValueChange={(value) => handleInputChange("preferredTime", value)}
                                        >
                                            <SelectTrigger className="mt-1 focus:border-purple-600 focus:ring-purple-600">
                                                <SelectValue placeholder="Select time slot" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="9am">9:00 AM - 10:00 AM</SelectItem>
                                                <SelectItem value="10am">10:00 AM - 11:00 AM</SelectItem>
                                                <SelectItem value="11am">11:00 AM - 12:00 PM</SelectItem>
                                                <SelectItem value="2pm">2:00 PM - 3:00 PM</SelectItem>
                                                <SelectItem value="3pm">3:00 PM - 4:00 PM</SelectItem>
                                                <SelectItem value="4pm">4:00 PM - 5:00 PM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 btn-hover-effect pulse-glow px-12 py-4 text-lg"
                                >
                                    Book Free Consultation
                                    <Calendar className="ml-2 h-5 w-5" />
                                </Button>
                                <p className="text-sm text-gray-500 mt-4">
                                    * We'll contact you within 24 hours to confirm your consultation time
                                </p>
                            </div>
                        </form>
                    </Card>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 fade-up">Why Choose S8Builder?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up">
                            We're not just another web design agency. We're your digital transformation partner.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center fade-up" style={{ transitionDelay: "0.1s" }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 floating">
                                <Zap className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">Get your project delivered in days, not months. We value your time.</p>
                        </div>

                        <div className="text-center fade-up" style={{ transitionDelay: "0.2s" }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 floating">
                                <Star className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
                            <p className="text-gray-600">
                                Professional quality work with unlimited revisions until you're satisfied.
                            </p>
                        </div>

                        <div className="text-center fade-up" style={{ transitionDelay: "0.3s" }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 floating">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
                            <p className="text-gray-600">Work with experienced designers and developers who understand your needs.</p>
                        </div>

                        <div className="text-center fade-up" style={{ transitionDelay: "0.4s" }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 floating">
                                <CheckCircle className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                            <p className="text-gray-600">
                                Get ongoing support and maintenance to keep your project running smoothly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 fade-up">Need Help Choosing?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-up">
                            Not sure which service or package is right for you? Get in touch and we'll help you find the perfect
                            solution.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="text-center p-6 fade-up card-3d">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                            <p className="text-gray-600 mb-4">Speak directly with our team</p>
                            <p className="text-purple-600 font-medium">+234 (0) 123 456 7890</p>
                        </Card>

                        <Card className="text-center p-6 fade-up card-3d" style={{ transitionDelay: "0.1s" }}>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                            <p className="text-gray-600 mb-4">Get a detailed response</p>
                            <p className="text-blue-600 font-medium">hello@s8builder.com</p>
                        </Card>

                        <Card className="text-center p-6 fade-up card-3d" style={{ transitionDelay: "0.2s" }}>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                            <p className="text-gray-600 mb-4">Meet us in person</p>
                            <p className="text-green-600 font-medium">Lagos, Nigeria</p>
                        </Card>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
