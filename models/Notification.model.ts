import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Notification extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<Notification>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String },
  message: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default models.Notification || model<Notification>("Notification", NotificationSchema);
