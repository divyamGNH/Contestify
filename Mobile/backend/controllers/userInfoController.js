import express from "express";
import User from "../models/User.js";

export const getUsername = async (req, res) => {
  try {
    if (!req.user && !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.userId).select("username");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ username: user.username });
  } catch (error) {
    console.log("Error finding the username", error);
    return res.status(500).json({ message: "Server error" });
  }
};
