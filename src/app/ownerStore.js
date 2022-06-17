import create from "zustand";
import { devtools } from "zustand/middleware";

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
});

const useOwnerStore = create(devtools(ownerStore));
export default useOwnerStore;
