"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { HackCard } from "@/components/custom-components/hackathon/hackCard";
import { CreateHackathonModal } from "@/components/custom-components/hackathon/hackModal";
import { HackathonDetailsModal } from "@/components/custom-components/hackathon/hackDetailModal";
import { HackSkeleton } from "@/components/custom-components/hackathon/hackSkeleton";
import { Terminal, Code2, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hackathon, HackathonData } from "@/types/hacktypes";

export default function HackList() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(
    null
  );

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/hackathon");
        setHackathons(res.data.hackathon || []);
        setError("");
      } catch (err: any) {
        console.error("Error fetching hackathons:", err);
        setError("Failed to fetch hackathons. Please try again later.");
        setHackathons([]);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchHackathons();
  }, []);

  const handleCreateHackathon = async (formData: HackathonData) => {
    try {
      const res = await axios.post("/api/hackathon/createhack", formData);
      setHackathons((prev) => [res.data, ...prev]);
      return { success: true };
    } catch (error) {
      console.error("Error creating hackathon:", error);
      return { success: false, error: "Failed to create hackathon" };
    }
  };

  const handleHackathonClick = (hackathon: Hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className=" text-zinc-900 dark:text-zinc-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Terminal className="h-8 w-8 mr-3 text-violet-600 dark:text-violet-400" />
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-violet-600 dark:text-violet-400">
                {"<"}
              </span>
              Hackathons
              <span className="text-violet-600 dark:text-violet-400">
                {"/>"}
              </span>
            </h1>
          </div>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="group bg-violet-600 hover:bg-violet-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
            Create Hackathon
          </Button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 flex items-center">
            <Code2 className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(6)].map((_, i) => (
              <HackSkeleton key={i} />
            ))}
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {!loading && hackathons && hackathons.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <Sparkles className="h-16 w-16 mb-4 text-zinc-400" />
                  <h3 className="text-2xl font-semibold mb-2">
                    No hackathons yet
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md">
                    Create your first hackathon to get started and inspire
                    developers to build amazing projects.
                  </p>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Hackathon
                </Button>
                </div>
              ) : (
                hackathons &&
                hackathons.map((hackathon, index) => (
                  <HackCard
                    key={index}
                    hackathon={hackathon}
                    onClick={() => handleHackathonClick(hackathon)}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <CreateHackathonModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateHackathon}
      />

      <HackathonDetailsModal
        hackathon={selectedHackathon}
        isOpen={!!selectedHackathon}
        onClose={() => setSelectedHackathon(null)}
      />
    </div>
  );
}
