import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Team extends Document {
    name: string;
    head: string;
    members: mongoose.Types.ObjectId[];
    hackathon?: mongoose.Types.ObjectId;
    joinCode?: string;
    createdAt: Date;
}

const TeamSchema = new Schema<Team>({
    name: { type: String, required: true },
    members: [{ type: String }],
    hackathon: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon", required: true },
    createdAt: { type: Date, default: Date.now },
    joinCode: { type: String },
    head: { type: String }
});

const teamModel = models.Team || model<Team>("Team", TeamSchema);
export default teamModel;