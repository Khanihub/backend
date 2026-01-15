import mongoose from "mongoose"

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    isMuslim: {
      type: Boolean,
      required: true,
      default: true
    },

    sect: {
      type: String,
      enum: ["Sunni", "Shia", "Ahle Hadith", "Deobandi", "Barelvi", ""],
      required: function () {
        return this.isMuslim === true
      },
      default: ""
    },

    gender: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    education: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
)

export default mongoose.model("Profile", profileSchema)
