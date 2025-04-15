"use client";

import { NavBar } from "@/components/custom-components/Navbar"
import LandingPage  from "./(root)/landingpage/page"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050A14] text-white overflow-hidden">
      <NavBar />
      <LandingPage />
    </div>
  )
}
