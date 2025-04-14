import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import userModel from "@/models/User.model";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const user = await userModel.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User fetched", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await req.json();

    const updatedUser = await userModel.findOneAndUpdate(
      { email: session.user.email },
      { $set: data },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}