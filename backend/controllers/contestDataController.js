import axios from "axios";

const now = new Date();
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

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
      }
    });
    res.json(response.data.objects);
  } catch (error) {
    console.error("Error fetching contest:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};
