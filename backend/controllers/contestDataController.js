import axios from "axios";
import User from "../models/User.js";

const now = new Date();
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//Live contest data is provided here.
export const getContestData = async (req, res) => {
  try {
    const response = await axios.get("https://clist.by/api/v4/contest/", {
      params: {
        username: process.env.CLIST_USERNAME,
        api_key: process.env.CLIST_API_KEY,
        start__gt: now.toISOString(),
        start__lt: nextWeek.toISOString(),
        order_by: "start",
        // limit: 5
      },
    });

    const contests = response.data.objects;

    const simplifiedObjects = contests.map((contest) => ({
      id: contest.id,
      event: contest.event,
      host: contest.host,
      platform: contest.resource,
      start: contest.start,
      href: contest.href,
    }));

    //convert the array to string to send to the frontend so we need to parse this in the frontend side to be able to map over it.
    res.json(simplifiedObjects);
  } catch (error) {
    console.error(
      "Error fetching contest:",
      error.response?.data || error.message
    );
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getPersonalLiveContests = async(req,res)=>{
  
// }
