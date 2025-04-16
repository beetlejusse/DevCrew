import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/db";
// import userModel from "@/models/User.model";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//         GitHubProvider({
//             clientId: process.env.GITHUB_CLIENT_ID!,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//         }),
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 await dbConnect();
//                 const user = await userModel.findOne({ email: credentials?.email });
//                 if (!user || !user.password) return null;

//                 const isValid = await bcrypt.compare(credentials!.password, user.password);
//                 if (!isValid) return null;

//                 return { id: user._id.toString(), email: user.email };
//             },
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/signin",
//     },
//     session: {
//         strategy: "jwt",
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) token.id = user.id;
//             return token;
//         },
//         async session({ session, token }) {
//             if (token?.id) session.user.id = token.id as string;
//             return session;
//         },
//         async signIn({ user }) {
//             await dbConnect();
//             const existingUser = await userModel.findOne({ email: user.email });
//             if (!existingUser) {
//                 await userModel.create({ email: user.email });
//             }
//             return true;
//         },
//     },
// });

// export { handler as GET, handler as POST };
