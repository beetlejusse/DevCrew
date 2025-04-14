import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import teamModel from "@/models/Team.model";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const teams = await teamModel.find({}).populate("members");

    return NextResponse.json({ success: true, teams }, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
