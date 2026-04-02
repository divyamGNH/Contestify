import { create } from "zustand";
import axios from "axios";
import Constants from "expo-constants";

const { IP } = Constants.expoConfig.extra;

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  authToken: null,

  getUsername: async (token) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`http://${IP}:3000/api/getUserInfo/getUsername`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ user: res.data, loading: false, authToken: token });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  logout: () => set({ user: null, authToken: null }),
}));

export default useUserStore;