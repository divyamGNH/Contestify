import { create } from "zustand";
import axios from "axios";

const useContestStore = create((set,get) => ({
  personalPlatforms: [],
  liveContests: [],
  livePersonalContests: [],

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

  getLivePersonalContestData: async()=>{
    const {liveContests, personalPlatforms} = get();

    console.log("Personal Platforms:", personalPlatforms);
    console.log("All Live Contests:", liveContests);

    const platformSet = new Set(personalPlatforms);

    try {
      const finalData = liveContests.filter(platform => platformSet.has(platform.platform));
      
      console.log("Filtered Live Personal Contests:", finalData);
      
      set({livePersonalContestData : finalData});
    } catch (error) {
      console.log("Error fetching personal and live platforms", error);
    }
  }
}));

export default useContestStore;
