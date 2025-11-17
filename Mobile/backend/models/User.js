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
    type: [Object], // Array of platform names, e.g., ["leetcode", "codeforces"]
    default: [],    // at start the array is an empty array
  },
  handles: {
    type: {
      codeforces: {
        type: String,
        default: ""
      },
      leetcode: {
        type: String,
        default: ""
      },
      codechef: {
        type: String,
        default: ""
      },
      atcoder: {
        type: String,
        default: ""
      },
      // Add more platforms as needed
    },
    default: {
      codeforces: "",
      leetcode: "",
      codechef: "",
      atcoder: ""
    }
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;