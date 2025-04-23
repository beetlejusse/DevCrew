"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useSession } from "next-auth/react"
import { useChatSocket } from "@/hooks/useChatSocket"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send, AlertCircle, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ChatPage() {
  const { data: session, status } = useSession()
  const currentUserId = session?.user?._id || ""

  const { sendMessage, onMessage } = useChatSocket(currentUserId)
  const [recipientId, setRecipientId] = useState("")
  const [message, setMessage] = useState("")
  const [chatLog, setChatLog] = useState<{ from: string; message: string }[]>([])
  const [allUsers, setAllUsers] = useState<{ _id: string; userName: string }[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatLog])

  useEffect(() => {
    if (!currentUserId) return

    onMessage((data) => {
      setChatLog((prev) => [...prev, data])
    })
  }, [onMessage, currentUserId])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get("/api/user/fetchAllusers")
        console.log("API response:", res.data)

        const users = Array.isArray(res.data.users) ? res.data.users : []
        setAllUsers(users)
      } catch (err) {
        console.error("Error fetching users:", err)
        setError("Failed to load users. Please try again later.")
        setAllUsers([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleSendMessage = () => {
    if (!message.trim()) return
    if (!recipientId) {
      setError("Please select a recipient.")
      return
    }

    sendMessage(recipientId, message)
    setChatLog((prev) => [...prev, { from: currentUserId, message }])
    setMessage("")
    setError(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getRecipientName = (id: string) => {
    const user = allUsers.find((u) => u._id === id)
    return user ? user.userName : id
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-500">Loading your chat...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated" || !currentUserId) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Alert className="max-w-md bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription>Please sign in to use the chat.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-lg ">
          <CardContent className="p-6 space-y-5">
            {error && (
              <Alert variant="destructive" className="mb-4 animate-in fade-in slide-in-from-top-5 duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                {isLoading ? (
                  <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-gray-50">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-500">Loading users...</span>
                  </div>
                ) : (
                  <Select value={recipientId} onValueChange={setRecipientId}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(allUsers) && allUsers.length > 0 ? (
                        allUsers
                          .filter((u) => u._id !== currentUserId)
                          .map((user) => (
                            <SelectItem key={user._id} value={user._id}>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 bg-blue-100">
                                  <AvatarFallback className="bg-blue-100 text-blue-600">
                                    {user.userName.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{user.userName}</span>
                              </div>
                            </SelectItem>
                          ))
                      ) : (
                        <SelectItem value="" disabled>
                          No users available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="md:col-span-1">
                {recipientId && (
                  <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>Last active: Just now</span>
                  </div>
                )}
              </div>
            </div>

            <Card className="overflow-hidden border-gray-200">
              <CardHeader className="py-2 px-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {recipientId ? `Chatting with ${getRecipientName(recipientId)}` : "Chat Log"}
                  </CardTitle>
                  <span className="text-xs text-gray-500">{chatLog.length} messages</span>
                </div>
              </CardHeader>
              <ScrollArea className="h-[400px] p-4 bg-gray-50/50">
                {chatLog.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                    <Send className="h-10 w-10 stroke-[1.25]" />
                    <p className="text-center">
                      {recipientId ? "No messages yet. Start the conversation!" : "Select a user to start chatting"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatLog.map((msg, idx) => {
                      const isCurrentUser = msg.from === currentUserId
                      return (
                        <div
                          key={idx}
                          className={cn(
                            "flex gap-2 transition-all duration-200 animate-in fade-in",
                            isCurrentUser ? "justify-end" : "justify-start",
                          )}
                        >
                          {!isCurrentUser && (
                            <Avatar className="h-8 w-8 mt-1 border-2 border-white shadow-sm">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {getRecipientName(msg.from).substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={cn(
                              "max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                              isCurrentUser
                                ? "bg-blue-600 text-white rounded-tr-none"
                                : "bg-white border rounded-tl-none",
                            )}
                          >
                            {msg.message}
                            <div
                              className={cn(
                                "text-[10px] mt-1",
                                isCurrentUser ? "text-blue-100 text-right" : "text-gray-400",
                              )}
                            >
                              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>
            </Card>

            <div className="flex gap-3 pt-2">
              <Input
                type="text"
                placeholder={recipientId ? "Type your message..." : "Select a user first..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 h-12 border-gray-300 focus:border-blue-400 focus:ring-blue-400"
                disabled={!recipientId}
              />
              <Button
                onClick={handleSendMessage}
                className="h-12 px-6 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                disabled={!recipientId || !message.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
