"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Hackathon } from "@/types/hacktypes";

interface HackathonCardProps {
  hackathon: Hackathon;
  onClick: () => void;
}

export function HackCard({ hackathon, onClick }: HackathonCardProps) {
  const today = new Date();
  const endDate = new Date(hackathon.endDate);
  const startDate = hackathon.startDate ? new Date(hackathon.startDate) : null;

  let statusText = "";
  let statusColor = "";

  if (startDate && today < startDate) {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      y: -5,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 backdrop-blur-sm h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={
              hackathon.coverPhoto || "/placeholder.svg?height=300&width=600"
            }
            alt={hackathon.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <Badge className={`${statusColor} border`}>{statusText}</Badge>
          </div>
        </div>

        <CardContent className="flex-grow p-5">
          <h2 className="text-xl font-bold mb-2 line-clamp-1 uppercase">
            {hackathon.title}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2">
            {hackathon.description}
          </p>

          <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mb-1">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span>
              Start:{" "}
              {startDate && !isNaN(startDate.getTime())
                ? format(startDate, "MMM d, yyyy")
                : "Invalid Date"}
            </span>
          </div>

          <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span>
              End: {format(new Date(hackathon.endDate), "MMM d, yyyy")}
            </span>
          </div>
        </CardContent>

        <CardFooter className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80">
          <div className="w-full flex justify-between items-center">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Created {format(new Date(hackathon.createdAt), "MMM d, yyyy")}
            </span>
            {hackathon.url && (
              <ExternalLink className="h-4 w-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors" />
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
