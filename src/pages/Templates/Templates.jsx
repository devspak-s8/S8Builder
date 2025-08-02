"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Search, Eye, Download, ArrowRight, CheckCircle,
    Globe, Smartphone, Palette, ShoppingCart, Users,
    Calendar, Camera, Briefcase, Sparkles, Grid3X3, List
} from "lucide-react"

import '../../styles/animations.css'
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

export default function TemplatesPage() {
    const observerRef = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState("grid")
    const [templates, setTemplates] = useState([])
    const [loading, setLoading] = useState(true)
    const S3_BASE_URL = "https://s8templates.s3.eu-north-1.amazonaws.com/"

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true)
            document.body.classList.add("page-loaded")
        }, 100)

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target
                    element.classList.add('animate-in')
                }
            })
        }, {
            threshold: [0.1, 0.25, 0.5],
            rootMargin: '0px 0px -50px 0px',
        })

        const elements = document.querySelectorAll(".animate-on-scroll")
        elements.forEach((el) => observerRef.current?.observe(el))

        return () => {
            clearTimeout(timer)
            observerRef.current?.disconnect()
        }
    }, [])

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get("http://localhost:8000/auth/templates/")
                setTemplates(response.data)
            } catch (error) {
                console.error("Failed to fetch templates:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchTemplates()
    }, [])

    console.log("Template object:", templates);

    const categories = [
        { value: "all", label: "All Templates", icon: Globe },
        { value: "Portfolio", label: "Portfolio", icon: Briefcase },
        { value: "Business", label: "Business", icon: Users },
        { value: "E-commerce", label: "E-commerce", icon: ShoppingCart },
        { value: "Agency", label: "Agency", icon: Palette },
        { value: "Restaurant", label: "Restaurant", icon: Calendar },
        { value: "Event", label: "Event", icon: Calendar },
        { value: "Photography", label: "Photography", icon: Camera },
        { value: "SaaS", label: "SaaS", icon: Smartphone },
    ]

    const filteredTemplates = templates.filter((template) => {
        const matchesCategory =
            selectedCategory === "all" ||
            (template.category && template.category.name === selectedCategory)
        const matchesSearch = template.name?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const handleDownload = (templateId) => {
        if (!templateId) return;
        window.location.href = `/api/templates/${templateId}/download`;
    };
    return (
        <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-white transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <section className="py-20 px-4 relative overflow-hidden">
                <div className="container mx-auto text-center max-w-4xl relative">
                    <Badge className="mb-6 bg-purple-100 text-purple-700 shimmer magnetic">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Premium Templates
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Choose From Our{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Premium Collection
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Professional, responsive templates built with modern tech and best UX.
                    </p>
                    <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2 magnetic">20+ Templates Available</Badge>
                </div>
            </section>

            <section className="py-12 px-4 bg-white border-b">
                <div className="container mx-auto flex flex-col lg:flex-row gap-6 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            placeholder="Search templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 focus:border-purple-600 focus:ring-purple-600"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}>
                            <Grid3X3 className="h-4 w-4" />
                        </Button>
                        <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
                            <List className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => {
                            const Icon = category.icon
                            return (
                                <Button
                                    key={category.value}
                                    variant={selectedCategory === category.value ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.value)}
                                    className="flex items-center space-x-2"
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{category.label}</span>
                                </Button>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className={`${viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"}`}>
                        {filteredTemplates.map((template) => {

                            return (
                                <Card key={template.id} className={`group overflow-hidden border hover:border-purple-300 transition-all duration-300 ${viewMode === "list" ? "flex flex-row" : ""}`}>
                                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                                        <img
                                            src={
                                                template.thumbnail
                                                    ? template.thumbnail.startsWith("http")
                                                        ? template.thumbnail
                                                        : `${S3_BASE_URL}${template.thumbnail}`
                                                    : "/fallback.jpg"
                                            }
                                            alt={template.name}
                                            onError={(e) => (e.target.src = "/fallback.jpg")}
                                            className={`${viewMode === "list" ? "w-full h-32" : "w-full h-48"} object-cover`}
                                        />

                                        <Badge className="absolute top-2 right-2 bg-purple-600 text-white">
                                            {template.category?.name || "General"}
                                        </Badge>
                                    </div>

                                    <CardHeader className={viewMode === "list" ? "flex-1" : ""}>
                                        <div className="flex justify-between items-start mb-2">
                                            <CardTitle className="text-lg text-gray-900">{template.name}</CardTitle>
                                            <span className="text-lg font-bold text-purple-600">{template.price}</span>
                                        </div>

                                        <div className="flex space-x-2">
                                            {typeof template.live_link === "string" && template.live_link.trim().startsWith("http") ? (
                                                <a
                                                    href={template.live_link.trim()}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full hover:bg-purple-50"
                                                    >
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Preview
                                                    </Button>
                                                </a>
                                            ) : (
                                                <Button disabled size="sm" variant="outline" className="flex-1 opacity-50">
                                                    No Preview
                                                </Button>
                                            )}

                                            <a
                                                href={`/api/templates/${template.id}/download`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1"
                                            >
                                                <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                                    <Download className="h-4 w-4 mr-1" />
                                                    Download ZIP
                                                </Button>
                                            </a>

                                        </div>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-20">
                            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900">No templates found</h3>
                            <p className="text-gray-600 mb-6">Try adjusting your search or category filter.</p>
                            <Button onClick={() => {
                                setSearchTerm("")
                                setSelectedCategory("all")
                            }} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
