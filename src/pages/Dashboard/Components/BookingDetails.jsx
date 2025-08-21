
import { useState, useEffect } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft, User, Mail, Phone, Calendar, FileText, CreditCard,
    MessageSquare, Activity, CheckCircle, Clock, AlertTriangle,
    Edit, Save, X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import API from "@/utils/axios";
export default function BookingDetails() {
    const navigate = useNavigate()
    const { id } = useParams() // booking ID from URL
    const [booking, setBooking] = useState(null)
    const [isEditingStatus, setIsEditingStatus] = useState(false)
    const [isEditingNotes, setIsEditingNotes] = useState(false)
    const [newStatus, setNewStatus] = useState("")
    const [adminNotes, setAdminNotes] = useState("")

    // Fetch booking details on mount
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await API.get(`/bookings/${id}`)
                setBooking(res.data)
                setNewStatus(res.data.status)
                setAdminNotes(res.data.adminNotes)
            } catch (err) {
                console.error("Error fetching booking:", err)
            }
        }
        fetchBooking()
    }, [id])

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved": return "bg-success/20 text-success border border-success/30"
            case "pending": return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            case "rejected": return "bg-destructive/20 text-destructive border border-destructive/30"
            case "in-progress": return "bg-accent/20 text-accent border border-accent/30"
            case "completed": return "bg-primary/20 text-primary border border-primary/30"
            default: return "bg-muted/20 text-muted-foreground border border-border"
        }
    }

    const getPaymentStatusBadge = (status) => {
        switch (status) {
            case "paid": return "bg-success/20 text-success border border-success/30"
            case "pending": return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            case "refunded": return "bg-destructive/20 text-destructive border border-destructive/30"
            default: return "bg-muted/20 text-muted-foreground border border-border"
        }
    }

    const formatDate = (dateString) => new Date(dateString).toLocaleString()

    const handleStatusUpdate = async () => {
        try {
            await API.put(`/bookings/${id}/status`, { status: newStatus })
            setBooking(prev => ({ ...prev, status: newStatus }))
            setIsEditingStatus(false)
        } catch (err) {
            console.error("Error updating status:", err)
        }
    }

    const handleNotesUpdate = async () => {
        try {
            await API.put(`/bookings/${id}/notes`, { adminNotes })
            setBooking(prev => ({ ...prev, adminNotes }))
            setIsEditingNotes(false)
        } catch (err) {
            console.error("Error updating notes:", err)
        }
    }

    if (!booking) return <p>Loading booking details...</p>

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(-1)}
                            className="border-border hover:bg-hover-bg"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Booking Details</h1>
                            <p className="text-muted-foreground">Booking ID: {booking.id}</p>
                        </div>
                    </div>
                    <Badge className={`px-3 py-1 text-sm font-medium ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                    </Badge>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* User Information */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card className="bg-card border-border">
                                <CardHeader>
                                    <CardTitle className="text-foreground flex items-center">
                                        <User className="w-5 h-5 mr-2" />
                                        User Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={booking?.assignedDeveloper?.avatar || "/placeholder.svg"} />
                                            <AvatarFallback>
                                                {booking?.assignedDeveloper?.name
                                                    ? booking.assignedDeveloper.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                    : "NA"}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {booking?.user?.fullName || "Unknown User"}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {booking?.user?.email || "No email provided"}
                                            </p>
                                        </div>

                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Mail className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm text-foreground">
                                                {booking?.user?.email || "No email"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Phone className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm text-foreground">
                                                {booking?.user?.phone || "No phone"}
                                            </span>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Template Booked */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="bg-card border-border">
                                <CardHeader>
                                    <CardTitle className="text-foreground flex items-center">
                                        <FileText className="w-5 h-5 mr-2" />
                                        Template Booked
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-20 h-20 bg-primary/20 rounded-lg flex items-center justify-center">
                                            <FileText className="w-8 h-8 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">
                                                {booking?.template?.name || "No template name"}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {booking?.template?.category || "No category"}
                                            </p>
                                            <Badge variant="outline" className="mt-2">Template</Badge>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Project Requirements */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card className="bg-card border-border">
                                <CardHeader>
                                    <CardTitle className="text-foreground">Project Requirements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground leading-relaxed">{booking.projectRequirements}</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Admin Notes */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Card className="bg-card border-border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                    <CardTitle className="text-foreground flex items-center">
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        Admin Notes
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditingNotes(!isEditingNotes)}
                                    >
                                        {isEditingNotes ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {isEditingNotes ? (
                                        <div className="space-y-3">
                                            <Textarea
                                                value={adminNotes || booking.adminNotes}
                                                onChange={(e) => setAdminNotes(e.target.value)}
                                                placeholder="Add admin notes..."
                                                className="bg-background border-border"
                                            />
                                            <div className="flex space-x-2">
                                                <Button size="sm" onClick={handleNotesUpdate}>
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(false)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-foreground">{booking.adminNotes}</p>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column - Status & Info */}
                    <div className="space-y-6">
                        {/* Booking Status */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Card className="bg-card border-border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                    <CardTitle className="text-foreground">Booking Status</CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditingStatus(!isEditingStatus)}
                                    >
                                        {isEditingStatus ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {isEditingStatus ? (
                                        <div className="space-y-3">
                                            <Select value={newStatus || booking.status} onValueChange={setNewStatus}>
                                                <SelectTrigger className="bg-background border-border">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="approved">Approved</SelectItem>
                                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="rejected">Rejected</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="flex space-x-2">
                                                <Button size="sm" onClick={handleStatusUpdate}>
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Update
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => setIsEditingStatus(false)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Badge className={`px-3 py-1 text-sm font-medium ${getStatusBadge(booking.status)}`}>
                                            {booking.status}
                                        </Badge>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Booking Details */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="bg-card border-border">
                                <CardHeader>
                                    <CardTitle className="text-foreground">Booking Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Booking Date:</span>
                                        <span className="text-foreground">
                                            {booking?.bookingDate ? formatDate(booking.bookingDate) : "N/A"}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Amount:</span>
                                        <span className="text-foreground font-semibold">
                                            ${booking?.amount ? booking.amount.toLocaleString() : "0"}
                                        </span>
                                    </div>

                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Payment Status */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card className="bg-card border-border">
                                <CardHeader>
                                    <CardTitle className="text-foreground flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2" />
                                        Payment Status
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Badge className={`px-3 py-1 text-sm font-medium ${getPaymentStatusBadge(booking.paymentStatus)}`}>
                                        {booking.paymentStatus}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Assigned Developer */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Card className="bg-card border-border">
                                <CardHeader>
                                    <CardTitle className="text-foreground">Assigned Developer</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={booking?.assignedDeveloper?.avatar || "/placeholder.svg"} />
                                            <AvatarFallback>
                                                {booking?.assignedDeveloper?.name
                                                    ? booking.assignedDeveloper.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                    : "NA"}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <p className="font-medium text-foreground">
                                                {booking?.assignedDeveloper?.name || "NA"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Senior Developer</p>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Activity Log */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Card className="bg-card border-border">
                                <CardHeader>
                                    <CardTitle className="text-foreground flex items-center">
                                        <Activity className="w-5 h-5 mr-2" />
                                        Activity Log
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {booking?.activityLog?.length > 0 ? (
                                            booking.activityLog.map((activity) => (
                                                <div key={activity.id} className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                                                        <p className="text-xs text-muted-foreground">by {activity.user}</p>
                                                        <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No activity yet</p>
                                        )}
                                    </div>

                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}