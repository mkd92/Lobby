import create from "zustand";
import { devtools } from "zustand/middleware";
import api from "../services/api";

const ownerStore = (set) => ({
  ownerData: {},
  updateOwnerData: (data) => {
    // console.log(data);
    set((state) => ({
      ownerData: {
        ...state.ownerData,
        ...data,
      },
    }));
  },
  reloadData: () => {
    api.get("http://192.168.29.112:5000/properties/").then(({ data }) => {
      set((state) => ({
        ownerData: data,
      }));
    });
  },
});

const useOwnerStore = create(devtools(ownerStore));
export default useOwnerStore;
