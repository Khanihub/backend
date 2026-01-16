import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
    religion: { 
      type: String, 
      enum: ["Muslim", "Non-Muslim", "Prefer Not to Say"], 
      required: true 
    },
    guardianContact: { type: String } // optional for Muslim users
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
