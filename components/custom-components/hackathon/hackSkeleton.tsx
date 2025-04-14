"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function HackSkeleton() {
  const skeletonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div variants={skeletonVariants}>
      <Card className="overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 backdrop-blur-sm h-full flex flex-col">
        <Skeleton className="h-48 w-full rounded-none" />

        <CardContent className="flex-grow p-5">
          <Skeleton className="h-7 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-4" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>

        <CardFooter className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80">
          <Skeleton className="h-4 w-1/3" />
        </CardFooter>
      </Card>
    </motion.div>
  )
}
