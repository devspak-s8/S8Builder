import { useState, useEffect } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import {
    X, Crown, User, Settings, LogOut, Menu, ChevronLeft, Star,
    ChevronDown, ChevronRight, PlusCircle, LayoutGrid, MousePointerClick,
    Code, Image, UploadCloud, Puzzle, BarChart2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Animated background
const AnimatedBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 0.8, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-2xl"
            animate={{ x: [-50, 50, -50], y: [-30, 30, -30], rotate: [0, 180, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
    </div>
)

export default function UserDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [favoriteProjectsExpanded, setFavoriteProjectsExpanded] = useState(true)
    const [favoriteChatsExpanded, setFavoriteChatsExpanded] = useState(true)
    const [recentsExpanded, setRecentsExpanded] = useState(false)
    const [showUpgradeBanner, setShowUpgradeBanner] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
            setSidebarOpen(window.innerWidth >= 768)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        sessionStorage.removeItem("access_token")
        sessionStorage.removeItem("refresh_token")
        navigate("/login", { replace: true })
        alert("You've been logged out successfully.")
    }

    const favoriteProjects = [
        "SBbuilder website design", "E-commerce product des...", "Sulayman portfolio webs...",
        "Modern Tech Landing Pa...", "Admin dashboard templa...", "MeowAI Clone",
        "Error response", "MediVue landing page", "Designing testimonials",
        "React Component Library", "Next.js Blog Template", "Authentication System",
    ]
    const navigationItems = [
  { label: "Dashboard", icon: LayoutGrid, active: location.pathname === "/user-dashboard", to: "/user-dashboard" },
  { label: "Browse Templates", icon: LayoutGrid, active: location.pathname === "/user-dashboard/templates", to: "/user-dashboard/templates" },
  { label: "Leaderboard", icon: Star, active: location.pathname === "/user-dashboard/leaderboard", to: "/user-dashboard/leaderboard" },
  { label: "Drag & Drop Builder", icon: MousePointerClick, active: location.pathname === "/user-dashboard/builder", to: "/user-dashboard/builder" },
  { label: "Code Editor", icon: Code, active: location.pathname === "/user-dashboard/code-editor", to: "/user-dashboard/code-editor" },
  { label: "Text Editor", icon: Code, active: location.pathname === "/user-dashboard/text-editor", to: "/user-dashboard/text-editor" },
  { label: "Components Gallery", icon: LayoutGrid, active: location.pathname === "/user-dashboard/components", to: "/user-dashboard/components" },
  { label: "Assets Library", icon: Image, active: location.pathname === "/user-dashboard/assets", to: "/user-dashboard/assets" },
  { label: "Deploy & Hosting", icon: UploadCloud, active: location.pathname === "/user-dashboard/deploy", to: "/user-dashboard/deploy" },
  { label: "Integrations", icon: Puzzle, active: location.pathname === "/user-dashboard/integrations", to: "/user-dashboard/integrations" },
  { label: "Analytics", icon: BarChart2, active: location.pathname === "/user-dashboard/analytics", to: "/user-dashboard/analytics" },
];


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
                            <DropdownMenuItem className="hover:bg-purple-500/20 focus:bg-purple-500/20" asChild>
                                <Link to="/profile">
                                    <User className="w-4 h-4 mr-2" />
                                    Profile Settings
                                </Link>
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
                                className="hover:bg-red-500/20 focus:bg-red-500/20 text-red-400"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </motion.header>

            <div className="flex pt-[73px]">
                {/* Sidebar Toggle Button */}
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

                            {/* Scrollable Sidebar Content */}
                            <div className="flex flex-col h-[calc(100vh-73px-65px)] overflow-hidden">
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <div className="p-4 space-y-2">
                                        {navigationItems.map((item, index) => (
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

                                    {/* Favorite sections */}
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

                                        {/* Support Chats */}
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

                                        {/* Recent Activity */}
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

                {/* Main Content */}
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

                    {/* Page Content */}
                    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </motion.main>
            </div>
        </div>
    )
}
