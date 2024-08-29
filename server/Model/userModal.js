import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const userModal = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "guest"],
      default: "user",
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, "Please provide a valid phone number"],
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const USER = mongoose.model(
  collections.USER_COLLECTION,
  userModal
);
