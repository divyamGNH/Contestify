import axios from "axios";
import User from "../models/User.js";

// const now = new Date();
// const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//Live contest data is provided here.
export const getContestData = async (req, res) => {
  try {
    const now = new Date();
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const response = await axios.get("https://clist.by/api/v4/contest/", {
      params: {
        username: process.env.CLIST_USERNAME,
        api_key: process.env.CLIST_API_KEY,
        start__gt: now.toISOString(),
        start__lt: nextWeek.toISOString(),
        order_by: "start",
      },
    });

    const contests = response.data.objects.map((c) => ({
      id: c.id,
      event: c.event,
      host: c.host,
      platform: c.resource,
      start: c.start,
      end: c.end,
      href: c.href,
    }));

    const live = contests.filter((c) => {
      const start = new Date(c.start);
      const end = c.end ? new Date(c.end) : null;
      return start <= now && (!end || now <= end);
    });

    const today = contests.filter((c) => {
      const start = new Date(c.start);
      return (
        start.getFullYear() === now.getFullYear() &&
        start.getMonth() === now.getMonth() &&
        start.getDate() === now.getDate()
      );
    });

    const tomorrow = contests.filter((c) => {
      const t = new Date(now);
      t.setDate(t.getDate() + 1);
      const start = new Date(c.start);
      return (
        start.getFullYear() === t.getFullYear() &&
        start.getMonth() === t.getMonth() &&
        start.getDate() === t.getDate()
      );
    });

    const week = contests; // all contests in the week already fetched

    // send all 4 objects in a single response
    res.json({ live, today, tomorrow, week });
  } catch (error) {
    console.error("Error fetching contests:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllPlatforms = async (req, res) => {
  try {
    const response = await axios.get("https://clist.by/api/v4/resource/", {
      params: {
        username: process.env.CLIST_USERNAME,
        api_key: process.env.CLIST_API_KEY,
        limit: 20000,
        order: "name", //in alphabetical order
      },
    });

    const platforms = response.data.objects;

    // console.log(typeof response.data.objects);
    const simplifiedPlatforms = platforms.map((platform) => ({
      id: platform.id,
      icon: platform.icon,
      name: platform.name,
      short: platform.short,
    }));

    // console.log(simplifiedPlatforms);
    res.json(simplifiedPlatforms);
  } catch (error) {
    console.error(
      "Error fetching platforms:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.message });
  }
};

export const getPersonalPlatforms = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId, "selectedPlatforms");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user.selectedPlatforms);
    res.json(user.selectedPlatforms);
  } catch (error) {
    console.log("Error fetching personal platforms", error);
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getPersonalLiveContests = async(req,res)=>{
  
// }
