import {create} from "zustand";
import axios from "axios";

const IP = "192.168.29.93"; // replace with your server IP

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // Fetch username from backend
  getUsername: async (token) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`http://${IP}:3000/api/getUserInfo/getUsername`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update store with fetched user info
      set({ user: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching username:", error);
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  logout: () => set({ user: null }), // optional logout
}));

export default useUserStore;
