import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "../services/api";

const userStore = (set) => ({
  userData: {
    token: null,
    exp: null,
    user_id: null,
    username: null,
  },
  addToken: (token, exp) => {
    set((state) => ({
      userData: { ...state.userData, token, exp },
    }));
  },
  addUser: (user_id, username) => {
    set((state) => ({
      userData: { ...state.userData, user_id, username },
    }));
  },
  logout: () => {
    api.post("/auth/logout/");
    set((state) => ({
      userData: {},
    }));
  },
});

const useUserStore = create(devtools(persist(userStore, { name: "userData" })));

export default useUserStore;
