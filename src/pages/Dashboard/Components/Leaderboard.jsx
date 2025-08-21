import { motion } from "framer-motion"
import { Crown, Award, Trophy, Star, TrendingUp, Medal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Leaderboard() {
    const leaderboard = [
        { rank: 1, name: "Alex Rodriguez", points: 15420, avatar: "/placeholder.svg", badge: "gold", templates: 47, downloads: 125000 },
        { rank: 2, name: "Sarah Johnson", points: 14890, avatar: "/placeholder.svg", badge: "silver", templates: 42, downloads: 118000 },
        { rank: 3, name: "Mike Chen", points: 13750, avatar: "/placeholder.svg", badge: "bronze", templates: 38, downloads: 98000 },
        { rank: 4, name: "Emma Wilson", points: 12340, avatar: "/placeholder.svg", badge: null, templates: 35, downloads: 87000 },
        { rank: 5, name: "David Park", points: 11890, avatar: "/placeholder.svg", badge: null, templates: 32, downloads: 76000 },
        { rank: 6, name: "Lisa Zhang", points: 10450, avatar: "/placeholder.svg", badge: null, templates: 29, downloads: 65000 },
        { rank: 7, name: "Tom Anderson", points: 9870, avatar: "/placeholder.svg", badge: null, templates: 27, downloads: 58000 },
        { rank: 8, name: "Nina Patel", points: 9120, avatar: "/placeholder.svg", badge: null, templates: 25, downloads: 52000 },
        { rank: 9, name: "James Kim", points: 8450, avatar: "/placeholder.svg", badge: null, templates: 23, downloads: 47000 },
        { rank: 10, name: "Maria Garcia", points: 7890, avatar: "/placeholder.svg", badge: null, templates: 21, downloads: 42000 },
        { rank: 11, name: "Carlos Rodriguez", points: 7345, avatar: "/placeholder.svg", badge: null, templates: 19, downloads: 38000 },
        { rank: 12, name: "Sophia Lee", points: 6890, avatar: "/placeholder.svg", badge: null, templates: 17, downloads: 34000 },
        { rank: 13, name: "Ryan Williams", points: 6234, avatar: "/placeholder.svg", badge: null, templates: 16, downloads: 31000 },
        { rank: 14, name: "Anna Brown", points: 5876, avatar: "/placeholder.svg", badge: null, templates: 15, downloads: 28000 },
        { rank: 15, name: "Kevin Davis", points: 5432, avatar: "/placeholder.svg", badge: null, templates: 14, downloads: 25000 },
        { rank: 16, name: "Julia Martinez", points: 5023, avatar: "/placeholder.svg", badge: null, templates: 13, downloads: 22000 },
        { rank: 17, name: "Daniel Taylor", points: 4789, avatar: "/placeholder.svg", badge: null, templates: 12, downloads: 19000 },
        { rank: 18, name: "Michelle White", points: 4456, avatar: "/placeholder.svg", badge: null, templates: 11, downloads: 17000 },
        { rank: 19, name: "Andrew Miller", points: 4123, avatar: "/placeholder.svg", badge: null, templates: 10, downloads: 15000 },
        { rank: 20, name: "Rachel Green", points: 3890, avatar: "/placeholder.svg", badge: null, templates: 9, downloads: 13000 }
    ]

    const getBadgeIcon = (badge) => {
        const icons = {
            gold: <Crown className="w-5 h-5 text-yellow-500" />,
            silver: <Award className="w-5 h-5 text-gray-400" />,
            bronze: <Trophy className="w-5 h-5 text-orange-500" />
        }
        return icons[badge] || null
    }

    const getRankBadge = (rank) => {
        if (rank <= 3) {
            const colors = {
                1: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
                2: "bg-gradient-to-r from-gray-400 to-gray-500 text-white", 
                3: "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
            }
            return colors[rank]
        }
        return "bg-slate-700/50 text-purple-300"
    }

    return (
        <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center sm:text-left"
            >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    Leaderboard
                </h1>
                <p className="text-purple-300 text-sm sm:text-base">
                    Top contributors and template creators in our community
                </p>
            </motion.div>

            {/* Top 3 Podium */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
                {leaderboard.slice(0, 3).map((user, index) => (
                    <motion.div
                        key={user.rank}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
                    >
                        <Card className={`bg-slate-800/50 border-purple-400/20 backdrop-blur-sm relative overflow-hidden ${
                            user.rank === 1 ? 'ring-2 ring-yellow-500/50' : 
                            user.rank === 2 ? 'ring-2 ring-gray-400/50' :
                            'ring-2 ring-orange-500/50'
                        }`}>
                            <CardContent className="p-6 text-center">
                                <div className="relative mb-4">
                                    <Avatar className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto ring-4 ${
                                        user.rank === 1 ? 'ring-yellow-500/50' :
                                        user.rank === 2 ? 'ring-gray-400/50' :
                                        'ring-orange-500/50'
                                    }`}>
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -top-2 -right-2">
                                        {getBadgeIcon(user.badge)}
                                    </div>
                                </div>
                                <Badge className={`${getRankBadge(user.rank)} mb-2`}>
                                    #{user.rank}
                                </Badge>
                                <h3 className="text-white font-bold text-lg mb-1">{user.name}</h3>
                                <p className="text-purple-300 text-2xl font-bold mb-2">{user.points.toLocaleString()}</p>
                                <div className="text-xs text-purple-200 space-y-1">
                                    <div>{user.templates} templates</div>
                                    <div>{user.downloads.toLocaleString()} downloads</div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Full Leaderboard */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="bg-slate-800/50 border-purple-400/20 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white text-xl flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-purple-400" />
                            Full Rankings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {leaderboard.map((user, index) => (
                                <motion.div
                                    key={user.rank}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="flex items-center justify-between p-3 sm:p-4 bg-slate-900/30 rounded-lg hover:bg-slate-900/50 transition-colors"
                                >
                                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                                        <Badge className={getRankBadge(user.rank)}>
                                            #{user.rank}
                                        </Badge>
                                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 ring-2 ring-purple-400/30">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-white font-medium text-sm sm:text-base truncate">
                                                    {user.name}
                                                </h4>
                                                {getBadgeIcon(user.badge)}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-purple-300 mt-1">
                                                <span>{user.templates} templates</span>
                                                <span>{user.downloads.toLocaleString()} downloads</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold text-lg">
                                            {user.points.toLocaleString()}
                                        </p>
                                        <p className="text-purple-300 text-xs">points</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}