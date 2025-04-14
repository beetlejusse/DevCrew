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