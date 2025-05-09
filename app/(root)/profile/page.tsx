"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Github,
  Linkedin,
  Globe,
  MapPin,
  User,
  Briefcase,
  Save,
  X,
  Camera,
  ChevronRight,
  Sparkles,
  Check,
  Plus,
  Link as LinkIcon,
  ExternalLink,
  Trash2,
  AlertCircle,
  Star,
  GitFork,
  Code,
} from "lucide-react";
import DashNav from "@/components/custom-components/DashNav";

// Import the TwitterEmbed component
import { TwitterEmbed } from "react-social-media-embed";

// Define interfaces for type safety
interface GitHubRepo {
  html_url: string;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

interface GitHubRepoDisplayProps {
  repoUrl: string;
}

interface LinkedInFallbackProps {
  linkedInUrl: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ProofOfWork {
  platform: string;
  postUrl: string;
  description: string | null;
  addedAt: string;
  id: string;
}

interface ProofOfWorkItemProps {
  pow: ProofOfWork;
  index: number;
}

// GitHub Repository Display Component
const GitHubRepoDisplay: React.FC<GitHubRepoDisplayProps> = ({ repoUrl }) => {
  const [repoData, setRepoData] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        // Extract user and repo from URL
        const urlParts = repoUrl.replace('https://github.com/', '').split('/');
        if (urlParts.length < 2) throw new Error("Invalid GitHub URL");
        
        const user = urlParts[0];
        const repo = urlParts[1];
        
        // Fetch repository data from GitHub API
        const response = await axios.get<GitHubRepo>(`https://api.github.com/repos/${user}/${repo}`);
        setRepoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub repo data:", error);
        setError(true);
        setLoading(false);
      }
    };

    if (repoUrl) {
      fetchRepoData();
    }
  }, [repoUrl]);

  if (loading) {
    return (
      <div className="border rounded-lg p-4 bg-background/50 w-full flex items-center justify-center">
        <div className="h-5 w-5 rounded-full border-2 border-primary border-r-transparent animate-spin mr-2"></div>
        <span className="text-sm text-muted-foreground">Loading repository...</span>
      </div>
    );
  }

  if (error || !repoData) {
    return (
      <div className="border rounded-lg p-4 bg-background/50 w-full">
        <a 
          href={repoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center justify-center gap-2"
        >
          <Github className="h-5 w-5" />
          View GitHub Repository
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="github-card border rounded-lg overflow-hidden bg-card/80 backdrop-blur-sm shadow-md">
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center gap-2 mb-2">
          <Github className="h-5 w-5 text-muted-foreground" />
          <a 
            href={repoData.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg font-semibold text-primary hover:underline"
          >
            {repoData.name}
          </a>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {repoData.description || "No description provided"}
        </p>
        <div className="flex items-center gap-4 text-sm">
          {repoData.language && (
            <div className="flex items-center gap-1">
              <Code className="h-4 w-4 text-muted-foreground" />
              <span>{repoData.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{repoData.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4 text-muted-foreground" />
            <span>{repoData.forks_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// LinkedIn Fallback Component
const LinkedInFallback: React.FC<LinkedInFallbackProps> = ({ linkedInUrl }) => {
  return (
    <div className="linkedin-fallback border rounded-lg overflow-hidden bg-card/80 backdrop-blur-sm shadow-md">
      <div className="p-4 border-b border-border/30 bg-blue-700/10">
        <div className="flex items-center gap-2 mb-4">
          <Linkedin className="h-5 w-5 text-blue-700" />
          <span className="text-lg font-semibold">LinkedIn Post</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          LinkedIn content cannot be displayed directly due to embedding restrictions.
        </p>
        <a 
          href={linkedInUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition-colors"
        >
          <span>View on LinkedIn</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("Embed error:", error, info);
  }
  
  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    
    return this.props.children;
  }
}

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("personal"); // State for active tab
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  
  // POW state
  const [powUrl, setPowUrl] = useState("");
  const [powDescription, setPowDescription] = useState("");
  const [powPlatform, setPowPlatform] = useState("");
  const [isValidatingUrl, setIsValidatingUrl] = useState(false);
  const [powError, setPowError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser({
          userName: "",
          location: "",
          bio: "",
          skills: [],
          interests: [],
          socialLinks: { github: "", linkedin: "", portfolio: "" },
          proofOfWork: [], 
          avatar: "",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Detect platform from URL
  useEffect(() => {
    if (powUrl) {
      if (powUrl.includes("twitter.com") || powUrl.includes("x.com")) {
        setPowPlatform("twitter");
      } else if (powUrl.includes("linkedin.com")) {
        setPowPlatform("linkedin");
      } else if (powUrl.includes("github.com")) {
        setPowPlatform("github");
      } else {
        setPowPlatform("");
      }
    } else {
      setPowPlatform("");
    }
  }, [powUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes("socialLinks.")) {
      const [_, key] = name.split(".");
      setUser((prev: any) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));
    } else {
      setUser((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFileUpload(file);
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 200);

      const res = await axios.post("/api/uploadAvatar", formData);

      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        setUser((prev: any) => ({ ...prev, avatar: res.data.avatar }));
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (err) {
      console.error("Avatar upload failed:", err);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;

    const newSkill = skillInput.trim();
    if (!user.skills?.includes(newSkill)) {
      setUser((prev: any) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill],
      }));
    }
    setSkillInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    setUser((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((skill: string) => skill !== skillToRemove),
    }));
  };

  const addInterest = () => {
    if (!interestInput.trim()) return;

    const newInterest = interestInput.trim();
    if (!user.interests?.includes(newInterest)) {
      setUser((prev: any) => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest],
      }));
    }
    setInterestInput("");
  };

  const removeInterest = (interestToRemove: string) => {
    setUser((prev: any) => ({
      ...prev,
      interests: prev.interests.filter(
        (interest: string) => interest !== interestToRemove
      ),
    }));
  };

  // Add a proof of work item
  const addProofOfWork = async () => {
    if (!powUrl.trim()) return;
    
    setPowError("");
    setIsValidatingUrl(true);
    
    try {
      // In a real implementation, you might want to validate the URL on the server
      // For now, we'll just check if it's from a supported platform
      if (!powPlatform) {
        throw new Error("Unsupported platform. Please use Twitter, LinkedIn, or GitHub.");
      }
      
      const newPow = {
        platform: powPlatform,
        postUrl: powUrl,
        description: powDescription.trim() || null,
        addedAt: new Date().toISOString(),
        id: Date.now().toString(), // Add unique ID to force re-render
      };
      
      setUser((prev: any) => ({
        ...prev,
        proofOfWork: [...(prev.proofOfWork || []), newPow],
      }));
      
      setPowUrl("");
      setPowDescription("");
      setPowPlatform("");
    } catch (error: any) {
      console.error("Error adding proof of work:", error);
      setPowError(error.message || "Failed to add proof of work");
    } finally {
      setIsValidatingUrl(false);
    }
  };

  // Remove a proof of work item
  const removeProofOfWork = (index: number) => {
    setUser((prev: any) => ({
      ...prev,
      proofOfWork: prev.proofOfWork.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post("/api/user", user);
      setShowSuccessMessage(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 h-full w-full rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="h-8 w-8 text-primary/70" />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-xl font-medium">Loading your profile</p>
            <p className="text-sm text-muted-foreground">
              Please wait while we fetch your information
            </p>
          </div>
        </div>
      </div>
    );
  }

  const userInitials =
    user?.userName
      ?.split(" ")
      .map((name: string) => name[0])
      .join("")
      .toUpperCase() || "U";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        damping: 15,
      },
    },
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    removed: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  // Component to render the appropriate embed based on platform
  const ProofOfWorkItem: React.FC<ProofOfWorkItemProps> = ({ pow, index }) => {
    const [embedLoading, setEmbedLoading] = useState(true);
    
    // Reset loading state when pow changes
    useEffect(() => {
      setEmbedLoading(true);
      
      // Set a timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        setEmbedLoading(false);
      }, 15000); // 15 seconds timeout
      
      return () => clearTimeout(timeout);
    }, [pow.postUrl]);
    
    return (
      <motion.div
        variants={itemVariants}
        className="relative bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-md overflow-hidden"
      >
        <button
          type="button"
          onClick={() => removeProofOfWork(index)}
          className="absolute top-2 right-2 z-10 bg-background/80 p-1.5 rounded-full hover:bg-destructive/20 transition-colors"
          aria-label="Remove proof of work"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </button>
        
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            {pow.platform === "twitter" && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </Badge>
            )}
            {pow.platform === "linkedin" && (
              <Badge variant="outline" className="bg-blue-700/10 text-blue-700 border-blue-700/20">
                <Linkedin className="h-3 w-3 mr-1" />
                LinkedIn
              </Badge>
            )}
            {pow.platform === "github" && (
              <Badge variant="outline" className="bg-gray-800/10 text-gray-800 dark:text-gray-300 border-gray-800/20 dark:border-gray-300/20">
                <Github className="h-3 w-3 mr-1" />
                GitHub
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              Added {new Date(pow.addedAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="mb-4 flex justify-center">
            {pow.platform === "twitter" && (
              <div style={{ width: '100%', maxWidth: '550px' }}>
                <ErrorBoundary
                  fallback={
                    <div className="p-4 border border-red-800/30 bg-red-900/20 text-red-400 rounded-lg flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-5 w-5 mb-1" />
                      <span>Failed to load tweet</span>
                      <a href={pow.postUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium flex items-center gap-1">
                        View on Twitter <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  }
                >
                  <div className="flex justify-center">
                    <TwitterEmbed 
                      url={pow.postUrl}
                      width={325}
                      // Add a key to force re-render when URL changes
                      key={`twitter-${pow.id || index}-${pow.postUrl}`}
                      onLoad={() => setEmbedLoading(false)}
                    />
                  </div>
                </ErrorBoundary>
                
                {embedLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-6 w-6 rounded-full border-2 border-primary border-r-transparent animate-spin"></div>
                      <span className="text-sm text-muted-foreground">Loading tweet...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {pow.platform === "linkedin" && (
              <div style={{ width: '100%', maxWidth: '550px' }}>
                <LinkedInFallback linkedInUrl={pow.postUrl} />
              </div>
            )}
            
            {pow.platform === "github" && (
              <div style={{ width: '100%', maxWidth: '550px' }}>
                <GitHubRepoDisplay repoUrl={pow.postUrl} />
              </div>
            )}
          </div>
          
          {pow.description && (
            <div className="mt-3 pt-3 border-t border-border/30">
              <p className="text-sm text-muted-foreground">{pow.description}</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <DashNav />
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background via-background/95 to-background/90 pt-8 pb-20">
        <div className="container max-w-5xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col items-center text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Customize Your Profile
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Make your profile stand out by adding your personal information,
              skills, and proof of work.
            </p>
          </motion.div>

          <AnimatePresence>
            {showSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="fixed top-6 right-6 z-50 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
              >
                <div className="bg-green-500 text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
                <span>Profile saved successfully! Redirecting...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="h-32 relative overflow-hidden bg-primary/10">
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-primary/30"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: isUploading ? uploadProgress / 100 : 0,
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>

                    <div className="px-6 pb-6 pt-0 -mt-16 flex flex-col items-center">
                      <div className="relative group">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                            <AvatarImage
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.userName || "User"}
                            />
                            <AvatarFallback className="text-2xl bg-primary/20 text-primary font-bold">
                              {userInitials}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/60 rounded-full cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Camera className="h-8 w-8 text-white" />
                        </motion.div>
                        <Input
                          ref={fileInputRef}
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </div>

                      <motion.h3
                        className="mt-6 text-2xl font-semibold"
                        animate={{
                          color: user.userName
                            ? "var(--primary)"
                            : "currentColor",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {user.userName || "Your Name"}
                      </motion.h3>

                      {user.location && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center mt-2 text-sm text-muted-foreground"
                        >
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{user.location}</span>
                        </motion.div>
                      )}

                      <div className="flex gap-3 mt-6">
                        <TooltipProvider>
                          {user.socialLinks?.github && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.a
                                  href={user.socialLinks.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-muted hover:bg-primary/10 transition-colors p-2.5 rounded-full"
                                  whileHover={{
                                    y: -5,
                                    backgroundColor: "var(--primary-20)",
                                  }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Github className="h-5 w-5" />
                                </motion.a>
                              </TooltipTrigger>
                              <TooltipContent>GitHub</TooltipContent>
                            </Tooltip>
                          )}

                          {user.socialLinks?.linkedin && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.a
                                  href={user.socialLinks.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-muted hover:bg-primary/10 transition-colors p-2.5 rounded-full"
                                  whileHover={{
                                    y: -5,
                                    backgroundColor: "var(--primary-20)",
                                  }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Linkedin className="h-5 w-5" />
                                </motion.a>
                              </TooltipTrigger>
                              <TooltipContent>LinkedIn</TooltipContent>
                            </Tooltip>
                          )}

                          {user.socialLinks?.portfolio && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.a
                                  href={user.socialLinks.portfolio}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-muted hover:bg-primary/10 transition-colors p-2.5 rounded-full"
                                  whileHover={{
                                    y: -5,
                                    backgroundColor: "var(--primary-20)",
                                  }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Globe className="h-5 w-5" />
                                </motion.a>
                              </TooltipTrigger>
                              <TooltipContent>Portfolio</TooltipContent>
                            </Tooltip>
                          )}
                        </TooltipProvider>
                      </div>

                      {user.bio && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50"
                        >
                          <p className="text-sm text-center text-muted-foreground line-clamp-4">
                            {user.bio}
                          </p>
                        </motion.div>
                      )}

                      {/* POW Preview */}
                      {user.proofOfWork?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50 w-full"
                        >
                          <h4 className="text-xs uppercase text-muted-foreground font-medium mb-2 flex items-center justify-center">
                            <Briefcase className="h-3 w-3 mr-1" />
                            Proof of Work
                          </h4>
                          <div className="text-sm text-center text-primary">
                            {user.proofOfWork.length} item{user.proofOfWork.length !== 1 ? 's' : ''} added
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <motion.div
                  className="space-y-4 p-6 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Skills Preview</span>
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {user.skills?.length || 0} skills
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[60px]">
                    <AnimatePresence>
                      {user.skills?.map((skill: string, index: number) => (
                        <motion.div
                          key={skill}
                          variants={skillVariants}
                          initial="hidden"
                          animate="visible"
                          exit="removed"
                          layout
                          className="group"
                        >
                          <Badge
                            variant="secondary"
                            className="px-2.5 py-1 group-hover:pr-7 relative overflow-hidden"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-4 w-4 rounded-full bg-destructive/20 text-destructive flex items-center justify-center"
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {!user.skills?.length && (
                      <p className="text-xs text-muted-foreground p-2">
                        Add skills in the form to see them here
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Tabs
                      defaultValue="personal"
                      value={activeTab}
                      onValueChange={(value) => setActiveTab(value)}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-2 mb-8 p-1 bg-muted/50">
                        <TabsTrigger
                          value="personal"
                          className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Personal
                        </TabsTrigger>
                        <TabsTrigger
                          value="pow"
                          className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300"
                        >
                          <Briefcase className="h-4 w-4 mr-2" />
                          Proof of Work
                        </TabsTrigger>
                      </TabsList>

                      {/* Personal Tab Content */}
                      <TabsContent value="personal" className="space-y-6 mt-0">
                        <motion.div
                          variants={itemVariants}
                          className="space-y-4"
                        >
                          <div className="grid gap-2">
                            <Label
                              htmlFor="userName"
                              className="text-sm font-medium flex items-center"
                            >
                              Display Name
                              <motion.span
                                className="ml-2 text-xs text-primary"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: user.userName ? 1 : 0,
                                }}
                              >
                                <Check className="h-3 w-3 inline" />
                              </motion.span>
                            </Label>
                            <div className="relative">
                              <Input
                                id="userName"
                                name="userName"
                                value={user.userName || ""}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="bg-background/50 border-muted-foreground/20 pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label
                              htmlFor="location"
                              className="text-sm font-medium flex items-center"
                            >
                              Location
                              <motion.span
                                className="ml-2 text-xs text-primary"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: user.location ? 1 : 0,
                                }}
                              >
                                <Check className="h-3 w-3 inline" />
                              </motion.span>
                            </Label>
                            <div className="relative">
                              <Input
                                id="location"
                                name="location"
                                value={user.location || ""}
                                onChange={handleChange}
                                placeholder="City, Country"
                                className="bg-background/50 border-muted-foreground/20 pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label
                              htmlFor="bio"
                              className="text-sm font-medium flex items-center"
                            >
                              Bio
                              <motion.span
                                className="ml-2 text-xs text-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: user.bio ? 1 : 0 }}
                              >
                                <Check className="h-3 w-3 inline" />
                              </motion.span>
                            </Label>
                            <Textarea
                              id="bio"
                              name="bio"
                              value={user.bio || ""}
                              onChange={handleChange}
                              placeholder="Tell us about yourself"
                              className="min-h-[150px] resize-none bg-background/50 border-muted-foreground/20 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Markdown supported</span>
                              <span>
                                {user.bio?.length || 0} characters
                              </span>
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label
                              htmlFor="skills"
                              className="text-sm font-medium"
                            >
                              Skills
                            </Label>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <Input
                                  id="skills"
                                  value={skillInput}
                                  onChange={(e) =>
                                    setSkillInput(e.target.value)
                                  }
                                  placeholder="Add a skill (e.g. JavaScript, React)"
                                  className="bg-background/50 border-muted-foreground/20 pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addSkill();
                                    }
                                  }}
                                />
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              </div>
                              <Button
                                type="button"
                                onClick={addSkill}
                                className="shrink-0 bg-primary hover:bg-primary/90"
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 min-h-[60px] p-3 bg-background/30 rounded-lg border border-border/30">
                              <AnimatePresence>
                                {user.skills?.map(
                                  (skill: string, index: number) => (
                                    <motion.div
                                      key={skill}
                                      variants={skillVariants}
                                      initial="hidden"
                                      animate="visible"
                                      exit="removed"
                                      layout
                                      className="group"
                                    >
                                      <Badge
                                        variant="secondary"
                                        className="px-2.5 py-1 group-hover:pr-7 relative overflow-hidden"
                                      >
                                        {skill}
                                        <button
                                          type="button"
                                          onClick={() => removeSkill(skill)}
                                          className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-4 w-4 rounded-full bg-destructive/20 text-destructive flex items-center justify-center"
                                        >
                                          <X className="h-2.5 w-2.5" />
                                        </button>
                                      </Badge>
                                    </motion.div>
                                  )
                                )}
                                {!user.skills?.length && (
                                  <p className="text-xs text-muted-foreground">
                                    Add your professional skills
                                  </p>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label
                              htmlFor="socialLinks.github"
                              className="flex items-center gap-2 text-sm font-medium"
                            >
                              <Github className="h-4 w-4" />
                              GitHub
                            </Label>
                            <div className="relative">
                              <Input
                                id="github"
                                name="socialLinks.github"
                                value={user.socialLinks?.github || ""}
                                onChange={handleChange}
                                placeholder="https://github.com/username"
                                className="bg-background/50 border-muted-foreground/20 pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="h-4 w-4 fill-current"
                                >
                                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                              </div>
                              <motion.div
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: user.socialLinks?.github ? 1 : 0,
                                }}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </motion.div>
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label
                              htmlFor="linkedin"
                              className="flex items-center gap-2 text-sm font-medium"
                            >
                              <Linkedin className="h-4 w-4" />
                              LinkedIn
                            </Label>
                            <div className="relative">
                              <Input
                                id="linkedin"
                                name="socialLinks.linkedin"
                                value={user.socialLinks?.linkedin || ""}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                                className="bg-background/50 border-muted-foreground/20 pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="h-4 w-4 fill-current"
                                >
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              </div>
                              <motion.div
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: user.socialLinks?.linkedin ? 1 : 0,
                                }}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </motion.div>
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label
                              htmlFor="portfolio"
                              className="flex items-center gap-2 text-sm font-medium"
                            >
                              <Globe className="h-4 w-4" />
                              Portfolio
                            </Label>
                            <div className="relative">
                              <Input
                                id="portfolio"
                                name="socialLinks.portfolio"
                                value={user.socialLinks?.portfolio || ""}
                                onChange={handleChange}
                                placeholder="https://yourportfolio.com"
                                className="bg-background/50 border-muted-foreground/20 pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              />
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <motion.div
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: user.socialLinks?.portfolio ? 1 : 0,
                                }}
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </TabsContent>

                      {/* Proof of Work Tab Content */}
                      <TabsContent value="pow" className="space-y-6 mt-0">
                        <motion.div variants={itemVariants} className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="powUrl" className="text-sm font-medium">
                              Add Proof of Work
                            </Label>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <Input
                                  id="powUrl"
                                  value={powUrl}
                                  onChange={(e) => setPowUrl(e.target.value)}
                                  placeholder="Paste a Twitter, LinkedIn, or GitHub post URL"
                                  className="bg-background/50 border-muted-foreground/20 pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              </div>
                              <Button
                                type="button"
                                onClick={addProofOfWork}
                                disabled={isValidatingUrl || !powPlatform}
                                className="shrink-0 bg-primary hover:bg-primary/90"
                              >
                                {isValidatingUrl ? (
                                  <>
                                    <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin mr-1" />
                                    Validating...
                                  </>
                                ) : (
                                  <>
                                    <Plus className="h-4 w-4 mr-1" /> Add
                                  </>
                                )}
                              </Button>
                            </div>
                            
                            {powUrl && !powPlatform && (
                              <p className="text-xs text-destructive mt-1">
                                Please use a URL from Twitter, LinkedIn, or GitHub
                              </p>
                            )}
                            
                            {powError && (
                              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {powError}
                              </p>
                            )}
                            
                            {powPlatform && !powError && (
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {powPlatform === "twitter" && "Twitter"}
                                  {powPlatform === "linkedin" && "LinkedIn"}
                                  {powPlatform === "github" && "GitHub"}
                                </Badge>
                                <span className="text-xs text-muted-foreground">Detected platform</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="powDescription" className="text-sm font-medium">
                              Description (Optional)
                            </Label>
                            <Textarea
                              id="powDescription"
                              value={powDescription}
                              onChange={(e) => setPowDescription(e.target.value)}
                              placeholder="Add context about this work (e.g., 'My latest project', 'Award-winning design')"
                              className="resize-none bg-background/50 border-muted-foreground/20 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                          </div>
                          
                          {/* Display added proof of work items */}
                          <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium flex items-center gap-1.5">
                                <Briefcase className="h-4 w-4 text-primary" />
                                <span>Your Proof of Work</span>
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {user.proofOfWork?.length || 0} items
                              </Badge>
                            </div>
                            
                            {user.proofOfWork?.map((pow: ProofOfWork, index: number) => (
                              <ProofOfWorkItem key={`pow-${pow.id || index}`} pow={pow} index={index} />
                            ))}
                            
                            {!user.proofOfWork?.length && (
                              <p className="text-sm text-muted-foreground p-4 bg-background/30 rounded-lg border border-border/30 text-center">
                                Add links to your social media posts to showcase your work
                              </p>
                            )}
                          </div>
                        </motion.div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-end gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="gap-2 relative overflow-hidden group"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={saving || showSuccessMessage}
                      className="gap-2 min-w-[140px] relative overflow-hidden group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      <motion.div
                        initial={false}
                        animate={saving ? { width: "100%" } : { width: "0%" }}
                        className="absolute inset-0 bg-primary/20"
                        style={{ originX: 0 }}
                        transition={{ duration: 1 }}
                      />

                      {saving ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          <span>Save Changes</span>
                          <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
