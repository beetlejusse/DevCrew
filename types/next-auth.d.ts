import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    _id?: string;
    userName?: string;
  }
  interface Session {
    user: {
      _id?: string;
      userName?: string;
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    userName?: string;
  }
}

// types/next.d.ts
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

export type NextApiResponseServerIO = {
  socket: NetSocket & {
    server: HTTPServer & {
      io: IOServer;
    };
  };
};
