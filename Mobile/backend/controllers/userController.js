import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Register
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already registered. Please login instead." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });

  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Error registering user." });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please register first."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password."
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    console.log("Login success for:", user.email);

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Error logging in." });
  }
};

// Logout
export const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
};

// Check Auth
export const checkAuth = (req, res) => {
  res.status(200).json({ user: req.user });
};