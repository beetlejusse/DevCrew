"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Code,
  ExternalLink,
  Globe,
  Info,
  Terminal,
  Users,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import type { Hackathon } from "@/types/hacktypes";

interface HackathonDetailsModalProps {
  hackathon: Hackathon | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HackathonDetailsModal({
  hackathon,
  isOpen,
  onClose,
}: HackathonDetailsModalProps) {
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  // This would be replaced with actual data fetching when a hackathon is selected
  // For now, we'll simulate loading participants
  const fetchParticipants = async () => {
    if (
      activeTab === "participants" &&
      (!participants || participants.length === 0)
    ) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setParticipants([
          {
            id: 1,
            name: "Jane Cooper",
            role: "Developer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 2,
            name: "Alex Johnson",
            role: "Designer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 3,
            name: "Sam Wilson",
            role: "Developer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 4,
            name: "Maria Garcia",
            role: "Product Manager",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          {
            id: 5,
            name: "David Kim",
            role: "Developer",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ]);
        setLoading(false);
      }, 1000);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  if (!hackathon) return null;

  const isActive = new Date(hackathon.endDate) >= new Date();
  const today = new Date();
  const endDate = new Date(hackathon.endDate);
  const startDate = new Date(hackathon.startDate);

  let statusText = "";
  let statusColor = "";

  if (today < startDate) {
    const daysToStart = Math.ceil(
      (startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    statusText = `Starts in ${daysToStart} day${daysToStart !== 1 ? "s" : ""}`;
    statusColor =
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800";
  } else if (today <= endDate) {
    const daysRemaining = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    statusText = `${daysRemaining} day${
      daysRemaining !== 1 ? "s" : ""
    } remaining`;
    statusColor =
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800";
  } else {
    const daysPassed = Math.ceil(
      (today.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    statusText = `Ended ${daysPassed} day${daysPassed !== 1 ? "s" : ""} ago`;
    statusColor =
      "bg-zinc-100 text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-h-[85vh] overflow-y-auto"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={
                    hackathon.coverPhoto ||
                    "/placeholder.svg?height=300&width=600"
                  }
                  alt={hackathon.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className={`${statusColor} border mb-2`}>
                    {statusText}
                  </Badge>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {hackathon.title}
                  </h1>
                </div>
                {/* <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button> */}
              </div>

              <Tabs
                defaultValue="overview"
                className="w-full"
                onValueChange={(value) => {
                  setActiveTab(value);
                  if (value === "participants") {
                    fetchParticipants();
                  }
                }}
              >
                <div className="px-6 border-b border-zinc-200 dark:border-zinc-800">
                  <TabsList className="h-14 bg-transparent">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-violet-600 dark:data-[state=active]:border-violet-400 rounded-none px-4 h-14"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="participants"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-violet-600 dark:data-[state=active]:border-violet-400 rounded-none px-4 h-14"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Participants
                    </TabsTrigger>
                    <TabsTrigger
                      value="rules"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-violet-600 dark:data-[state=active]:border-violet-400 rounded-none px-4 h-14"
                    >
                      <Terminal className="h-4 w-4 mr-2" />
                      Rules
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent
                  value="overview"
                  className="p-6 focus-visible:outline-none focus-visible:ring-0"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Code className="h-5 w-5 mr-2 text-violet-600 dark:text-violet-400" />
                        About this Hackathon
                      </h3>
                      <p className="text-zinc-700 dark:text-zinc-300">
                        {hackathon.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
                          Timeline
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400 mt-0.5" />
                            <div>
                              <p className="font-medium">Start Date</p>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {format(
                                  new Date(hackathon.startDate),
                                  "EEEE, MMMM d, yyyy"
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400 mt-0.5" />
                            <div>
                              <p className="font-medium">End Date</p>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {format(
                                  new Date(hackathon.endDate),
                                  "EEEE, MMMM d, yyyy"
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400 mt-0.5" />
                            <div>
                              <p className="font-medium">Duration</p>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {Math.ceil(
                                  (new Date(hackathon.endDate).getTime() -
                                    new Date(hackathon.startDate).getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                days
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
                          Details
                        </h4>
                        <div className="space-y-3">
                          {hackathon.url && (
                            <div className="flex items-start">
                              <Globe className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400 mt-0.5" />
                              <div>
                                <p className="font-medium">Website</p>
                                <a
                                  href={hackathon.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-violet-600 dark:text-violet-400 hover:underline flex items-center"
                                >
                                  {hackathon.url}
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              </div>
                            </div>
                          )}
                          <div className="flex items-start">
                            <Terminal className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400 mt-0.5" />
                            <div>
                              <p className="font-medium">Created</p>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {format(
                                  new Date(hackathon.createdAt),
                                  "MMMM d, yyyy"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button
                        className="bg-violet-600 hover:bg-violet-700 text-white"
                        disabled={!isActive}
                      >
                        {isActive ? "Register Now" : "Registration Closed"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="participants"
                  className="p-6 focus-visible:outline-none focus-visible:ring-0"
                >
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : participants && participants.length > 0 ? (
                    <div className="space-y-4">
                      {participants.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
                        >
                          <Image
                            src={participant.avatar || "/placeholder.svg"}
                            alt={participant.name}
                            width={40}
                            height={40}
                            className="rounded-full mr-4"
                          />
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              {participant.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Users className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
                      <h3 className="text-lg font-semibold mb-1">
                        No participants yet
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto">
                        Be the first to join this hackathon and showcase your
                        skills!
                      </p>
                      <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                        Join Now
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent
                  value="rules"
                  className="p-6 focus-visible:outline-none focus-visible:ring-0"
                >
                  <div className="space-y-6">
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Terminal className="h-5 w-5 mr-2 text-violet-600 dark:text-violet-400" />
                        Hackathon Rules
                      </h3>

                      <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
                        <div className="flex">
                          <span className="font-mono bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 w-6 h-6 rounded flex items-center justify-center mr-3 flex-shrink-0">
                            1
                          </span>
                          <p>
                            All code must be written during the hackathon
                            period.
                          </p>
                        </div>
                        <div className="flex">
                          <span className="font-mono bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 w-6 h-6 rounded flex items-center justify-center mr-3 flex-shrink-0">
                            2
                          </span>
                          <p>Teams can consist of 1-4 members.</p>
                        </div>
                        <div className="flex">
                          <span className="font-mono bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 w-6 h-6 rounded flex items-center justify-center mr-3 flex-shrink-0">
                            3
                          </span>
                          <p>
                            You may use open source libraries and frameworks.
                          </p>
                        </div>
                        <div className="flex">
                          <span className="font-mono bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 w-6 h-6 rounded flex items-center justify-center mr-3 flex-shrink-0">
                            4
                          </span>
                          <p>Projects must be submitted before the deadline.</p>
                        </div>
                        <div className="flex">
                          <span className="font-mono bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 w-6 h-6 rounded flex items-center justify-center mr-3 flex-shrink-0">
                            5
                          </span>
                          <p>
                            All submissions must include source code and a demo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Code className="h-5 w-5 mr-2 text-violet-600 dark:text-violet-400" />
                        Judging Criteria
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Innovation
                              </span>
                              <span className="text-sm font-medium">30%</span>
                            </div>
                            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                              <div
                                className="bg-violet-600 h-2 rounded-full"
                                style={{ width: "30%" }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Technical Complexity
                              </span>
                              <span className="text-sm font-medium">25%</span>
                            </div>
                            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                              <div
                                className="bg-violet-600 h-2 rounded-full"
                                style={{ width: "25%" }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Design & UX
                              </span>
                              <span className="text-sm font-medium">20%</span>
                            </div>
                            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                              <div
                                className="bg-violet-600 h-2 rounded-full"
                                style={{ width: "20%" }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Completeness
                              </span>
                              <span className="text-sm font-medium">15%</span>
                            </div>
                            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                              <div
                                className="bg-violet-600 h-2 rounded-full"
                                style={{ width: "15%" }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Presentation
                              </span>
                              <span className="text-sm font-medium">10%</span>
                            </div>
                            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                              <div
                                className="bg-violet-600 h-2 rounded-full"
                                style={{ width: "10%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
