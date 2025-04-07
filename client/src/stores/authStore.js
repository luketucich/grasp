import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,

  checkForUser: async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        set({ user: userData });
      } else {
        set({ user: null });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      set({ user: null });
    }
  },

  setUser: (userData) => {
    set({ user: userData });
  },

  clearUser: () => {
    set({ user: null });
  },
}));

export default useAuthStore;
