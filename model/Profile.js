import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    fullName: { type: String, required: [true, "Full name is required"] },
    isMuslim: { type: Boolean, required: true, default: true },
    sect: {
      type: String,
      enum: ["Sunni", "Shia", "Ahle Hadith", "Deobandi", "Barelvi", "Prefer Not to Say", ""],
      default: ""
    },
    gender: { type: String, required: [true, "Gender is required"], enum: ["male", "female", "other"] },
    age: { type: Number, required: [true, "Age is required"], min: [18, "Age must be at least 18"] },
    city: { type: String, required: [true, "City is required"] },
    education: { type: String, required: [true, "Education is required"] },
    interests: { type: [String], default: [] }, // predefined list recommended
    about: { type: String, default: "" },
    height: { type: Number, default: null },
    profession: { type: String, default: "" },
    image: { type: String, default: "" },
    blurredImage: { type: String, default: "" }, // optional for blurred version
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
