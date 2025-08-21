import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import {
    Clock, Star, Edit3, Camera, Save, Globe, Github, Linkedin, Twitter,
    Calendar, Award, Target, TrendingUp, CheckCircle, AlertCircle, DollarSign
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        bio: "Full-stack developer passionate about creating beautiful and functional web applications. Experienced in React, Node.js, and modern web technologies.",
        website: "https://johndoe.dev",
        github: "johndoe",
        linkedin: "johndoe",
        twitter: "@johndoe"
    })

// eslint-disable-next-line no-unused-vars
    const [stats] = useState({
        projectsCompleted: 47,
        totalRevenue: 125000,
        activeProjects: 3,
        clientSatisfaction: 98
    })

    const [recentActivity] = useState([
        {
            id: 1,
            action: "Template uploaded",
            description: "Modern Dashboard Pro template was approved",
            timestamp: "2 hours ago",
            type: "upload"
        },
        {
            id: 2,
            action: "Profile updated",
            description: "Updated bio and social links",
            timestamp: "1 day ago",
            type: "profile"
        },
        {
            id: 3,
            action: "Achievement earned",
            description: "Reached 10,000 downloads milestone",
            timestamp: "3 days ago",
            type: "achievement"
        },
        {
            id: 4,
            action: "Template featured",
            description: "E-commerce Landing template was featured",
            timestamp: "1 week ago",
            type: "featured"
        }
    ])

    const handleSave = () => {
        setIsEditing(false)
        console.log("Saving profile:", profile)
    }

    return (
        <div className="space-y-8 p-4 sm:p-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Profile</h1>
                    <p className="text-purple-300">Manage your profile information and view your activity.</p>
                </div>
                <Button
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    variant="outline"
                    className="border-purple-400/50 hover:bg-purple-500/20 text-purple-300 hover:text-white"
                >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
            >
                {[
                    { label: "Templates", value: "15", icon: Target, color: "green" },
                    { label: "Downloads", value: "12K", icon: CheckCircle, color: "blue" },
                    { label: "Rating", value: "4.8", icon: Star, color: "yellow" },
                    { label: "Achievements", value: "7", icon: Award, color: "purple" }
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="bg-slate-800/50 border-purple-400/20 backdrop-blur-sm">
                            <CardContent className="p-3 sm:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs sm:text-sm text-purple-300 mb-1">{stat.label}</p>
                                        <p className="text-lg sm:text-2xl font-bold text-white">{stat.value}</p>
                                    </div>
                                    <div className={`p-2 sm:p-3 rounded-full bg-${stat.color}-500/20`}>
                                        <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 text-${stat.color}-400`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Content */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="bg-slate-800/50 border border-purple-400/20 w-full sm:w-auto">
                        <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500/20">
                            Profile Information
                        </TabsTrigger>
                        <TabsTrigger value="activity" className="data-[state=active]:bg-purple-500/20">
                            Activity
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Information Tab */}
                    <TabsContent value="profile">
                        <Card className="bg-slate-800/50 border-purple-400/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Profile Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="relative">
                                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 ring-4 ring-purple-400/50">
                                            <AvatarImage src="/placeholder.svg" />
                                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl sm:text-2xl">
                                                {profile.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        {isEditing && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full border-purple-400/50 bg-slate-800 hover:bg-purple-500/20"
                                            >
                                                <Camera className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <div className="text-center sm:text-left space-y-2">
                                        <h2 className="text-xl sm:text-2xl font-bold text-white">{profile.name}</h2>
                                        <p className="text-purple-300">{profile.email}</p>
                                        <Badge variant="outline" className="border-green-400/50 text-green-300">
                                            Active
                                        </Badge>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        {[
                                            { label: "Full Name", key: "name", type: "text" },
                                            { label: "Email", key: "email", type: "email" },
                                            { label: "Phone", key: "phone", type: "text" },
                                            { label: "Location", key: "location", type: "text" }
                                        ].map((field) => (
                                            <div key={field.key}>
                                                <label className="text-sm font-medium text-purple-200 mb-2 block">{field.label}</label>
                                                {isEditing ? (
                                                    <Input
                                                        type={field.type}
                                                        value={profile[field.key]}
                                                        onChange={(e) => setProfile({...profile, [field.key]: e.target.value})}
                                                        className="bg-slate-900/50 border-purple-400/30 text-white"
                                                    />
                                                ) : (
                                                    <p className="text-white bg-slate-900/30 p-3 rounded-lg">{profile[field.key]}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-purple-200 mb-2 block">Bio</label>
                                            {isEditing ? (
                                                <Textarea
                                                    value={profile.bio}
                                                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                                    className="bg-slate-900/50 border-purple-400/30 text-white min-h-[120px]"
                                                />
                                            ) : (
                                                <p className="text-white bg-slate-900/30 p-3 rounded-lg min-h-[120px]">{profile.bio}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-purple-200 mb-2 block">Website</label>
                                            {isEditing ? (
                                                <Input
                                                    value={profile.website}
                                                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                                                    className="bg-slate-900/50 border-purple-400/30 text-white"
                                                />
                                            ) : (
                                                <p className="text-white bg-slate-900/30 p-3 rounded-lg">{profile.website}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Activity Tab */}
                    <TabsContent value="activity">
                        <Card className="bg-slate-800/50 border-purple-400/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivity.map((activity, index) => (
                                        <motion.div
                                            key={activity.id}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="flex items-start space-x-4 p-4 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition-colors"
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                activity.type === 'upload' ? 'bg-green-500/20' :
                                                activity.type === 'profile' ? 'bg-blue-500/20' :
                                                activity.type === 'achievement' ? 'bg-yellow-500/20' :
                                                'bg-purple-500/20'
                                            }`}>
                                                {activity.type === 'upload' && <Target className="w-5 h-5 text-green-400" />}
                                                {activity.type === 'profile' && <Edit3 className="w-5 h-5 text-blue-400" />}
                                                {activity.type === 'achievement' && <Award className="w-5 h-5 text-yellow-400" />}
                                                {activity.type === 'featured' && <Star className="w-5 h-5 text-purple-400" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-medium text-sm sm:text-base">{activity.action}</h4>
                                                <p className="text-purple-300 text-xs sm:text-sm mt-1">{activity.description}</p>
                                                <p className="text-purple-200 text-xs mt-2">{activity.timestamp}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
}