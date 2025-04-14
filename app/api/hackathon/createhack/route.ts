import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import hackModel from "@/models/Hackathon.model";
import userModel from "@/models/User.model";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await req.json();

    const {
      title,
      description,
      startDate,
      endDate,
      url,
      coverPhoto
    } = body;

    const user = await userModel.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newHackathon = await hackModel.create({
      title,
      description,
      startDate,
      endDate,
      url,
      coverPhoto,
      participants: [user._id]
    });

    user.hackathons.push(newHackathon._id);
    await user.save();

    return NextResponse.json({ message: "Hackathon created", hackathon: newHackathon }, { status: 201 });
  } catch (error) {
    console.error("Hackathon creation error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
