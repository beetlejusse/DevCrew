import mongoose, { Schema, Document, models, model } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

export interface User extends Document {
    userName: string;
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
    userName: { type: String, required: true },
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

const userModel = models.User || model<User>("User", UserSchema);
export default userModel