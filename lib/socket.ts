// lib/socket.ts
import  io, {Socket}  from "socket.io-client";

let socket: typeof Socket;

export const initiateSocket = () => {
  socket = io({
    path: "/api/socket",
  });
};

export const getSocket = (): typeof Socket => socket;
