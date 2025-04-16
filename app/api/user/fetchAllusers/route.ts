import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import userModel from "@/models/User.model";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// Define the type for the user object we want to return
interface UserResponse {
  _id: string;
  userName: string;
}

// GET handler to fetch all users except the authenticated user
export async function GET(req: Request) {
  // Get the current session
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Fetch all users except the current user (based on email)
    const users = await userModel
        .find({ email: { $ne: session.user.email } }) // Exclude the current user
        .select("_id userName") // Only select the fields we need
        .lean() // Convert Mongoose documents to plain JavaScript objects
        .exec() as unknown as UserResponse[]; // Explicitly type the result as UserResponse[]

    return NextResponse.json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}