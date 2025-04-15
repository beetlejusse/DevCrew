"use client"

import { useState, useEffect } from "react"
import { Code, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import SignIn from "@/app/(auth)/sign-in/page"
import SignUp from "@/app/(auth)/sign-up/page"

interface NavbarProps {
  className?: string
  showSignIn?: boolean
  showSignUp?: boolean
  logoOnly?: boolean
}

export function NavBar({ className, showSignIn = true, showSignUp = true, logoOnly = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        const isScrolled = window.scrollY > 48
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled)
        }
      }, 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [scrolled])

  const switchToSignUp = () => {
    setIsLoginOpen(false)
    setTimeout(() => setIsSignUpOpen(true), 300)
  }

  const switchToSignIn = () => {
    setIsSignUpOpen(false)
    setTimeout(() => setIsLoginOpen(true), 300)
  }

  return (
    <header
      className={cn(
        "fixed z-50 mt-4 rounded-xl border border-white/10 bg-[#050A14]/80 backdrop-blur-lg",
        "transition-all ease-in-out duration-700",
        "transform-gpu",
        scrolled
          ? "mx-auto max-w-5xl left-0 right-0 shadow-glow animate-pulse-glow"
          : "w-[calc(100%-2rem)] mx-4 glow-border",
        className,
      )}
    >
      <div className="absolute -top-10 left-1/4 w-32 h-32 ambient-light opacity-30"></div>
      <div className="absolute -bottom-10 right-1/4 w-40 h-40 ambient-light opacity-20"></div>

      <div className="container flex h-16 items-center justify-between relative">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 group">
            <Code className="h-6 w-6 text-[#3B82F6] animate-pulse-slow glow-icon group-hover:glow-icon" />
            <span className="text-xl font-bold font-space-grotesk tracking-tight group-hover:glow-text">
              DevCrew
            </span>
          </a>
        </div>
        {!logoOnly && (
          <div className="flex items-center gap-4">
            {showSignIn && (
              <Button
                variant="ghost"
                onClick={() => setIsLoginOpen(true)}
                className="text-sm text-white hover:text-white hover:bg-white/10 transition-all duration-300 neon-border"
              >
                Sign In
              </Button>
            )}
            {showSignUp && (
              <Button
                onClick={() => setIsSignUpOpen(true)}
                className="text-sm bg-white text-[#050A14] hover:bg-white/90 rounded-full px-6 transition-all duration-300 hover:shadow-glow-lg hover:scale-105"
              >
                Join Community
              </Button>
            )}
          </div>
        )}
      </div>

      <SignIn open={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignUp={switchToSignUp} />
      <SignUp open={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} onSwitchToSignIn={function (): void {
        throw new Error("Function not implemented.")
      } }  />
    </header>
  )
}
