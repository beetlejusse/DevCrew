"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowRight, Github, Loader2, Twitter } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { signupFormSchema } from "@/lib/zod"

export default function SignupPage({
  open,
  onClose,
  onSwitchToSignIn,
}: {
  open: boolean
  onClose: () => void
  onSwitchToSignIn: () => void
}) {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    setIsSubmitted(true)
    try {
      // Perform registration logic here
      console.log("Registering user with values:", values)
      // Example: await registerUser(values)
      onClose()
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0B1120] border border-[#1E293B]/40 text-white p-0 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-950/60 via-black/30 to-slate-950/80" />
        <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-blue-800/30 blur-3xl" />
        <div className="absolute -top-40 right-20 h-96 w-96 rounded-full bg-fuchsia-800/20 blur-3xl" />

        <div className="relative z-10 p-6">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Create your account</DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              Join us and find your perfect hackathon team.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-900 text-white border-gray-700"
                        placeholder="johndoe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="bg-gray-900 text-white border-gray-700"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-gray-900 text-white border-gray-700"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-11 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="flex items-center justify-center">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          {/* do not use its not working for now */}

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0B1120] px-2 text-gray-400">or continue with</span>
            </div>
          </div> */}

          {/* <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full text-white border-gray-700 hover:bg-gray-800"
              onClick={() => signIn("github")}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full text-white border-gray-700 hover:bg-gray-800"
              onClick={() => signIn("twitter")}
            >
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div> */}
{/* 
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
            >
              Sign in
            </button>
          </p> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
