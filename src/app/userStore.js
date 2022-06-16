import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useNavigate } from "react-router-dom";

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
    set((state) => ({
      userData: {
        token: null,
        user_id: null,
        username: null,
      },
    }));
  },
});

const useUserStore = create(devtools(persist(userStore, { name: "userData" })));

export default useUserStore;
