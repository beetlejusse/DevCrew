"use client";

import React, { useEffect, useState, useRef } from "react";
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
  MessageSquare,
  User,
  LogOut,
  X,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useClickAway } from "react-use";

// Define interfaces for type safety
interface UserType {
  _id: string;
  userName: string;
  email: string;
  avatar?: string;
}

interface SearchResultType {
  _id: string;
  userName: string;
  email: string;
  avatar?: string;
}

const DashNav = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Close search results when clicking outside
  useClickAway(searchResultsRef, () => {
    setShowResults(false);
  });

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

  // Debounce search to avoid too many requests
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const res = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(res.data.users || []);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleUserClick = (userId: string) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(`/user/${userId}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0) {
                setShowResults(true);
              }
            }}
          />
          {searchQuery && (
            <button 
              className="absolute right-2.5 text-white/40 hover:text-white/70"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {showResults && (
            <div 
              ref={searchResultsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-[#111827] border border-white/10 rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto"
            >
              {isSearching ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-5 w-5 animate-spin text-[#3B82F6]" />
                  <span className="ml-2 text-white/70">Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="py-1">
                  {searchResults.map((result) => (
                    <div
                      key={result._id}
                      className="px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center"
                      onClick={() => handleUserClick(result._id)}
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={result.avatar} alt={result.userName} />
                        <AvatarFallback className="text-xs">
                          {result.userName?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{result.userName}</p>
                        <p className="text-xs text-white/60">{result.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-white/60">
                  No users found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="relative text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:glow-icon">
            <Link href="/chat">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#3B82F6] text-[10px] font-medium text-white flex items-center justify-center animate-pulse glow-border-strong">
                2
              </span>
            </Link>
          </Button>

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
