"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Briefcase,
  Twitter,
  Star,
  GitFork,
  X,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Tweet } from "react-tweet";
import DashNav from "@/components/custom-components/DashNav";

// Interfaces
interface SocialLinks {
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

interface ProofOfWork {
  platform: string;
  postUrl: string;
  description: string | null;
  addedAt: string;
  id: string;
}

interface User {
  _id: string;
  userName: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  skills: string[];
  interests: string[];
  socialLinks?: SocialLinks;
  proofOfWork?: ProofOfWork[];
  hackathons: string[];
  teams: string[];
  createdAt: string;
}

export default function UserProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // Make sure the API endpoint is correct
        console.log(`Fetching user with ID: ${id}`);
        const res = await axios.get(`/api/user/${id}`);
        console.log("API response:", res.data);
        setUser(res.data.user);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err?.response?.data?.error || "Failed to fetch user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <DashNav />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#050A14] to-[#0f172a] text-white">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
          <p className="text-blue-300 animate-pulse">Loading profile...</p>
        </div>
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <DashNav />
        <div className="min-h-screen flex items-center justify-center bg-[#050A14] text-white">
          <div className="bg-red-500/10 border border-red-400 p-6 rounded-xl text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-red-400 mb-4" />
            <p className="text-red-300 text-lg">{error || "User not found."}</p>
            <Link href="/dashboard">
              <button className="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-md text-white transition-colors">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
  };

  return (
    <>
      <DashNav />
      <div className="min-h-screen p-4 md:p-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo--800 via-blue-600 to-blue-400 opacity-90"></div>
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
                    <AvatarFallback className="bg-white text-blue-700 text-3xl font-bold">
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
                <p className="text-blue-200 text-lg mb-2">{user.email}</p>

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
                  {user.hackathons && user.hackathons.length > 0 && (
                    <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                      <Trophy className="w-3.5 h-3.5 mr-1" />
                      {user.hackathons.length} Hackathon{user.hackathons.length !== 1 ? "s" : ""}
                    </Badge>
                  )}
                  {user.teams && user.teams.length > 0 && (
                    <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                      <Users className="w-3.5 h-3.5 mr-1" />
                      {user.teams.length} Team{user.teams.length !== 1 ? "s" : ""}
                    </Badge>
                  )}
                  {user.proofOfWork && user.proofOfWork.length > 0 && (
                    <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-3 py-1">
                      <Briefcase className="w-3.5 h-3.5 mr-1" />
                      {user.proofOfWork.length} Proof{user.proofOfWork.length !== 1 ? "s" : ""} of Work
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

          {/* Profile Content */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 mb-6">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="skills" className="data-[state=active]:bg-blue-600">
                  Skills & Interests
                </TabsTrigger>
                <TabsTrigger value="pow" className="data-[state=active]:bg-blue-600">
                  Proof of Work
                </TabsTrigger>
                <TabsTrigger value="hackathons" className="data-[state=active]:bg-blue-600">
                  Hackathons & Teams
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileCard icon={<Code className="w-5 h-5 text-blue-400" />} title="Bio" content={user.bio} />
                  <ProfileCard
                    icon={<MapPin className="w-5 h-5 text-blue-400" />}
                    title="Location"
                    content={user.location}
                  />
                  <ProfileCard
                    icon={<Calendar className="w-5 h-5 text-blue-400" />}
                    title="Joined On"
                    content={new Date(user.createdAt).toLocaleDateString()}
                  />
                  <ProfileCard
                    icon={<Globe className="w-5 h-5 text-blue-400" />}
                    title="Social Links"
                    social={user.socialLinks}
                  />
                </div>
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileCard
                    icon={<Code className="w-5 h-5 text-blue-400" />}
                    title="Skills"
                    items={user.skills}
                    emptyMessage="No skills added yet"
                    badgeColor="bg-blue-600/50 hover:bg-blue-600/70 border-blue-500"
                  />
                  <ProfileCard
                    icon={<Heart className="w-5 h-5 text-blue-400" />}
                    title="Interests"
                    items={user.interests}
                    emptyMessage="No interests added yet"
                    badgeColor="bg-pink-600/50 hover:bg-pink-600/70 border-pink-500"
                  />
                </div>
              </TabsContent>

              {/* Proof of Work Tab */}
              <TabsContent value="pow" className="mt-0">
                <div className="grid grid-cols-1 gap-6">
                  {user.proofOfWork && user.proofOfWork.length > 0 ? (
                    user.proofOfWork.map((pow, index) => (
                      <EnhancedProofOfWorkCard key={pow.id || index} pow={pow} />
                    ))
                  ) : (
                    <Card className="bg-white/5 border border-white/10 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center text-center p-8">
                          <Briefcase className="w-12 h-12 text-blue-400/50 mb-4" />
                          <h3 className="text-xl font-medium text-white mb-2">No Proof of Work Added</h3>
                          <p className="text-white/60 mb-6 max-w-md">
                            This user hasn't added any proof of work yet.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="hackathons" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileCard
                    icon={<Trophy className="w-5 h-5 text-blue-400" />}
                    title="Hackathons"
                    items={user.hackathons?.map((hack) => hack.toString()) || []}
                    prefix="ID: "
                    emptyMessage="No hackathons joined yet"
                    badgeColor="bg-amber-600/50 hover:bg-amber-600/70 border-amber-500"
                  />
                  <ProfileCard
                    icon={<Users className="w-5 h-5 text-blue-400" />}
                    title="Teams"
                    items={user.teams || []}
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
    </>
  );
}

// Reusable components (copy from your DashInfo component)
const SocialButton = ({ url, icon, label }: { url?: string; icon: React.ReactNode; label: string }) => {
  if (!url) {
    return null;
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
  );
};

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
  icon: React.ReactNode;
  title: string;
  content?: string;
  items?: string[];
  prefix?: string;
  social?: SocialLinks;
  emptyMessage?: string;
  badgeColor?: string;
}) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/50 transition-colors">
        <CardContent className="p-0">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-900/50 p-2 rounded-md">{icon}</div>
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
  );
};

const SocialLink = ({ icon, label, url }: { icon: React.ReactNode; label: string; url?: string }) => {
  if (!url) {
    return (
      <p className="flex items-center gap-2 text-white/40 italic">
        {icon}
        <span>{label} - Not provided</span>
      </p>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors group"
    >
      {icon}
      <span>{label}</span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
};

// Enhanced Proof of Work Card component with embedded content
const EnhancedProofOfWorkCard = ({ pow }: { pow: ProofOfWork }) => {
  // Extract tweet ID from URL for Twitter embeds
  const getTweetId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1].split('?')[0];
  };

  // Get platform icon based on platform type
  const getPlatformIcon = () => {
    switch (pow.platform) {
      case "twitter":
        return <X className="h-5 w-5 text-blue-400" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      case "github":
        return <Github className="h-5 w-5 text-white" />;
      default:
        return <Globe className="h-5 w-5 text-blue-400" />;
    }
  };

  // Get platform name for display
  const getPlatformName = () => {
    switch (pow.platform) {
      case "twitter":
        return "Twitter";
      case "linkedin":
        return "LinkedIn";
      case "github":
        return "GitHub";
      default:
        return "External Link";
    }
  };

  // Get platform-specific styling
  const getPlatformStyle = () => {
    switch (pow.platform) {
      case "twitter":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400";
      case "linkedin":
        return "bg-blue-700/20 border-blue-700/30 text-blue-300";
      case "github":
        return "bg-gray-700/30 border-gray-600/30 text-gray-300";
      default:
        return "bg-blue-600/20 border-blue-600/30 text-blue-300";
    }
  };

  // Get a default title if description is missing
  const getTitle = () => {
    if (pow.description) {
      return pow.description;
    }
    return `${getPlatformName()} Content`;
  };

  return (
    <Card className="bg-[#0B1120] border border-white/10 overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-full ${getPlatformStyle()}`}>
              {getPlatformIcon()}
            </div>
            <div>
              <div className="text-lg font-medium text-white">{getTitle()}</div>
              <div className="text-sm text-gray-400 flex items-center gap-1">
                <span>Added on {new Date(pow.addedAt).toLocaleDateString()}</span>
                <span className="mx-1">•</span>
                <span className="flex items-center gap-1">
                  {getPlatformIcon()}
                  <span className="text-xs">{getPlatformName()}</span>
                </span>
              </div>
            </div>
          </div>
          
          {pow.platform === "twitter" && (
            <div className="mt-4 bg-black rounded-xl overflow-hidden">
              <div className="flex justify-center">
                <Tweet id={getTweetId(pow.postUrl)} />
              </div>
            </div>
          )}
          
          {pow.platform === "linkedin" && (
            <div className="mt-4 p-6 bg-blue-700/10 border border-blue-700/30 rounded-xl">
              <div className="flex flex-col items-center gap-4">
                <Linkedin className="h-12 w-12 text-blue-600" />
                <p className="text-center text-white/80">
                  LinkedIn content cannot be displayed directly due to embedding restrictions.
                </p>
                <a
                  href={pow.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md transition-colors flex items-center gap-2"
                >
                  View on LinkedIn <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
          
          {pow.platform === "github" && (
            <div className="mt-4 p-4 bg-gray-900 border border-gray-700 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Github className="h-6 w-6 text-white" />
                <h3 className="text-lg font-medium text-white">
                  {pow.postUrl.replace('https://github.com/', '')}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  <span>Repository</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Stars</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  <span>Forks</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <a
                  href={pow.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors flex items-center gap-2"
                >
                  View Repository <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
          
          {/* Only show View button for Twitter since the content is already embedded */}
          {pow.platform === "twitter" && (
            <div className="mt-4 flex justify-end">
              <a
                href={pow.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 ${getPlatformStyle()} rounded-md transition-colors flex items-center gap-2`}
              >
                View on Twitter <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
