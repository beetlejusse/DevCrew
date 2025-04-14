import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import teamModel from "@/models/Team.model";
import hackModel from "@/models/Hackathon.model";

const generateJoinCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function POST(req: NextRequest) {
    await dbConnect();

    const { name, hackathon } = await req.json();

    if (!name || !hackathon) {
        return NextResponse.json(
            { message: "Name, creator, and hackathon are required." },
            { status: 400 }
        );
    }

    const hackathonDoc = await hackModel.findOne({ title: hackathon });

    if (!hackathonDoc) {
        return NextResponse.json({ message: "Hackathon not found." }, { status: 404 });
    }

    try {
        let joinCode: string;
        let codeExists: boolean;

        do {
            joinCode = generateJoinCode();
            const result = await teamModel.findOne({ joinCode });
            codeExists = result !== null;
        } while (codeExists);

        const newTeam = await teamModel.create({
            name,
            joinCode,
            hackathon: hackathonDoc._id,
        });

        return NextResponse.json({ success: true, team: newTeam }, { status: 201 });
    } catch (err) {
        console.error("Error creating team:", err);
        return NextResponse.json({ message: "Failed to create team." }, { status: 500 });
    }
}

export async function GET() {
    await dbConnect();

    try {
        const hackathons = await hackModel.find({}, "name");
        return NextResponse.json({ hackathons }, { status: 200 });
    } catch (err) {
        console.error("Error fetching hackathons:", err);
        return NextResponse.json({ message: "Failed to fetch hackathons" }, { status: 500 });
    }
}