import express from "express";
import next from 'next';
import http from 'http';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = parseInt('8080', 10);

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  const onlineUsers = new Map<string, string>(); // userId -> socketId

  io.on('connection', (socket) => {
    console.log(`🟢 Connected: ${socket.id}`);

    socket.on('register', (userId: string) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on('privateMessage', ({ to, from, message }) => {
      const targetSocket = onlineUsers.get(to);
      if (targetSocket) {
        io.to(targetSocket).emit('privateMessage', { from, message });
        console.log(`📨 ${from} ➝ ${to}: ${message}`);
      }
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`🔴 Disconnected: ${userId}`);
          break;
        }
      }
    });
  });

  expressApp.all('*', (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => handle(req, res));
  server.listen(port, () => console.log(`🚀 Server ready at http://localhost:${port}`));
});
