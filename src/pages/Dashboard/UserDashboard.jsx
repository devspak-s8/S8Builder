"use client"

// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useMemo } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import {
    Search,
    FolderOpen,
    Clock,
    Users,
    ChevronRight,
    ChevronDown,
    Plus,
    Share2,
    Paperclip,
    ArrowUp,
    Camera,
    FileImage,
    Upload,
    Layout,
    UserPlus,
    Sparkles,
    X,
    Settings,
    LogOut,
    User,
    Crown,
    Menu,
    ChevronLeft,
    Star,
    Zap,
    Code,
    Palette,
    Database,
    Globe,
    Calendar,
    DollarSign,
    XCircle,
    ArrowUpDown,
    FileUpIcon as SortUp,
    ArrowDownWideNarrowIcon as SortDown,
    CheckCircle,
    AlertCircle,
    XCircleIcon,
    Send, FileText, Monitor, Github, Figma, Image, MessageCircle, ArrowDown,
} from "lucide-react"
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  LayoutGrid,
  MousePointerClick,
UploadCloud,
  Puzzle,

    BarChart2,
} from "lucide-react";

import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


import { Link } from "react-router-dom";


// Enhanced animated background component
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Large gradient orbs */}
            <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-2xl"
                animate={{
                    x: [-50, 50, -50],
                    y: [-30, 30, -30],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
            />

            {/* Medium gradient orbs */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-bl from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl"
                animate={{
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-to-tr from-pink-400/15 to-rose-400/15 rounded-full blur-2xl"
                animate={{
                    x: [0, 70, 0],
                    y: [0, -50, 0],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            {/* Floating geometric shapes */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={`shape-${i}`}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + i * 8}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 50, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Floating particles */}
            {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -150, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 3,
                        ease: "easeOut",
                    }}
                />
            ))}

            {/* Pulsing rings */}
            {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                    key={`ring-${i}`}
                    className="absolute border border-purple-400/10 rounded-full"
                    style={{
                        width: `${200 + i * 100}px`,
                        height: `${200 + i * 100}px`,
                        left: `${30 + i * 20}%`,
                        top: `${40 + i * 10}%`,
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.3, 0.1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-pulse"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)",
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>
        </div>
    )
}

// Filter Tag Component
const FilterTag = ({ label, onClick, color }) => {
    const colorClasses = {
        green: "bg-green-500/20 text-green-300 border-green-500/30",
        blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    }

    return (
        <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${colorClasses[color]} backdrop-blur-sm`}
        >
            {label}
            <button onClick={onClick} className="hover:bg-white/10 rounded-full p-0.5 transition-colors">
                <X className="w-3 h-3" />
            </button>
        </motion.span>
    )
}

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [favoriteProjectsExpanded, setFavoriteProjectsExpanded] = useState(true)
    const [favoriteChatsExpanded, setFavoriteChatsExpanded] = useState(true)
    const [recentsExpanded, setRecentsExpanded] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [inputValue, setInputValue] = useState("")
    const [showUpgradeBanner, setShowUpgradeBanner] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    // Booking Services State
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [selectedModel, setSelectedModel] = useState('v0-1.5-md');

    const [bookingServices, setBookingServices] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState("all");

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth < 768) {
                setSidebarOpen(false)
            } else {
                setSidebarOpen(true)
            }
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Filtering and sorting logic


    useEffect(() => {
        const token =
            localStorage.getItem("access_token") ||
            sessionStorage.getItem("access_token");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8000/auth/my-bookings?page=1&page_size=50",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const transformed = res.data.data.map((booking) => ({
                    id: `BK${booking.id.toString().padStart(3, "0")}`,
                    clientName: `${booking.firstName} ${booking.lastName}`,
                    service: booking.projectType,
                    date: booking.preferredDate,
                    amount: parseInt(booking.budget.replace(/\D/g, "")) || 0,
                    status: booking.status,
                    duration: booking.timeline,
                    priority: "medium",
                }));

                setBookingServices(transformed);
            } catch (error) {
                if (error.response?.status === 401) {
                    localStorage.removeItem("access_token");
                    navigate("/login", { replace: true });
                } else {
                    console.error("Booking fetch error:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate]);


    // 🔁 Sorting Handler
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };
    const handleLogout = () => {
        // 🔒 Clear both localStorage and sessionStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");

        // 🧭 Redirect to login or home page
        navigate("/login", { replace: true });

        // Optional: Toast or alert for confirmation
        alert("You’ve been logged out successfully.");
    };

    // 🔼🔽 Sort Icon Logic
    const getSortIcon = (field) => {
        if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-gray-500" />;
        return sortDirection === "asc" ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
        ) : (
            <ArrowDown className="w-4 h-4 text-green-500" />
        );
    };
    const getStatusIcon = (status) => {
        const icons = {
            approved: <CheckCircle className="w-4 h-4 text-green-500" />,
            pending: <AlertCircle className="w-4 h-4 text-yellow-500" />,
            rejected: <XCircle className="w-4 h-4 text-red-500" />,
            cancelled: <XCircle className="w-4 h-4 text-gray-500" />,
            completed: <CheckCircle className="w-4 h-4 text-blue-500" />,
            in_progress: <Clock className="w-4 h-4 text-purple-500" />,
            pay_now: <CreditCard className="w-4 h-4 text-indigo-500" />,
            awaiting_admin_approval: <AlertTriangle className="w-4 h-4 text-orange-500" />,
        };
        return icons[status] || null;
    };

    const getStatusBadge = (status) => {
        const base = "px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1";
        const styles = {
            approved: `${base} bg-green-500/20 text-green-400 border border-green-500/30`,
            pending: `${base} bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`,
            rejected: `${base} bg-red-500/20 text-red-400 border border-red-500/30`,
            cancelled: `${base} bg-gray-500/20 text-gray-400 border border-gray-500/30`,
            completed: `${base} bg-blue-500/20 text-blue-400 border border-blue-500/30`,
            in_progress: `${base} bg-purple-500/20 text-purple-400 border border-purple-500/30`,
            pay_now: `${base} bg-indigo-500/20 text-indigo-400 border border-indigo-500/30`,
            awaiting_admin_approval: `${base} bg-orange-500/20 text-orange-400 border border-orange-500/30`,
        };
        return styles[status] || base;
    };

    // 🔥 Priority Badge Renderer
    const getPriorityBadge = (priority) => {
        const base = "px-2 py-1 rounded text-xs font-medium";
        const styles = {
            high: `${base} bg-red-500/20 text-red-400`,
            medium: `${base} bg-yellow-500/20 text-yellow-400`,
            low: `${base} bg-blue-500/20 text-blue-400`,
        };
        return styles[priority] || base;
    };


    // 📊 Sorted + Filtered Bookings
    const sortedBookings = [...bookingServices]
        .sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            if (sortField === "date") {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } else if (sortField === "amount") {
                aValue = Number(aValue);
                bValue = Number(bValue);
            } else {
                aValue = aValue?.toString().toLowerCase();
                bValue = bValue?.toString().toLowerCase();
            }

            return sortDirection === "asc"
                ? aValue > bValue
                    ? 1
                    : -1
                : aValue < bValue
                    ? 1
                    : -1;
        })
        .filter((booking) => {
            const bookingDate = new Date(booking.date);
            const today = new Date();
            const daysDiff = Math.floor((today - bookingDate) / (1000 * 60 * 60 * 24));

            // 🚫 Status Filter
            if (statusFilter !== "all" && booking.status !== statusFilter) return false;

            // 🚫 Priority Filter
            if (priorityFilter !== "all" && booking.priority !== priorityFilter) return false;

            // 🔍 Search Filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const { clientName = "", service = "", id = "" } = booking;
                if (
                    !clientName.toLowerCase().includes(query) &&
                    !service.toLowerCase().includes(query) &&
                    !id.toLowerCase().includes(query)
                ) {
                    return false;
                }
            }

            // 📅 Date Range Filter
            if (dateRange !== "all") {
                switch (dateRange) {
                    case "today":
                        return daysDiff === 0;
                    case "week":
                        return daysDiff <= 7;
                    case "month":
                        return daysDiff <= 30;
                    default:
                        return true;
                }
            }

            return true;
        });

    const favoriteProjects = [
        "SBbuilder website design",
        "E-commerce product des...",
        "Sulayman portfolio webs...",
        "Modern Tech Landing Pa...",
        "Admin dashboard templa...",
        "MeowAI Clone",
        "Error response",
        "MediVue landing page",
        "Designing testimonials",
        "React Component Library",
        "Next.js Blog Template",
        "Authentication System",
    ]


    const communityProjects = [
        {
            title: "Modern Dashboard",
            author: "Alex Chen",
            category: "Dashboard",
            icon: Layout,
            gradient: "from-blue-500/20 to-cyan-500/20",
        },
        {
            title: "E-commerce Store",
            author: "Sarah Kim",
            category: "E-commerce",
            icon: Globe,
            gradient: "from-green-500/20 to-emerald-500/20",
        },
        {
            title: "Portfolio Website",
            author: "Mike Johnson",
            category: "Portfolio",
            icon: User,
            gradient: "from-purple-500/20 to-pink-500/20",
        },
        {
            title: "Task Management",
            author: "Emma Wilson",
            category: "Productivity",
            icon: Code,
            gradient: "from-orange-500/20 to-red-500/20",
        },
        {
            title: "Design System",
            author: "David Lee",
            category: "Design",
            icon: Palette,
            gradient: "from-indigo-500/20 to-purple-500/20",
        },
        {
            title: "API Documentation",
            author: "Lisa Zhang",
            category: "Documentation",
            icon: Database,
            gradient: "from-teal-500/20 to-blue-500/20",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white relative overflow-hidden">
            <AnimatedBackground />

            {/* Header */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b border-purple-500/20 backdrop-blur-md bg-slate-900/80"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4">
                    <motion.div
                        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                    >
                        v0
                    </motion.div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Personal</span>
                        <Badge variant="outline" className="text-xs border-purple-400/50 text-purple-300">
                            Free
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-400/50 hover:bg-purple-500/20 text-purple-300 hover:text-white transition-all duration-200 bg-transparent"
                    >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-purple-500/20 text-purple-300 hover:text-white transition-all duration-200"
                    >
                        Feedback
                    </Button>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-purple-400/50 hover:ring-purple-400 transition-all duration-200">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                                        JD
                                    </AvatarFallback>
                                </Avatar>
                            </motion.div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 text-white bg-slate-800/95 backdrop-blur-sm border-purple-500/20">
                            <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20">
                                <User className="w-4 h-4 mr-2" />
                                Profile Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20">
                                <Settings className="w-4 h-4 mr-2" />
                                Preferences
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-purple-500/20" />
                            <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20">
                                <Crown className="w-4 h-4 mr-2" />
                                Upgrade Plan
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-purple-500/20" />
                            <DropdownMenuItem
                                onClick={handleLogout}

                                className="hover:bg-red-500/20 focus:bg-red-500/20 text-red-400">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </motion.header>

            <div className="flex pt-[73px]">
                {/* Sidebar Toggle Button - Moves with sidebar */}
                <motion.button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="fixed top-20 z-50 p-2 bg-slate-800/90 backdrop-blur-sm border border-purple-400/30 rounded-lg hover:bg-purple-500/20 text-purple-300 hover:text-white transition-all duration-300 shadow-lg"
                    animate={{
                        left: sidebarOpen && !isMobile ? "260px" : "16px",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.button>

                {/* Sidebar */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.aside
                            initial={{ x: -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed left-0 top-[73px] bottom-0 w-64 border-r border-purple-500/20 backdrop-blur-md bg-slate-900/95 z-40 shadow-2xl"
                        >
                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
                                <h2 className="font-semibold text-purple-200">Navigation</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSidebarOpen(false)}
                                    className="hover:bg-purple-500/20 text-purple-300 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                         {/* Scrollable Sidebar Content - S8Builder Services */}
<div className="flex flex-col h-[calc(100vh-73px-65px)] overflow-hidden">
  <div className="flex-1 overflow-y-auto custom-scrollbar">
    <div className="p-4 space-y-2">
      {[
  { label: "New Booking", icon: PlusCircle, active: true, to: "/new-booking" },
  { label: "Browse Templates", icon: LayoutGrid, active: false, to: "/browse-templates" },
  { label: "Drag & Drop Builder", icon: MousePointerClick, active: false, to: "/drag-drop-builder" },
  { label: "Code Editor", icon: Code, active: false, to: "/code-editor" },
  { label: "Assets Library", icon: Image, active: false, to: "/assets-library" },
  { label: "Deploy & Hosting", icon: UploadCloud, active: false, to: "/deploy-hosting" },
  { label: "Integrations", icon: Puzzle, active: false, to: "/integrations" },
  { label: "Analytics", icon: BarChart2, active: false, to: "/analytics" },
]
.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
        <Link to={item.to}>
      <Button
        variant={item.active ? "secondary" : "ghost"}
        className={`w-full justify-start gap-3 ${
          item.active
            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/30"
            : "hover:bg-purple-500/10 text-purple-200 hover:text-white"
        } transition-all duration-200`}
      >
        <item.icon className="w-4 h-4" />
        <span>{item.label}</span>
      </Button>
    </Link>
        </motion.div>
      ))}
    </div>

    {/* Optionally keep favorite sections — or customize them later */}
    <motion.div
      className="px-4 space-y-4 pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      {/* Favorite Projects */}
      <div>
        <Button
          variant="ghost"
          className="w-full justify-between p-2 text-purple-300 hover:text-white hover:bg-purple-500/10"
          onClick={() => setFavoriteProjectsExpanded(!favoriteProjectsExpanded)}
        >
          <span className="text-sm font-medium">Saved Projects</span>
          {favoriteProjectsExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
        <AnimatePresence>
          {favoriteProjectsExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-1 mt-2 max-h-64 overflow-y-auto custom-scrollbar">
                {favoriteProjects.map((project, index) => (
                  <motion.div
                    key={project}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-xs text-purple-200 hover:text-white hover:bg-purple-500/10 h-8 group"
                    >
                      <Star className="w-3 h-3 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="truncate">{project}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Optional Extras */}
      <div>
        <Button
          variant="ghost"
          className="w-full justify-between p-2 text-purple-300 hover:text-white hover:bg-purple-500/10"
          onClick={() => setFavoriteChatsExpanded(!favoriteChatsExpanded)}
        >
          <span className="text-sm font-medium">Support Chats</span>
          {favoriteChatsExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div>
        <Button
          variant="ghost"
          className="w-full justify-between p-2 text-purple-300 hover:text-white hover:bg-purple-500/10"
          onClick={() => setRecentsExpanded(!recentsExpanded)}
        >
          <span className="text-sm font-medium">Recent Activity</span>
          {recentsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </motion.div>
  </div>
</div>

                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Overlay for mobile */}
                <AnimatePresence>
                    {sidebarOpen && isMobile && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* Main Content - Fully Responsive */}
                <motion.main
                    className="flex-1 min-h-screen overflow-y-auto custom-scrollbar"
                    animate={{
                        marginLeft: sidebarOpen && !isMobile ? "256px" : "0px",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {/* GitHub Sync Banner */}
                    <AnimatePresence>
                        {showUpgradeBanner && (
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-purple-500/20 backdrop-blur-sm sticky top-0 z-20"
                            >
                                <div className="flex items-center justify-between max-w-6xl mx-auto">
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">New</Badge>
                                        <span className="text-sm">
                                            <strong>Sync your generation with GitHub</strong> Try it now
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-purple-300" />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowUpgradeBanner(false)}
                                        className="hover:bg-purple-500/20"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Content Area - Responsive Container */}
                    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-16 w-full">

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.3 }}
                            className="text-left w-full"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Recent Booking Services</h2>
                                    <p className="text-purple-300">Manage and track your service bookings and their status.</p>
                                </div>
                                <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-500/20">
                                    View All
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                                className="bg-slate-800/50 border border-purple-400/20 rounded-xl overflow-hidden backdrop-blur-sm"
                            >
                                {/* Filters & Search */}
                                <div className="p-6 border-b border-gray-700 bg-gray-800/50">
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search by client, service, or booking ID..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                                            />
                                        </div>

                                        {[["Status", statusFilter, setStatusFilter, ["all", "approved", "pending", "rejected"]],
                                        ["Priority", priorityFilter, setPriorityFilter, ["all", "high", "medium", "low"]],
                                        ["Date", dateRange, setDateRange, ["all", "today", "week", "month"]]
                                        ].map(([label, value, setter, options], i) => (
                                            <div key={i} className="relative">
                                                <select
                                                    value={value}
                                                    onChange={(e) => setter(e.target.value)}
                                                    className="appearance-none bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                                                >
                                                    {options.map(opt => (
                                                        <option key={opt} value={opt}>
                                                            {label === "Date" && opt === "all" ? "All Time" : opt[0].toUpperCase() + opt.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => {
                                                setStatusFilter('all');
                                                setPriorityFilter('all');
                                                setSearchQuery('');
                                                setDateRange('all');
                                            }}
                                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition flex items-center space-x-2"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            <span>Clear</span>
                                        </button>
                                    </div>

                                    {/* Active Filters */}
                                    {(statusFilter !== 'all' || priorityFilter !== 'all' || searchQuery || dateRange !== 'all') && (
                                        <div className="mt-4 flex flex-wrap gap-2 items-center">
                                            <span className="text-sm text-gray-400">Active filters:</span>
                                            {statusFilter !== 'all' && (
                                                <FilterTag label={`Status: ${statusFilter}`} onClick={() => setStatusFilter('all')} color="green" />
                                            )}
                                            {priorityFilter !== 'all' && (
                                                <FilterTag label={`Priority: ${priorityFilter}`} onClick={() => setPriorityFilter('all')} color="blue" />
                                            )}
                                            {searchQuery && (
                                                <FilterTag label={`Search: "${searchQuery}"`} onClick={() => setSearchQuery('')} color="purple" />
                                            )}
                                            {dateRange !== 'all' && (
                                                <FilterTag label={`Date: ${dateRange}`} onClick={() => setDateRange('all')} color="yellow" />
                                            )}
                                        </div>
                                    )}

                                    {/* Result Count */}
                                    <div className="mt-3 text-sm text-gray-400">
                                        Showing {sortedBookings.length} of {bookingServices.length} bookings
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-800 border-b border-gray-700">
                                            <tr>
                                                {[
                                                    ["Booking ID", "id"],
                                                    ["Client", "clientName"],
                                                    ["Service", "service"],
                                                    ["Date", "date", <Calendar className="w-4 h-4" />],
                                                    ["Amount", "amount", <DollarSign className="w-4 h-4" />],
                                                    ["Status", "status"],
                                                    ["Duration", "duration"],
                                                    ["Priority", "priority"],
                                                ].map(([label, field, icon]) => (
                                                    <th key={field} className="px-6 py-4 text-left">
                                                        <button
                                                            onClick={() => handleSort(field)}
                                                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
                                                        >
                                                            {icon}
                                                            <span className="font-medium">{label}</span>
                                                            {getSortIcon(field)}
                                                        </button>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-purple-500/20">
                                            <AnimatePresence>
                                                {sortedBookings.map((booking, index) => (
                                                    <motion.tr
                                                        key={booking.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                                        className="hover:bg-purple-500/10 transition"
                                                    >
                                                        <td className="px-6 py-4 font-mono text-sm text-green-400">{booking.id}</td>
                                                        <td className="px-6 py-4 flex items-center space-x-3">
                                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                                <User className="w-4 h-4 text-white" />
                                                            </div>
                                                            <span className="text-white font-medium">{booking.clientName}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-300">{booking.service}</td>
                                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                                            {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </td>
                                                        <td className="px-6 py-4 text-green-400 font-semibold">${booking.amount.toLocaleString()}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={getStatusBadge(booking.status)}>
                                                                {getStatusIcon(booking.status)}
                                                                <span className="capitalize">{booking.status.replace(/_/g, " ")}</span>
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-400 text-sm">{booking.duration}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={getPriorityBadge(booking.priority)}>
                                                                {booking.priority.toUpperCase()}
                                                            </span>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </motion.div>


                        {/* Community Section */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.7 }}
                            className="w-full"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">From the Community</h2>
                                    <p className="text-purple-300">Explore what the community is building with v0.</p>
                                </div>
                                <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-500/20">
                                    Browse All
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {communityProjects.map((project, index) => (
                                    <motion.div
                                        key={project.title}
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 1.9 + index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <Card className="bg-slate-800/50 border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 backdrop-blur-sm overflow-hidden group">
                                            <CardContent className="p-0">
                                                <div className={`aspect-video bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                                    <div className="absolute top-4 left-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                                                <project.icon className="w-4 h-4 text-white" />
                                                            </div>
                                                            <Badge variant="secondary" className="text-xs bg-white/10 text-white border-0">
                                                                {project.category}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <motion.div
                                                        className="absolute bottom-4 left-4 right-4"
                                                        initial={{ y: 20, opacity: 0 }}
                                                        whileHover={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <div className="space-y-2">
                                                            <h3 className="font-semibold text-white text-sm">{project.title}</h3>
                                                            <div className="flex items-center gap-2 text-white/80">
                                                                <Avatar className="w-5 h-5">
                                                                    <AvatarFallback className="bg-purple-500 text-xs text-white">
                                                                        {project.author
                                                                            .split(" ")
                                                                            .map((n) => n[0])
                                                                            .join("")}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <span className="text-xs">{project.author}</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Additional Content Sections */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 2.2 }}
                            className="w-full"
                        >
                            <div className="text-center space-y-6">
                                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Ready to get started?
                                </h2>
                                <p className="text-purple-300 max-w-2xl mx-auto text-sm sm:text-base">
                                    Join thousands of developers who are building amazing projects with v0. Start creating your next
                                    masterpiece today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                                        <Zap className="w-4 h-4 mr-2" />
                                        Start Building
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-purple-400/30 hover:bg-purple-500/20 text-purple-200 hover:text-white bg-transparent"
                                    >
                                        View Examples
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Footer spacer */}
                        <div className="h-32" />
                    </div>
                </motion.main>
            </div>
        </div>
    )
}
