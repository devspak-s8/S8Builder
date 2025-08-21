
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  Upload,
  Folder,
  Activity,
  Star,
  Download,
  Trophy,
  Crown,
  Award,
  BarChart3,
  User,
  FileText,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import API from "@/utils/axios"
export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentTemplates, setRecentTemplates] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalTemplates: 0,
    totalUsers: 0,
    totalBookings: 0,
    earnings: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard/overview");
        const data = res.data;

        setUser(data.user);
        setRecentBookings(data.recentBookings || []);
        setRecentTemplates(data.recentTemplates || []);
        setAnalytics(data.analytics || {});
      } catch (error) {
        console.error("Error fetching dashboard overview:", error);
      }
    };

    fetchDashboard();
  }, []);

  const handleViewBooking = (booking) => {
  navigate(`/user-dashboard/booking/${booking._id}`, { state: { booking } });
};


  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-success/20 text-success border border-success/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
      case "rejected":
        return "bg-destructive/20 text-destructive border border-destructive/30";
      case "in-progress":
        return "bg-accent/20 text-accent border border-accent/30";
      default:
        return "bg-muted/20 text-muted-foreground border border-border";
    }
  };

  const getBadgeIcon = (badge) => {
    const icons = {
      gold: <Crown className="w-4 h-4 text-yellow-500" />,
      silver: <Award className="w-4 h-4 text-gray-400" />,
      bronze: <Trophy className="w-4 h-4 text-orange-500" />,
    };
    return icons[badge] || null;
  };


  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Greeting + Quick Overview */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Good morning, {user?.name || "User"}! 👋
        </h1>
        <p className="text-muted-foreground text-sm">
          Here's what's happening with your projects today.
        </p>
      </motion.div>
      {/* Analytics Cards */}

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[
          { label: "Total Templates", value: analytics.totalTemplates, icon: FileText, color: "accent" },
          { label: "Total Bookings", value: analytics.totalBookings, icon: Calendar, color: "success" },
          { label: "Earnings", value: `$${analytics.earnings.toLocaleString()}`, icon: DollarSign, color: "yellow-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-card border-border hover:bg-hover-bg transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="p-2 rounded-full bg-primary/20">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Bookings */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Bookings Table */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Booking ID</TableHead>
                      <TableHead className="text-xs">User</TableHead>
                      <TableHead className="text-xs">Date</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.slice(0, 4).map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell className="font-medium text-sm">
                          {booking._id.slice(-6)} {/* last 6 chars for readability */}
                        </TableCell>
                        <TableCell className="text-sm">{booking.userName || "N/A"}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleViewBooking(booking)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>

                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </CardContent>
            </Card>
          </motion.div>

          {/* Active Projects */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Active Projects In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* <div className="space-y-3">
                  {activeProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-3 bg-background rounded-lg border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-foreground">
                          {project.name}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary rounded-full h-1.5 transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Due: {project.dueDate}
                      </p>
                    </div>
                  ))}
                </div> */}
              </CardContent>
            </Card>
          </motion.div>

          {/* Shortcuts */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      label: "Create New Project",
                      icon: Plus,
                      action: () => navigate("/builder"),
                    },
                    {
                      label: "Upload Template",
                      icon: Upload,
                      action: () => { },
                    },
                    {
                      label: "Open Builder",
                      icon: Settings,
                      action: () => navigate("/builder"),
                    },
                  ].map((shortcut) => (
                    <Button
                      key={shortcut.label}
                      variant="outline"
                      className="h-16 flex-col gap-1 bg-background hover:bg-hover-bg border-border text-xs"
                      onClick={shortcut.action}
                    >
                      <shortcut.icon className="w-4 h-4" />
                      <span>{shortcut.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-6">
          {/* Recent Templates */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Recent Templates
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-hover text-xs"
                  onClick={() => navigate("/user-dashboard/user-templates")}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTemplates.map((template) => (
                    <div
                      key={template._id}
                      className="flex items-center space-x-3 p-3 bg-background rounded-lg hover:bg-hover-bg transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-foreground font-medium text-sm truncate">
                          {template.title} {/* use 'name' from backend */}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          {template.uploaded_by_name || "N/A"} {/* optional */}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Download className="w-3 h-3 text-success" />
                            <span className="text-xs text-success">
                              {template.downloads || 0}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-yellow-400">
                              {template.rating || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top 10 Leaderboard */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-foreground">
                  Top 10 Builders
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-hover"
                  onClick={() => navigate("/leaderboard")}
                >
                  View More
                </Button>
              </CardHeader>
              <CardContent>
                {/* <div className="space-y-3">
                  {leaderboard.slice(0, 10).map((user) => (
                    <div
                      key={user.rank}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-hover-bg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-muted-foreground w-4">
                          {user.rank}
                        </span>
                        {getBadgeIcon(user.badge)}
                      </div>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.points.toLocaleString()} pts
                        </p>
                      </div>
                    </div>
                  ))}
                </div> */}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity Timeline */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          {activity.action}
                        </p>
                        <p className="text-sm text-primary">{activity.item}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div> */}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <FloatingActionButton />
    </div>
  );
}
