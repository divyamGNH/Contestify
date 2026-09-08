import User from "../models/User.js";
import { fetchAllUserRatings } from "../services/multiPlatformService.js";

/**
 * GET /api/ratings
 * Retrieves user ratings and activity across multiple competitive programming platforms.
 */
export const getMultiPlatformRatings = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized: userId missing" });
    }

    const user = await User.findById(userId).select("handles");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const handles = user.handles || {};
    const ratings = await fetchAllUserRatings(handles);

    return res.json({
      success: true,
      handles,
      ratings,
    });
  } catch (error) {
    console.error("Error retrieving multi-platform ratings:", error);
    return res.status(500).json({ success: false, error: "Failed to retrieve ratings", message: error.message });
  }
};

/**
 * PUT /api/ratings/handles
 * Updates competitive programming platform handles for the user.
 */
export const updatePlatformHandles = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized: userId missing" });
    }

    const { codeforces, leetcode, codechef, atcoder } = req.body;

    const updateFields = {};
    if (codeforces !== undefined) updateFields["handles.codeforces"] = codeforces.trim();
    if (leetcode !== undefined) updateFields["handles.leetcode"] = leetcode.trim();
    if (codechef !== undefined) updateFields["handles.codechef"] = codechef.trim();
    if (atcoder !== undefined) updateFields["handles.atcoder"] = atcoder.trim();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    ).select("handles");

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.json({
      success: true,
      message: "Handles updated successfully",
      handles: updatedUser.handles,
    });
  } catch (error) {
    console.error("Error updating platform handles:", error);
    return res.status(500).json({ success: false, error: "Failed to update handles", message: error.message });
  }
};

/**
 * GET /api/ratings/handles
 * Retrieves stored platform handles for the logged-in user.
 */
export const getUserHandles = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized: userId missing" });
    }

    const user = await User.findById(userId).select("handles");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.json({
      success: true,
      handles: user.handles || {},
    });
  } catch (error) {
    console.error("Error fetching handles:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
