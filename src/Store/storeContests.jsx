import { create } from "zustand";
import axios from "axios";

const useContestStore = create((set) => ({
  personalPlatforms: [],
  liveContests: [],

  getPersonalPlatforms: async (req, res) => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/getPlatformData/getPersonalPlatforms",
        {
          withCredentials: true,
        }
      );
      set({ personalPlatforms: res.data });
    } catch (error) {
      console.error("Error fetching personal platforms:", error);
    }
  },

  getLiveContestData: async (req, res) => {
    try {
      const res = await axios.get("http://localhost:3000/api/getContestData/", {
        withCredentials: true,
      });

      set({ liveContests: res.data });
    } catch (error) {
      console.log("Error fetching live platforms", error);
    }
  },
}));

export default useContestStore;
