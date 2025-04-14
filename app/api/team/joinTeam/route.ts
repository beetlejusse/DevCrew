import dbConnect from "@/lib/db";
import teamModel from "@/models/Team.model";
import userModel from "@/models/User.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/team/joinTeam hit");
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await userModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    console.log("Incoming body:", body);

    const { joinCode } = body;

    if (!joinCode) {
      return NextResponse.json({ error: "joinCode is required" }, { status: 400 });
    }

    const team = await teamModel.findOne({ joinCode });
    if (!team) {
      return NextResponse.json({ error: "Team not found with provided join code" }, { status: 404 });
    }

    const isAlreadyMember = team.members.some(
      (member: any) => member.toString() === user._id.toString()
    );

    if (isAlreadyMember) {
      return NextResponse.json({ message: "User already a member of this team" }, { status: 200 });
    }

    team.members.push(user._id);
    await team.save();

    return NextResponse.json({ message: "User successfully joined the team", team }, { status: 200 });

  } catch (error) {
    console.error("Join team error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
