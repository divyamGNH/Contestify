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

    const contests = response.data.objects;

    const simplifiedObjects = contests.map(contest=>({
      id: contest.id,
      event: contest.event,
      platform: contest.resource,
      start: contest.start,
      href: contest.href,
    }));

    //convert the array to string to send to the frontend so we need to parse this in the frontend side to be able to map over it.
    res.json(simplifiedObjects);
  } catch (error) {
    console.error("Error fetching contest:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};
