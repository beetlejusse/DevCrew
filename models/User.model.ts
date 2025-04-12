import mongoose, { Schema, Document, models, model } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
    location?: string;
    skills: string[];
    interests: string[];
    socialLinks?: {
        github?: string;
        linkedin?: string;
        portfolio?: string;
    };
    hackathons: mongoose.Types.ObjectId[];
    teams: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String,
    bio: String,
    location: String,
    skills: [{ type: String }],
    interests: [{ type: String }],
    socialLinks: {
        github: String,
        linkedin: String,
        portfolio: String,
    },
    hackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    createdAt: { type: Date, default: Date.now },
});

export default models.User || model<User>("User", UserSchema);