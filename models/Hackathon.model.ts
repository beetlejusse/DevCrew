import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Hackathon extends Document {
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  url?: string;
  participants: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const HackathonSchema = new Schema<Hackathon>({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  url: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

export default models.Hackathon || model<Hackathon>("Hackathon", HackathonSchema);
