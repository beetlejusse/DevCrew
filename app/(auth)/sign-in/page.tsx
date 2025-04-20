"use client"

import type React from "react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Loader2, LockKeyhole, Mail } from "lucide-react"
import router, { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function SignInPage({
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
  const router = useRouter()

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
      toast.success("Login successful")
      onClose()
      router.push("/dashboard") 
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
            <p className="text-center text-gray-400 mt-2 text-sm">
              Sign in to continue your journey
            </p>
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
