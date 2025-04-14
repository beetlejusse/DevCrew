"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Loader2,
  Github,
  Linkedin,
  Globe,
  AlertTriangle,
  MapPin,
  Calendar,
  Code,
  Heart,
  Trophy,
  Users,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { JSX } from "react/jsx-runtime"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface SocialLinks {
  github?: string
  linkedin?: string
  portfolio?: string
}

interface User {
  userName: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  skills: string[]
  interests: string[]
  socialLinks?: SocialLinks
  hackathons: string[]
  teams: string[]
  createdAt: string
}

export default function DashInfo() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMissingData, setHasMissingData] = useState<boolean>(false)
  const [profileCompleteness, setProfileCompleteness] = useState<number>(0)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/api/user")
        const fetchedUser: User = res.data.user

        // Check for missing data
        const missingFields = [
          !fetchedUser.avatar,
          !fetchedUser.bio,
          !fetchedUser.location,
          fetchedUser.skills.length === 0,
          fetchedUser.interests.length === 0,
          !fetchedUser.socialLinks?.github,
          !fetchedUser.socialLinks?.linkedin,
          !fetchedUser.socialLinks?.portfolio,
          fetchedUser.hackathons.length === 0,
          fetchedUser.teams.length === 0,
        ]

        const missingData = missingFields.some((field) => field)
        setHasMissingData(missingData)

        // Calculate profile completeness
        const totalFields = missingFields.length
        const completedFields = missingFields.filter((field) => !field).length
        const completeness = Math.round((completedFields / totalFields) * 100)
        setProfileCompleteness(completeness)

        setUser(fetchedUser)
      } catch (err) {
        setError("Failed to fetch user details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#050A14] to-[#0f172a] text-white">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500 mb-4" />
        <p className="text-purple-300 animate-pulse">Loading your profile...</p>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050A14] text-white">
        <div className="bg-red-500/10 border border-red-400 p-6 rounded-xl text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-red-400 mb-4" />
          <p className="text-red-300 text-lg">{error || "User not found."}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-md text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 opacity-90"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>

          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 p-6 md:p-8">
            <div className="flex-shrink-0">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
                  <AvatarImage src={user.avatar || ""} alt={user.userName} />
                  <AvatarFallback className="bg-white text-purple-700 text-3xl font-bold">
                    {user.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {user.avatar && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 p-1 rounded-full border-2 border-white">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{user.userName}</h1>
              <p className="text-purple-200 text-lg mb-2">{user.email}</p>

              {user.bio && <p className="text-white/80 max-w-2xl mb-2 hidden md:block">{user.bio}</p>}

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {user.location && (
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {user.location}
                  </Badge>
                )}
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </Badge>
                {user.hackathons.length > 0 && (
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                    <Trophy className="w-3.5 h-3.5 mr-1" />
                    {user.hackathons.length} Hackathon{user.hackathons.length !== 1 ? "s" : ""}
                  </Badge>
                )}
                {user.teams.length > 0 && (
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                    <Users className="w-3.5 h-3.5 mr-1" />
                    {user.teams.length} Team{user.teams.length !== 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 mt-4 md:mt-0 flex gap-2">
              <SocialButton url={user.socialLinks?.github} icon={<Github className="w-5 h-5" />} label="GitHub" />
              <SocialButton url={user.socialLinks?.linkedin} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
              <SocialButton url={user.socialLinks?.portfolio} icon={<Globe className="w-5 h-5" />} label="Portfolio" />
            </div>
          </div>
        </motion.div>

        {/* Profile Completeness */}
        {hasMissingData && (
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-yellow-500/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-shrink-0 bg-yellow-500/20 p-3 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-yellow-300 mb-1">Complete your profile</h3>
                    <p className="text-yellow-200/70 mb-2">
                      Enhance your visibility and unlock all features by completing your profile.
                    </p>
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-yellow-300/80 mb-1">
                        <span>Profile Completeness</span>
                        <span>{profileCompleteness}%</span>
                      </div>
                      <Progress
                        value={profileCompleteness}
                        className="h-2 bg-yellow-950"
                        // indicatorClassName="bg-gradient-to-r from-yellow-400 to-amber-300"
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href="/profile">
                    <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-md transition-colors flex items-center gap-1">
                      Edit Profile <ChevronRight className="w-4 h-4" />
                    </button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Profile Content */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-purple-600">
                Skills & Interests
              </TabsTrigger>
              <TabsTrigger value="hackathons" className="data-[state=active]:bg-purple-600">
                Hackathons & Teams
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileCard icon={<Code className="w-5 h-5 text-purple-400" />} title="Bio" content={user.bio} />
                <ProfileCard
                  icon={<MapPin className="w-5 h-5 text-purple-400" />}
                  title="Location"
                  content={user.location}
                />
                <ProfileCard
                  icon={<Calendar className="w-5 h-5 text-purple-400" />}
                  title="Joined On"
                  content={new Date(user.createdAt).toLocaleDateString()}
                />
                <ProfileCard
                  icon={<Globe className="w-5 h-5 text-purple-400" />}
                  title="Social Links"
                  social={user.socialLinks}
                />
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileCard
                  icon={<Code className="w-5 h-5 text-purple-400" />}
                  title="Skills"
                  items={user.skills}
                  emptyMessage="No skills added yet"
                  badgeColor="bg-purple-600/50 hover:bg-purple-600/70 border-purple-500"
                />
                <ProfileCard
                  icon={<Heart className="w-5 h-5 text-purple-400" />}
                  title="Interests"
                  items={user.interests}
                  emptyMessage="No interests added yet"
                  badgeColor="bg-pink-600/50 hover:bg-pink-600/70 border-pink-500"
                />
              </div>
            </TabsContent>

            <TabsContent value="hackathons" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileCard
                  icon={<Trophy className="w-5 h-5 text-purple-400" />}
                  title="Hackathons"
                  items={user.hackathons.map((hack) => hack.toString())}
                  prefix="ID: "
                  emptyMessage="No hackathons joined yet"
                  badgeColor="bg-amber-600/50 hover:bg-amber-600/70 border-amber-500"
                />
                <ProfileCard
                  icon={<Users className="w-5 h-5 text-purple-400" />}
                  title="Teams"
                  items={user.teams}
                  prefix="ID: "
                  emptyMessage="No teams joined yet"
                  badgeColor="bg-cyan-600/50 hover:bg-cyan-600/70 border-cyan-500"
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Reusable components

const SocialButton = ({ url, icon, label }: { url?: string; icon: JSX.Element; label: string }) => {
  if (!url) {
    return null
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      title={label}
    >
      {icon}
    </a>
  )
}

const ProfileCard = ({
  icon,
  title,
  content,
  items,
  prefix = "",
  social,
  emptyMessage = "Not provided",
  badgeColor = "bg-blue-600/50 hover:bg-blue-600/70 border-blue-500",
}: {
  icon: JSX.Element
  title: string
  content?: string
  items?: string[]
  prefix?: string
  social?: SocialLinks
  emptyMessage?: string
  badgeColor?: string
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/50 transition-colors">
        <CardContent className="p-0">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-purple-900/50 p-2 rounded-md">{icon}</div>
              <h3 className="text-lg font-medium text-white">{title}</h3>
            </div>

            {content !== undefined && (
              <div className="text-white/80 min-h-[40px]">
                {content ? content : <span className="text-white/40 italic">{emptyMessage}</span>}
              </div>
            )}

            {items && (
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <Badge key={index} className={`${badgeColor} text-white transition-colors`}>
                      {prefix}
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-white/40 italic">{emptyMessage}</span>
                )}
              </div>
            )}

            {social && (
              <div className="space-y-2 min-h-[40px]">
                <SocialLink icon={<Github className="w-4 h-4" />} label="GitHub" url={social.github} />
                <SocialLink icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" url={social.linkedin} />
                <SocialLink icon={<Globe className="w-4 h-4" />} label="Portfolio" url={social.portfolio} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const SocialLink = ({ icon, label, url }: { icon: JSX.Element; label: string; url?: string }) => {
  if (!url) {
    return (
      <p className="flex items-center gap-2 text-white/40 italic">
        {icon}
        <span>{label} - Not provided</span>
      </p>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors group"
    >
      {icon}
      <span>{label}</span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}
