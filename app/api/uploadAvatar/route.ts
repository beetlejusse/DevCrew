import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import userModel from "@/models/User.model";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.formData();
  const file = data.get("avatar") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploaded = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "devcrew/avatars", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      )
      .end(buffer);
  });

  const imageUrl = (uploaded as any).secure_url;

  await dbConnect();
  const updatedUser = await userModel.findOneAndUpdate(
    { email: session.user.email },
    { avatar: imageUrl },
    { new: true }
  );

  return NextResponse.json({ message: "Avatar uploaded", avatar: imageUrl, user: updatedUser });
}
