"use client"

import type React from "react"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Github, Loader2, LockKeyhole, Mail } from "lucide-react"

export default function SignIn({
  open,
  onClose,
  onSwitchToSignUp,
}: {
  open: boolean
  onClose: () => void
  onSwitchToSignUp: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })
    setLoading(false)

    if (res?.ok) {
      onClose()
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 text-white max-w-md w-full rounded-xl shadow-2xl overflow-hidden p-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

        <div className="relative z-10 p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Welcome back to DevCrew
            </DialogTitle>
            <p className="text-center text-gray-400 mt-2 text-sm">Sign in to continue your journey</p>
          </DialogHeader>

          <motion.form
            onSubmit={handleLogin}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800/50 text-white border-gray-700/50 pl-10 h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800/50 text-white border-gray-700/50 pl-10 h-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {error && (
                <motion.p
                  className="text-red-400 text-sm px-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-700/20"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login with Email"
              )}
            </Button>

            {/* caution: do not use its not working */}

            {/* <div className="flex items-center gap-2 my-4">
              <div className="flex-grow h-px bg-gray-700/50" />
              <span className="text-gray-400 text-sm">or continue with</span>
              <div className="flex-grow h-px bg-gray-700/50" />
            </div> */}

            {/* <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => signIn("google")}
                className="flex items-center gap-2 justify-center bg-gray-800/50 text-white hover:bg-gray-700/70 border border-gray-700/50 rounded-lg h-12 transition-all"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>

              <Button
                variant="outline"
                onClick={() => signIn("github")}
                className="flex items-center gap-2 justify-center bg-gray-800/50 text-white hover:bg-gray-700/70 border border-gray-700/50 rounded-lg h-12 transition-all"
              >
                <Github className="h-5 w-5" />
                GitHub
              </Button>
            </div> */}

            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    onSwitchToSignUp()
                  }}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </motion.form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
