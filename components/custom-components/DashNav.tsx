"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Code,
  Search,
  Bell,
  MessageSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";

const DashNav = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="w-[calc(100%-2rem)] mx-4 mt-4 z-50 transition-all duration-500 rounded-xl border border-white/10 bg-[#050A14]/80 backdrop-blur-lg glow-border animate-pulse-glow">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 group"
          >
            <Code className="h-6 w-6 text-[#3B82F6] animate-pulse-slow glow-icon" />
            <span className="text-xl font-bold font-space-grotesk tracking-tight group-hover:glow-text">
              DevCrew
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center relative max-w-sm">
          <Search className="absolute left-2.5 h-4 w-4 text-white/40" />
          <Input
            type="search"
            placeholder="Search teammates, hackathons..."
            className="w-full pl-8 md:w-[300px] bg-[#111827] border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#3B82F6] transition-all duration-300 focus:scale-105 focus:glow-border-strong"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:glow-icon">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#3B82F6] text-[10px] font-medium text-white flex items-center justify-center animate-pulse glow-border-strong">
              3
            </span>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:glow-icon">
            <Link href="/chat">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#3B82F6] text-[10px] font-medium text-white flex items-center justify-center animate-pulse glow-border-strong">
                2
              </span>
            </Link>
          </Button>

          {/* Avatar and Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-glow">
                <Avatar className="h-8 w-8 glow-border">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                    alt={user?.userName || "User"}
                  />
                  <AvatarFallback>
                    {user?.userName?.slice(0, 2).toUpperCase() || "NA"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#111827] border-white/10 text-white animate-fade-in-down glow-border" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.userName || "Loading..."}</p>
                  <p className="text-xs leading-none text-white/60">{user?.email || "Loading..."}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="hover:bg-white/10 focus:bg-white/10 transition-all duration-300 hover:translate-x-1 hover:glow-text">
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()} className="hover:bg-white/10 focus:bg-white/10 transition-all duration-300 hover:translate-x-1 hover:glow-text">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashNav;
