"use client";

import Link from 'next/link'
import React from 'react'
import {Button} from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

const CTA = () => {
  return (
    <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/20 to-transparent opacity-30 animate-pulse-slow"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in-up hover:shadow-glow transition-all duration-500 hover:bg-white/10 hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                  Ready to find your dream team?
                </h2>
                <p className="text-white/70 mb-0 md:mb-0">
                  Join thousands of developers who have found their perfect hackathon teammates.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full px-8 h-14 text-base w-full md:w-auto transition-all duration-300 hover:shadow-glow hover:scale-105"
                  >
                    Get started <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default CTA