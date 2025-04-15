"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Code,
  Search,
  Send,
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  ImageIcon,
  Paperclip,
  Smile,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data
const contacts = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey! I saw your profile and I think we'd make a great team for the Global Tech Hackathon.",
    time: "2h ago",
    unread: true,
    online: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for connecting! I'd love to discuss your project idea further.",
    time: "1d ago",
    unread: false,
    online: false,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'm interested in joining your team for the hackathon. When do you plan to start?",
    time: "2d ago",
    unread: false,
    online: true,
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let me know if you need help with the product roadmap for your hackathon project.",
    time: "3d ago",
    unread: false,
    online: false,
  },
]

// Sample messages for a conversation
const sampleMessages = [
  {
    id: 1,
    sender: "Alex Johnson",
    content: "Hey! I saw your profile and I think we'd make a great team for the Global Tech Hackathon.",
    time: "2:30 PM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Hi Alex! Thanks for reaching out. I'm definitely looking for teammates for the hackathon.",
    time: "2:32 PM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Alex Johnson",
    content:
      "Great! I'm a backend developer with experience in Node.js and Python. What kind of project are you thinking of building?",
    time: "2:35 PM",
    isMe: false,
  },
  {
    id: 4,
    sender: "Me",
    content:
      "I was thinking of building a platform that helps connect people with similar interests for collaborative projects. Something like what we're using now, but more specialized for specific industries.",
    time: "2:40 PM",
    isMe: true,
  },
  {
    id: 5,
    sender: "Alex Johnson",
    content:
      "That sounds interesting! I've actually been working on something similar in my spare time. I could handle the backend and database architecture if you're more focused on the frontend.",
    time: "2:42 PM",
    isMe: false,
  },
  {
    id: 6,
    sender: "Me",
    content:
      "Perfect! Yes, I'm more of a frontend developer with some full-stack experience. Do you have any ideas for the tech stack we should use?",
    time: "2:45 PM",
    isMe: true,
  },
  {
    id: 7,
    sender: "Alex Johnson",
    content:
      "I'm thinking Node.js with Express for the backend, MongoDB for the database, and React for the frontend. What do you think?",
    time: "2:48 PM",
    isMe: false,
  },
]

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(sampleMessages)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: "Me",
      content: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050A14] text-white">
      {/* Navbar */}
      <header className="w-[calc(100%-2rem)] mx-4 mt-4 z-50 transition-all duration-500 rounded-xl border border-white/10 bg-[#050A14]/80 backdrop-blur-lg glow-border animate-pulse-glow">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 group">
              <Code className="h-6 w-6 text-[#3B82F6] animate-pulse-slow glow-icon" />
              <span className="text-xl font-bold font-space-grotesk tracking-tight group-hover:glow-text">DevCrew</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-glow"
                >
                  <Avatar className="h-8 w-8 glow-border">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-[#111827] border-white/10 text-white animate-fade-in-down glow-border"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-white/60">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 hover:glow-text">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 hover:glow-text">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 hover:glow-text">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="flex-1 flex">
        {/* Contacts Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-white/10 glow-border">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold glow-text">Messages</h2>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-white/70 hover:text-white hover:bg-white/10 neon-border"
              >
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/40" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8 bg-[#111827] border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#3B82F6] focus:glow-border-strong"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 cursor-pointer hover:bg-[#111827] ${selectedContact.id === contact.id ? "bg-[#111827] glow-border" : ""}`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex gap-3">
                  <div className="relative">
                    <Avatar className={`h-12 w-12 ${selectedContact.id === contact.id ? "glow-border-strong" : ""}`}>
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#050A14] glow-border-strong"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className={`font-medium truncate ${selectedContact.id === contact.id ? "glow-text" : ""}`}>
                        {contact.name}
                      </div>
                      <div className="text-xs text-white/60 whitespace-nowrap ml-2">{contact.time}</div>
                    </div>
                    <div className="text-sm text-white/60 truncate">{contact.lastMessage}</div>
                  </div>
                  {contact.unread && <div className="h-2 w-2 rounded-full bg-[#3B82F6] mt-2 glow-border-strong"></div>}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-col w-2/3 lg:w-3/4">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between glow-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 glow-border">
                <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} alt={selectedContact.name} />
                <AvatarFallback>
                  {selectedContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium glow-text">{selectedContact.name}</div>
                <div className="text-xs text-white/60 flex items-center gap-1">
                  {selectedContact.online ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-500 glow-border-strong"></span>
                      <span>Online</span>
                    </>
                  ) : (
                    "Offline"
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 hover:glow-icon"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 hover:glow-icon"
              >
                <Video className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 hover:glow-icon"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] ${msg.isMe ? "bg-[#3B82F6] text-white glow-border-strong" : "bg-[#111827] glow-border"} rounded-lg p-3`}
                  >
                    <div className="text-sm">{msg.content}</div>
                    <div className={`text-xs mt-1 ${msg.isMe ? "text-white/70" : "text-white/50"}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10 glow-border">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 hover:glow-icon"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 hover:glow-icon"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1 bg-[#111827] border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#3B82F6] focus:glow-border-strong"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10 hover:glow-icon"
              >
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                type="submit"
                size="icon"
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white glow-border-strong hover:shadow-glow-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Empty State for Mobile */}
        <div className="flex-1 flex items-center justify-center md:hidden">
          <div className="text-center p-4">
            <Code className="h-12 w-12 text-[#3B82F6] mx-auto mb-4 glow-icon" />
            <h3 className="text-lg font-medium mb-2 glow-text">Your Messages</h3>
            <p className="text-white/60 mb-4">Select a conversation from the sidebar to start chatting</p>
          </div>
        </div>
      </div>
    </div>
  )
}
