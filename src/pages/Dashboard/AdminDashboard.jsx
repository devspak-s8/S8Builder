
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Code, FolderOpen, Clock, Users, ChevronDown, ChevronRight, Plus, Share2, Paperclip, Send, Upload, FileText, Monitor, User, Zap, Github, Figma, Image, MessageCircle, ArrowUpDown, ArrowUp, ArrowDown, Calendar, DollarSign, CheckCircle, XCircle, AlertCircle, CreditCard, AlertTriangle, } from 'lucide-react';

  // eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
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

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
export default function AdminDashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
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
  const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  const isAdmin =
    JSON.parse(localStorage.getItem("is_admin") || "false") ||
    JSON.parse(sessionStorage.getItem("is_admin") || "false");

  if (!token || !isAdmin) {
    navigate("/login", { replace: true });
    return;
  }

  const fetchAdminBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/auth/admin/bookings?page=1&limit=50",
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
        locked: false, // can set based on status or from backend if sent
      }));

      setBookingServices(transformed);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/login", { replace: true });
      } else {
        console.error("Admin booking fetch error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchAdminBookings();
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
  const handleStatusUpdate = async (idWithPrefix, newStatus) => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found");
    }

    const numericId = parseInt(idWithPrefix.replace("BK", ""));

    try {
      await axios.patch(
        `http://localhost:8000/auth/admin/bookings/${numericId}/status`,
        null,
        {
          params: { new_status: newStatus },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Update the booking's status locally
      setBookingServices((prev) =>
        prev.map((booking) =>
          booking.id === `BK${idWithPrefix.toString().padStart(3, "0")}`
            ? { ...booking, status: newStatus, locked: true }
            : booking
        )
      );


      alert(`Booking ${idWithPrefix} updated to ${newStatus}`);
    } catch (err) {
      console.error("Failed to update booking:", err);
      alert("Something went wrong.");
    }
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
  const statusList = [
    "pending",
    "pay_now",
    "awaiting_admin_approval",
    "approved",
    "in_progress",
    "completed",
    "rejected",
    "cancelled",
  ];

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
  const FilterTag = ({ label, onClick, color = 'gray' }) => (
    <span className={`px-2 py-1 bg-${color}-500/20 text-${color}-400 rounded-md text-xs flex items-center space-x-1`}>
      <span>{label}</span>
      <button onClick={onClick}>
        <XCircle className="w-3 h-3" />
      </button>
    </span>
  );

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

  const recentProjects = [
    {
      title: 'E-commerce Dashboard',
      description: 'Modern admin panel with analytics and inventory management',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      lastModified: '2 hours ago',
      status: 'Active',
      tech: ['React', 'TypeScript', 'Tailwind']
    },
    {
      title: 'AI Chat Interface',
      description: 'Conversational AI interface with real-time messaging',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      lastModified: '1 day ago',
      status: 'Draft',
      tech: ['Next.js', 'OpenAI', 'Prisma']
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio with interactive animations',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      lastModified: '3 days ago',
      status: 'Published',
      tech: ['Vue.js', 'GSAP', 'Nuxt']
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management with team features',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      lastModified: '1 week ago',
      status: 'Active',
      tech: ['React', 'Node.js', 'MongoDB']
    }
  ];

  const sidebarItems = [
    { icon: Search, label: 'Search', active: false },
    { icon: Code, label: 'Projects', active: false },
    { icon: Clock, label: 'Recents', active: true },
    { icon: Users, label: 'Community', active: false },
  ];

  const favoriteProjects = [
    'SBbuilder website design',
    'E-commerce product des...',
    'Sulayman portfolio webs...',
    'Modern Tech Landing Pa...',
    'Admin dashboard templa...',
    'MeowAI Clone',
    'Error response',
    'MediVue landing page',
    'Designing testimonials'
  ];
  const communityProjects = [
    {
      title: 'Transaction Dashboard',
      author: 'John Doe',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      likes: 324,
      views: 1247
    },
    {
      title: 'Analytics Platform',
      author: 'Sarah Wilson',
      image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      likes: 512,
      views: 2103
    },
    {
      title: 'AI Chat Assistant',
      author: 'Mike Chen',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      likes: 756,
      views: 3421
    }
  ];


  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white relative text-white">
      <AnimatedBackground />


      {/* Sidebar */}
      <div className={`${sidebarExpanded ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-900 border-r border-gray-800 flex flex-col fixed left-0 top-0 h-full z-10`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {sidebarExpanded && (
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-lg">v0</span>
                <div className="flex items-center space-x-1 bg-green-500 px-2 py-1 rounded-full text-xs">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Personal</span>
                </div>
                <span className="text-xs text-gray-400">Free</span>
              </div>
            )}
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Link to="/booking" >
            <button className="w-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-lg p-3 flex items-center justify-center space-x-2 group">
              <Plus className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              {sidebarExpanded && <span className="text-gray-300 group-hover:text-white">New Chat</span>}
            </button>

          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${item.active
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarExpanded && <span>{item.label}</span>}
            </button>
          ))}

          {/* Favorite Projects */}
          {sidebarExpanded && (
            <div className="mt-6">
              <div className="flex items-center space-x-2 px-3 py-2 text-gray-400 text-sm">
                <ChevronDown className="w-4 h-4" />
                <span>Favorite Projects</span>
              </div>
              <div className="space-y-1 mt-2">
                {favoriteProjects.slice(0, 8).map((project, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200 truncate"
                  >
                    {project}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            {sidebarExpanded && (
              <div className="flex-1">
                <div className="text-sm font-medium">User</div>
                <div className="text-xs text-gray-400">Free Plan</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${sidebarExpanded ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-950 z-5">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronRight className={`w-5 h-5 transition-transform ${sidebarExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>New</span>
              <span className="text-green-100">Sync your generation with GitHub</span>
              <span className="text-green-100">Try it now</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
              Upgrade
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
              Feedback
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-950">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Main Heading */}
            <div className="text-center mb-12">






              {/* Recent Projects Section */}
              <div className="text-left mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Recent Projects</h2>
                    <p className="text-gray-400">Continue working on your latest creations.</p>
                  </div>
                  <button className="text-green-500 hover:text-green-400 flex items-center space-x-2 transition-colors">
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {recentProjects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-green-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10 group cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            project.status === 'Published' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                              'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{project.lastModified}</span>
                          </span>
                          <button className="text-green-500 hover:text-green-400 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300">
                            Open →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 🔄 Recent Booking Services Section */}
              <div className="text-left mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Recent Booking Services</h2>
                    <p className="text-gray-400">Manage and track your service bookings and their status.</p>
                  </div>
                  <button className="text-green-500 hover:text-green-400 flex items-center space-x-2 transition">
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 🔳 Table Container */}
                <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">

                  {/* 🧪 Filter Controls */}
                  <div className="p-6 border-b border-gray-700 bg-gray-800/50">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* 🔍 Search */}
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

                      {/* 🧃 Filters */}
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
                              <option key={opt} value={opt}>{label === "Date" && opt === "all" ? "All Time" : opt[0].toUpperCase() + opt.slice(1)}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      ))}

                      {/* ❌ Clear Filters */}
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

                    {/* 🧷 Active Filters */}
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

                    {/* 📈 Result Count */}
                    <div className="mt-3 text-sm text-gray-400">
                      Showing {sortedBookings.length} of {bookingServices.length} bookings
                    </div>
                  </div>

                  {/* 📋 Table */}
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

                          {/* 💼 Actions Column - Admin Controls */}
                          <th className="px-6 py-4 text-left text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {sortedBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-800 transition">
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
                                <span className="capitalize">{booking.status}</span>
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-sm">{booking.duration}</td>
                            <td className="px-6 py-4">
                              <span className={getPriorityBadge(booking.priority)}>
                                {booking.priority.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {/* Status Dropdown */}
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                                disabled={booking.locked}
                                className="bg-gray-800 text-white px-2 py-1 rounded"
                              >
                                {statusList.map((status) => (
                                  <option key={status} value={status}>
                                    {status.replace(/_/g, " ").toUpperCase()}
                                  </option>
                                ))}
                              </select>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Community Section */}
              <div className="text-left">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">From the Community</h2>
                    <p className="text-gray-400">Explore what the community is building with v0.</p>
                  </div>
                  <button className="text-green-500 hover:text-green-400 flex items-center space-x-2 transition-colors">
                    <span>Browse All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {communityProjects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-green-500 transition-all duration-200 transform hover:scale-105 group"
                    >
                      <div className="relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-white mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">by {project.author}</p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{project.likes} likes</span>
                          <span>{project.views} views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}