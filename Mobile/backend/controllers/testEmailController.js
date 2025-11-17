import User from "../models/User.js";
import nodemailer from "nodemailer";

export const sendTestEmail = async (req, res) => {
  try {
    // FIXED ➜ Extract correct field from JWT payload
    const userId = req.user.userId;

    // 1. Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Setup mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // 3. Send mail
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Test Email",
      text: "This is a test email from ContestReminder app!",
    });

    res.json({
      success: true,
      message: "Test email sent successfully!",
    });

  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
