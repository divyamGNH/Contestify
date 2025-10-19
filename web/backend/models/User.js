import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  selectedPlatforms: {
    type: [String], // Array of platform names, e.g., ["leetcode", "codeforces"]
    default: [],    // at start the array is an empty array
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
