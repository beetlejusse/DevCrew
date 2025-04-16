import { useEffect, useRef } from 'react';
import io, {Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; 

export const useChatSocket = (userId: string) => {
  const socket = useRef<typeof Socket | null>(null);

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.emit('register', userId);

    return () => {
      socket.current?.disconnect();
    };
  }, [userId]);

  const sendMessage = (to: string, message: string) => {
    socket.current?.emit('privateMessage', {
      from: userId,
      to,
      message,
    });
  };

  const onMessage = (callback: (data: { from: string; message: string }) => void) => {
    socket.current?.on('privateMessage', callback);
  };

  return { sendMessage, onMessage };
};
