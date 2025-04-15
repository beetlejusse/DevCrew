import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Hackathon extends Document {
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  url?: string;
  participants: mongoose.Types.ObjectId[];
  createdAt: Date;
  coverPhoto?: string;
}

const HackathonSchema = new Schema<Hackathon>({
  title: { type: String, required: true },
  coverPhoto: { type: String, default: "", required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  url: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const hackModel = models.Hackathon || model<Hackathon>("Hackathon", HackathonSchema);
export default hackModel;