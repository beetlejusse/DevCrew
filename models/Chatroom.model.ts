import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ChatRoom extends Document {
  name?: string;
  participants: mongoose.Types.ObjectId[];
  team?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ChatRoomSchema = new Schema<ChatRoom>({
  name: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  createdAt: { type: Date, default: Date.now },
});

export default models.ChatRoom || model<ChatRoom>("ChatRoom", ChatRoomSchema);
