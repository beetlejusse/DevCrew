// "use client"

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { ArrowRight, Loader2 } from "lucide-react"
// import axios from "axios"
// import { useState } from "react"
// import { signupFormSchema } from "@/lib/zod"
// import { toast } from "sonner"

// export default function SignupPage({
//   open,
//   onClose,
//   onSwitchToSignIn,
// }: {
//   open: boolean
//   onClose: () => void
//   onSwitchToSignIn: () => void
// }) {
//   const form = useForm<z.infer<typeof signupFormSchema>>({
//     resolver: zodResolver(signupFormSchema),
//     defaultValues: {
//       userName: "",
//       email: "",
//       password: "",
//     },
//   })

//   const [isSubmitted, setIsSubmitted] = useState(false)

//   const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
//     setIsSubmitted(true)
//     try {
//       const response = await axios.post("/api/sign-up", values)

//       if (response.status === 200) {
//         console.log("User registered successfully:", response.data)
//         onClose()
//         toast.success("Account created successfully! Please log in.")
//       } else {
//         console.error("Registration failed:", response.data)
//         toast.error("Registration failed. Please try again.")
//       }
//     } catch (error) {
//       console.error("API error during registration:", error)
//       toast.error("Registration failed. Please try again. API Error")
//     } finally {
//       setIsSubmitted(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md bg-[#0B1120] border border-[#1E293B]/40 text-white p-0 overflow-hidden">
//         <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-950/60 via-black/30 to-slate-950/80" />
//         <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-blue-800/30 blur-3xl" />
//         <div className="absolute -top-40 right-20 h-96 w-96 rounded-full bg-fuchsia-800/20 blur-3xl" />

//         <div className="relative z-10 p-6">
//           <DialogHeader>
//             <DialogTitle className="text-white text-2xl">Create your account</DialogTitle>
//             <DialogDescription className="text-gray-400 text-sm">
//               Join us and find your perfect hackathon team.
//             </DialogDescription>
//           </DialogHeader>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
//               <FormField
//                 control={form.control}
//                 name="userName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-300">Username</FormLabel>
//                     <FormControl>
//                       <Input
//                         className="bg-gray-900 text-white border-gray-700"
//                         placeholder="johndoe"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-400" />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-300">Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         className="bg-gray-900 text-white border-gray-700"
//                         placeholder="john@example.com"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-400" />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-300">Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="password"
//                         className="bg-gray-900 text-white border-gray-700"
//                         placeholder="••••••••"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="text-red-400" />
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 type="submit"
//                 className="w-full h-11 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium"
//                 disabled={isSubmitted}
//               >
//                 {isSubmitted ? (
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                 ) : (
//                   <span className="flex items-center justify-center">
//                     Create Account
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </span>
//                 )}
//               </Button>
//             </form>
//           </Form>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }


"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useDebounceCallback } from "usehooks-ts"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Loader2, AtSign, Lock, User, ArrowRight, Github, Twitter } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { signupSchema } from "@/lib/zod"

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [userName, setUserName] = useState("")
  const [nameMessage, setNameMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const debouncedUserName = useDebounceCallback(async (value: string) => {
    if (value.length < 3) {
      setNameMessage("")
      return
    }
  }, 500)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitted(true)
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data)

      toast("Welcome aboard!", {
        description: response.data.message || "Your account has been created successfully",
      })

      // router.push(/sign-in)
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Something went wrong"
      toast("Signup Failed", {
        description: message,
      })
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0B1120] border border-[#1E293B]/40 text-white p-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-black/30 to-slate-950/80" />
        <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-blue-800/30 blur-3xl" />
        <div className="absolute -top-40 right-20 h-96 w-96 rounded-full bg-fuchsia-800/20 blur-3xl" />

        <div className="relative z-10 p-6">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Join the Community
            </DialogTitle>
            <p className="text-center text-gray-400 mt-2">Create your account and start building amazing things</p>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
              <FormField
                name="userName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <Input
                          placeholder="Choose a unique username"
                          className="bg-[#1E293B]/30 border-[#334155] text-white pl-10 h-11 focus-visible:ring-blue-500"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            debouncedUserName(e.target.value)
                          }}
                        />
                      </div>
                    </FormControl>
                    {nameMessage && (
                      <p
                        className={`text-xs mt-1 ${
                          nameMessage.includes("available") ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {nameMessage}
                      </p>
                    )}
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="bg-[#1E293B]/30 border-[#334155] text-white pl-10 h-11 focus-visible:ring-blue-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                        <Input
                          type="password"
                          placeholder="Create a secure password"
                          className="bg-[#1E293B]/30 border-[#334155] text-white pl-10 h-11 focus-visible:ring-blue-500"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
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

          {/* do not touch */}
          {/* <div className="relative flex items-center justify-center mt-6 mb-6">
            <Separator className="absolute w-full bg-gray-700/50" />
            <span className="relative bg-[#0B1120] px-2 text-xs text-gray-400">OR CONTINUE WITH</span>
          </div> */}

          {/* <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-[#1E293B]/30 border-[#334155] text-white hover:bg-[#1E293B]/50">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="bg-[#1E293B]/30 border-[#334155] text-white hover:bg-[#1E293B]/50">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
          </div> */}

          {/* <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-400 hover:text-blue-300 hover:underline font-medium">
              Sign in
            </Link>
          </p> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}