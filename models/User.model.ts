import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ProofOfWork {
    platform: string;  // "twitter", "linkedin", "github"
    postUrl: string;   // URL of the post
    description?: string; // Optional description
    addedAt: Date;     // When this POW was added
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
    proofOfWork?: ProofOfWork[]; 
    hackathons: mongoose.Types.ObjectId[];
    teams: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const ProofOfWorkSchema = new Schema({
    platform: { type: String, required: true, enum: ["twitter", "linkedin", "github"] },
    postUrl: { type: String, required: true },
    description: String,
    addedAt: { type: Date, default: Date.now }
});

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
    proofOfWork: [ProofOfWorkSchema], 
    hackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    createdAt: { type: Date, default: Date.now },
});

const userModel = models.User || model<User>("User", UserSchema);
export default userModel;