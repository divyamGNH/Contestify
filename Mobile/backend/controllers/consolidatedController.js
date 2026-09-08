import axios from "axios";
import User from "../models/User.js";
import { fetchAllUserRatings } from "../services/multiPlatformService.js";

/**
 * GET /api/consolidated-data
 * Consolidated backend API to retrieve contest schedules and multi-platform user rating data
 * into a single unified payload. Helps users avoid missing contests and track CP activity.
 */
export const getConsolidatedData = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized: userId missing" });
    }

    // 1. Fetch user data (selected platforms & platform handles)
    const user = await User.findById(userId).select("username selectedPlatforms handles");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const now = new Date();
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 2. Fetch contest data from CList API & fetch multi-platform user ratings in parallel
    const [contestResponse, multiRatings] = await Promise.all([
      axios
        .get("https://clist.by/api/v4/contest/", {
          params: {
            username: process.env.CLIST_USERNAME,
            api_key: process.env.CLIST_API_KEY,
            start__gt: now.toISOString(),
            start__lt: nextWeek.toISOString(),
            order_by: "start",
          },
        })
        .catch(() => null),
      fetchAllUserRatings(user.handles || {}),
    ]);

    let contests = [];
    if (contestResponse?.data?.objects) {
      contests = contestResponse.data.objects.map((c) => ({
        id: c.id,
        event: c.event,
        host: c.host,
        platform: c.resource,
        start: c.start,
        end: c.end,
        href: c.href,
      }));
    }

    // Filter contests if user has specified selected platforms
    const selectedPlatforms = user.selectedPlatforms || [];
    const isPlatformSelected = (platformName) => {
      if (!selectedPlatforms || selectedPlatforms.length === 0) return true;
      return selectedPlatforms.some((sp) =>
        typeof sp === "string"
          ? platformName.toLowerCase().includes(sp.toLowerCase())
          : platformName.toLowerCase().includes(sp.name?.toLowerCase() || "")
      );
    };

    const filteredContests = contests.filter((c) => isPlatformSelected(c.platform));

    const liveContests = filteredContests.filter((c) => {
      const start = new Date(c.start);
      const end = c.end ? new Date(c.end) : null;
      return start <= now && (!end || now <= end);
    });

    const todayContests = filteredContests.filter((c) => {
      const start = new Date(c.start);
      return (
        start.getFullYear() === now.getFullYear() &&
        start.getMonth() === now.getMonth() &&
        start.getDate() === now.getDate()
      );
    });

    const tomorrowContests = filteredContests.filter((c) => {
      const t = new Date(now);
      t.setDate(t.getDate() + 1);
      const start = new Date(c.start);
      return (
        start.getFullYear() === t.getFullYear() &&
        start.getMonth() === t.getMonth() &&
        start.getDate() === t.getDate()
      );
    });

    // 3. Assemble consolidated response
    return res.json({
      success: true,
      user: {
        username: user.username,
        selectedPlatforms,
        handles: user.handles || {},
      },
      contests: {
        summary: {
          totalUpcomingWeek: filteredContests.length,
          liveCount: liveContests.length,
          todayCount: todayContests.length,
        },
        live: liveContests,
        today: todayContests,
        tomorrow: tomorrowContests,
        week: filteredContests,
      },
      ratings: multiRatings,
    });
  } catch (error) {
    console.error("Error in getConsolidatedData:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch consolidated contest and rating data",
      message: error.message,
    });
  }
};
