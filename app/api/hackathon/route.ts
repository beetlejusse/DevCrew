import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import hackModel from "@/models/Hackathon.model";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
    dbConnect();
  if (req.method === "GET") {
    try {
      const hackathons = await hackModel.find().populate("participants", "userName avatar");

      return NextResponse.json({ message: "Hackathon fetched successfully", hackathon: hackathons }, { status: 201 });
    } catch (error) {
      console.error("Error fetching hackathons:", error);
      return NextResponse.json({ message: "Server Error" }, { status: 500});
    }
  } else {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }
};
