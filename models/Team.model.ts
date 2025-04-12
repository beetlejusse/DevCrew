import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Team extends Document {
    name: string;
    description?: string;
    members: mongoose.Types.ObjectId[];
    hackathon?: mongoose.Types.ObjectId;
    createdAt: Date;
}

const TeamSchema = new Schema<Team>({
    name: { type: String, required: true },
    description: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    hackathon: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" },
    createdAt: { type: Date, default: Date.now },
});

export default models.Team || model<Team>("Team", TeamSchema);
