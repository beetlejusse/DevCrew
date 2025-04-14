"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashNav from "@/components/custom-components/DashNav";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import axios from "axios";
import HacksList from "@/components/custom-components/HacksList";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hackathons, setHackathons] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const reveal = () => {
      revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", reveal);
    setTimeout(reveal, 300);

    return () => window.removeEventListener("scroll", reveal);
  }, []);

  // Handle tab change and navigate to corresponding route
  const handleTabChange = (value: string) => {
    if (value === "dash") {
      router.push("/dashboard");
    } else if (value === "explore") {
      router.push("/explore");
    } else if (value === "hack") {
      router.push("/hack");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050A14] text-white overflow-hidden">
      <DashNav />

      {/* Centered Tabs component */}
      <div className="flex justify-center my-12">
        <Tabs
          value="explore"
          onValueChange={handleTabChange}
          className="w-[600px]"
        >
          <TabsList className="grid w-full grid-cols-3 bg-transparent gap-2 p-0">
            <TabsTrigger
              value="explore"
              className="text-lg py-3 rounded-full font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            >
              Hackathons
            </TabsTrigger>
            <TabsTrigger
              value="hack"
              className="text-lg py-3 rounded-full font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            >
              Teams and Users
            </TabsTrigger>
            <TabsTrigger
              value="dash"
              className="text-lg py-3 rounded-full font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            >
              Dashboard
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Explore content */}
      <HacksList />
    </div>
  );
}
