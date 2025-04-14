"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashNav from "@/components/custom-components/DashNav";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import Dashinfo from "@/components/custom-components/DashInfo";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/user");
      setUser(res.data.user);
    };

    fetchUser();
  }, []);

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

      <div className="flex justify-center my-6">
        <Tabs
          value="dash"
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

      <Dashinfo />
    </div>
  );
}
