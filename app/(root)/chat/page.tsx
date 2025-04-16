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
import ChatBox from "@/components/ChatBox"
import DashNav from "@/components/custom-components/DashNav"

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
      <DashNav />

      {/* Chat Interface */}
      <ChatBox />
    </div>
  )
}
