"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  UserPlus,
  X,
  ChevronRight,
  Award,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Hackathon {
  title: string;
}

interface User {
  _id: string;
  userName: string;
  avatar?: string;
}

interface Team {
  _id: string;
  name: string;
  members: string[]; // Array of user IDs
  hackathon: string;
  head: string;
  joinCode?: string;
}

export default function TeamManager() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Store current user
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamName, setTeamName] = useState("");
  const [selectedHackathon, setSelectedHackathon] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [hackathonRes, teamRes, userRes] = await Promise.all([
          axios.get("/api/hackathon"),
          axios.get("/api/team"),
          axios.get("/api/user"),
        ]);
        setHackathons(hackathonRes.data.hackathon);
        setTeams(teamRes.data.teams);
        setCurrentUser(userRes.data.user);
      } catch (err) {
        console.error("Error fetching data:", err);
        setMessage("Failed to load data. Please try again.");
        setMessageType("error");
      }
    };

    fetchInitialData();
  }, []);

  const handleCreateTeam = async () => {
    if (!teamName || !selectedHackathon) {
      setMessage("Please enter a team name and select a hackathon.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/api/team/createTeam", {
        name: teamName,
        hackathon: selectedHackathon,
      });

      // Show toast notification
      toast.success(`Team "${res.data.team.name}" created successfully!`, {
        description: `Join code: ${res.data.team.joinCode}`,
      });

      setMessage(
        `Team created! Team Name: ${res.data.team.name}, Join code: ${res.data.team.joinCode}`
      );
      setMessageType("success");
      setTeamName("");
      setSelectedHackathon("");

      // Refresh teams
      const updatedTeamsRes = await axios.get("/api/team");
      setTeams(updatedTeamsRes.data.teams);
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to create team.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinTeam = async () => {
    if (!joinCode) {
      setMessage("Please enter a join code.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/api/team/joinTeam", { joinCode });

      // Show toast notification
      toast.success(`Joined team "${res.data.team.name}" successfully!`);

      setMessage(`✅ Joined team: ${res.data.team.name}`);
      setMessageType("success");
      setJoinCode("");

      // Refresh teams
      const updatedTeamsRes = await axios.get("/api/team");
      setTeams(updatedTeamsRes.data.teams);
    } catch (err: any) {
      console.error("Join team error:", err);
      setMessage(err.response?.data?.error || "❌ Failed to join team.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessage = () => {
    setMessage("");
    setMessageType("");
  };

  const getInitials = (str: string) => {
    return str
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getAvatarColor = (str: string) => {
    const colors = [
      "bg-blue-500",
      "bg-emerald-500",
      "bg-amber-500",
      "bg-rose-500",
      "bg-indigo-500",
      "bg-violet-500",
      "bg-teal-500",
    ];
    const hash = str
      ?.split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className=" py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-10"
        >
          <Tabs
            defaultValue="create"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="create"
                className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
                onClick={() => setActiveTab("create")}
              >
                <Plus className="mr-2 h-4 w-4" />
                <span>Create Team</span>
              </TabsTrigger>
              <TabsTrigger
                value="join"
                className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
                onClick={() => setActiveTab("join")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Join Team</span>
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <Alert
                    variant={
                      messageType === "error" ? "destructive" : "default"
                    }
                    className={`border-l-4 ${
                      messageType === "success"
                        ? "border-l-green-500"
                        : "border-l-red-500"
                    } shadow-sm`}
                  >
                    <AlertDescription className="flex justify-between items-center py-1">
                      <span>{message}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearMessage}
                        className="h-6 w-6 p-0 rounded-full hover:bg-background/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <TabsContent value="create" key="create-tab">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="shadow-md border-border/40">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl flex items-center">
                        <div className="mr-3 p-2 rounded-full bg-primary/10">
                          <Plus className="h-4 w-4 text-primary" />
                        </div>
                        Create a New Team
                      </CardTitle>
                      <CardDescription>
                        Start a new team for your selected hackathon
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 pb-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="teamName"
                          className="text-sm font-medium flex items-center"
                        >
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          Team Name
                        </label>
                        <Input
                          id="teamName"
                          placeholder="Enter your team name"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className="h-10 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="hackathon"
                          className="text-sm font-medium flex items-center"
                        >
                          <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                          Hackathon
                        </label>
                        <Select
                          value={selectedHackathon}
                          onValueChange={setSelectedHackathon}
                        >
                          <SelectTrigger className="h-10 transition-all duration-200">
                            <SelectValue placeholder="Select a hackathon" />
                          </SelectTrigger>
                          <SelectContent>
                            {hackathons.map((hack) => (
                              <SelectItem key={hack.title} value={hack.title}>
                                {hack.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={handleCreateTeam}
                        className="w-full h-10 transition-all duration-200"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Creating...
                          </span>
                        ) : (
                          <motion.span
                            className="flex items-center"
                            whileTap={{ scale: 0.98 }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Team
                          </motion.span>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="join" key="join-tab">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="shadow-md border-border/40">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl flex items-center">
                        <div className="mr-3 p-2 rounded-full bg-primary/10">
                          <UserPlus className="h-4 w-4 text-primary" />
                        </div>
                        Join an Existing Team
                      </CardTitle>
                      <CardDescription>
                        Enter the join code provided by your team leader
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 pb-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="joinCode"
                          className="text-sm font-medium flex items-center"
                        >
                          <Code className="h-4 w-4 mr-2 text-muted-foreground" />
                          Join Code
                        </label>
                        <Input
                          id="joinCode"
                          placeholder="Enter team join code"
                          value={joinCode}
                          onChange={(e) => setJoinCode(e.target.value)}
                          className="h-10 font-mono transition-all duration-200"
                        />
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 border border-border/40">
                        <p className="text-sm text-muted-foreground">
                          Ask your team leader for the unique join code to
                          connect with your team members.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={handleJoinTeam}
                        className="w-full h-10 transition-all duration-200"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Joining...
                          </span>
                        ) : (
                          <motion.span
                            className="flex items-center"
                            whileTap={{ scale: 0.98 }}
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Join Team
                          </motion.span>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Your Teams</h2>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              {teams.length} {teams.length === 1 ? "Team" : "Teams"}
            </Badge>
          </div>

          {teams.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-12 px-6 rounded-lg border border-dashed border-border/60 bg-muted/20"
            >
              <div className="mx-auto w-14 h-14 mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                <Users className="h-7 w-7 text-muted-foreground/60" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Teams Available</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-5">
                Create a new team or join an existing one to collaborate with
                other participants.
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  setActiveTab(activeTab === "create" ? "join" : "create")
                }
              >
                {activeTab === "create" ? "Join a Team" : "Create a Team"}
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((team, idx) => (
                <motion.div
                  key={team._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="cursor-pointer"
                  onClick={() => setSelectedTeam(team)}
                >
                  <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 border-border/40">
                    <div className="h-1 bg-primary"></div>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div
                            className={`${getAvatarColor(
                              team.name
                            )} p-2 rounded-full mr-2`}
                          >
                            <Users className="h-4 w-4 text-white" />
                          </div>
                          <div className="pr-2">
                            <h3 className="font-medium text-base uppercase">
                              {team.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {team.hackathon}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs p-2">
                          <div className="flex items-center pr-1">
                            {team.members.length}
                          </div>
                          {team.members.length === 1 ? "Member" : "Members"}
                        </Badge>
                      </div>

                      <div className="mt-4">
                        <div className="flex -space-x-2 overflow-hidden">
                          {/* {team.members.slice(0, 3).map((memberId, i) => {
                            const isCurrentUser = currentUser?._id === memberId;
                            const member = isCurrentUser ? currentUser : null;
                            return (
                              <Avatar
                                key={i}
                                className="border-2 border-background inline-block h-7 w-7"
                              >
                                <AvatarImage
                                  src={member?.avatar}
                                  alt={member?.userName}
                                />
                                <AvatarFallback
                                  className={`${getAvatarColor(
                                    member?.userName || memberId
                                  )} text-xs`}
                                >
                                  {getInitials(member?.userName || memberId)}
                                </AvatarFallback>
                              </Avatar>
                            );
                          })} */}
                          {team.members.length > 3 && (
                            <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-background bg-muted text-xs font-medium">
                              +{team.members.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          <span className="mr-1">Details</span>
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {selectedTeam && (
            <Dialog
              open={!!selectedTeam}
              onOpenChange={(open) => !open && setSelectedTeam(null)}
            >
              <DialogContent className="sm:max-w-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <DialogHeader className="pb-2">
                    <div className="flex items-center justify-center mb-2">
                      <div
                        className={`${getAvatarColor(
                          selectedTeam.name
                        )} p-2 rounded-full`}
                      >
                        <Users className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <DialogTitle className="text-center text-xl">
                      {selectedTeam.name}
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      <Badge variant="outline" className="mt-1">
                        {selectedTeam.hackathon}
                      </Badge>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div>
                      <div className="bg-muted/30 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">
                          Team Lead
                        </p>
                        <div className="flex items-center justify-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage
                              src={
                                currentUser?._id === selectedTeam.head
                                  ? currentUser?.avatar
                                  : undefined
                              }
                              alt={
                                currentUser?._id === selectedTeam.head
                                  ? currentUser?.userName
                                  : undefined
                              }
                            />
                            <AvatarFallback
                              className={getAvatarColor(
                                currentUser?._id === selectedTeam.head
                                  ? currentUser?.userName || selectedTeam.head
                                  : selectedTeam.head
                              )}
                            >
                              {getInitials(
                                currentUser?._id === selectedTeam.head
                                  ? currentUser?.userName || selectedTeam.head
                                  : selectedTeam.head
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-medium">
                            {currentUser?._id === selectedTeam.head
                              ? currentUser?.userName
                              : selectedTeam.head}
                          </p>
                        </div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">
                          Members
                        </p>
                        <p className="text-sm font-medium">
                          {selectedTeam.members.length}
                        </p>
                      </div>
                    </div>

                    {selectedTeam.joinCode && (
                      <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <p className="text-xs text-center mb-1">
                          Team Join Code
                        </p>
                        <div className="flex items-center justify-center">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs py-1 px-3"
                          >
                            {selectedTeam.joinCode}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <Separator className="bg-border/60" />

                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-3 flex items-center justify-center">
                        <Users className="h-3 w-3 mr-1" /> Team Members
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {selectedTeam.members.map((memberId, index) => {
                          const isCurrentUser = currentUser?._id === memberId;
                          const member = isCurrentUser ? currentUser : null;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.03 }}
                              className="flex items-center p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage
                                  src={member?.avatar}
                                  alt={member?.userName}
                                />
                                <AvatarFallback
                                  className={getAvatarColor(
                                    member?.userName || memberId
                                  )}
                                >
                                  {getInitials(member?.userName || memberId)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="flex-1 text-sm">
                                {member?.userName || memberId}
                              </span>
                              {memberId === selectedTeam.head && (
                                <Badge className="ml-1 bg-primary text-primary-foreground text-xs">
                                  Lead
                                </Badge>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-center pt-2">
                      <Button
                        onClick={() => setSelectedTeam(null)}
                        className="px-6"
                      >
                        <motion.span whileTap={{ scale: 0.98 }}>
                          Close
                        </motion.span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, 0.3);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(156, 163, 175, 0.5);
          }
        `}</style>
      </div>
    </div>
  );
}
