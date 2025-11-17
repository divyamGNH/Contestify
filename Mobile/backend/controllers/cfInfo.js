import axios from "axios";
import User from "../models/User.js";


export const getCfInfo = async (req, res) => {
  try {
    // 🔥 1. Get userId from token
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Invalid token: userId missing",
      });
    }

    // 🔥 2. Fetch user from DB
    const user = await User.findById(userId).select("handles");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const handle = user.handles.codeforces?.trim();

    // 🔥 3. Check if handle exists
    if (!handle) {
      return res.status(400).json({
        success: false,
        error: "No Codeforces handle saved. Please add one first.",
      });
    }

    console.log("Using saved CF handle:", handle);

    // CF API URLs
    const userInfoUrl = `https://codeforces.com/api/user.info?handles=${handle}`;
    const ratingUrl = `https://codeforces.com/api/user.rating?handle=${handle}`;

    // 🟦 4. Fetch basic user info
    const userRes = await axios.get(userInfoUrl);

    if (userRes.data.status !== "OK") {
      return res.status(404).json({
        success: false,
        error: "Codeforces user not found",
        message: userRes.data.comment,
      });
    }

    const userInfo = userRes.data.result[0];

    // 🟩 5. Fetch rating history
    const ratingRes = await axios.get(ratingUrl);

    let lastRatingChange = 0;
    let lastContestName = null;
    let lastContestRank = null;

    if (ratingRes.data.status === "OK" && ratingRes.data.result.length > 0) {
      const last = ratingRes.data.result.at(-1);
      lastRatingChange = last.newRating - last.oldRating;
      lastContestName = last.contestName;
      lastContestRank = last.rank;
    }

    // 🟨 6. Build final JSON
    const responseData = {
      handle: userInfo.handle,
      rating: userInfo.rating || 0,
      maxRating: userInfo.maxRating || 0,
      rank: userInfo.rank || null,
      maxRank: userInfo.maxRank || null,
      contribution: userInfo.contribution ?? 0,
      lastOnline: userInfo.lastOnlineTimeSeconds ?? 0,
      avatar: userInfo.avatar ?? null,
      titlePhoto: userInfo.titlePhoto ?? null,
      country: userInfo.country ?? null,
      city: userInfo.city ?? null,
      organization: userInfo.organization ?? null,
      lastRatingChange,
      lastContestName,
      lastContestRank,
    };

    return res.json({
      success: true,
      data: responseData,
    });

  } catch (error) {
    console.log("CF API error:", error?.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch Codeforces user info",
      message: error?.response?.data?.comment || error.message,
    });
  }
};


export const updateCfHandle = async (req, res) => {
  try {
    // FIX: middleware gives userId, not _id
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Invalid token: userId missing",
      });
    }

    const handle = req.body.handle?.trim();

    if (!handle) {
      return res.status(400).json({
        success: false,
        error: "Codeforces handle is required",
      });
    }

    // Verify CF handle exists
    const verifyURL = `https://codeforces.com/api/user.info?handles=${handle}`;

    try {
      const check = await axios.get(verifyURL);
      if (check.data.status !== "OK") {
        return res.status(400).json({
          success: false,
          error: "Invalid Codeforces handle",
        });
      }
    } catch {
      return res.status(400).json({
        success: false,
        error: "Handle not found on Codeforces",
      });
    }

    // Update user's handle in DB
    const user = await User.findByIdAndUpdate(
      userId,
      { "handles.codeforces": handle },
      { new: true }
    ).select("handles");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "Codeforces handle updated successfully",
      data: user.handles,
    });

  } catch (error) {
    console.log("Update error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to update handle",
      message: error.message,
    });
  }
};

export const getUserHandle = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Invalid token: userId missing",
      });
    }

    const user = await User.findById(userId).select("handles");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.json({
      success: true,
      handle: user.handles.codeforces || "",
    });

  } catch (error) {
    console.log("Get user handle error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
