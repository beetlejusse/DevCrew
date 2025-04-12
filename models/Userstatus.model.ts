import mongoose, { Schema, Document, model, models } from "mongoose";

export interface UserStatus extends Document {
  user: mongoose.Types.ObjectId;
  isOnline: boolean;
  availableForHackathons: boolean;
  lastSeen: Date;
}

const UserStatusSchema = new Schema<UserStatus>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isOnline: { type: Boolean, default: false },
  availableForHackathons: { type: Boolean, default: true },
  lastSeen: { type: Date, default: Date.now },
});

export default models.UserStatus || model<UserStatus>("UserStatus", UserStatusSchema);
