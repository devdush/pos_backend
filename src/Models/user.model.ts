import { Schema, model, Document, Types } from "mongoose";
interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  role: "cashier" | "admin" | "stuart";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["cashier", "admin", "stuart"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
