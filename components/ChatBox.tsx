// components/ChatBox.tsx
"use client";
import React, { useEffect, useState } from "react";
import { initiateSocket, getSocket } from "../lib/socket";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/socket"); // Ping the server once
    initiateSocket();
    const socket = getSocket();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("message", (msg: string) => {
      setLog((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    const socket = getSocket();
    socket.emit("message", message);
    setLog((prev) => [...prev, message]);
    setMessage("");
  };

  return (
    <div className="p-4">
      <h2>Chat</h2>
      <div className="mb-4">
        {log.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <input
        className="border p-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="ml-2 px-4 py-2 bg-blue-500 text-white" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
