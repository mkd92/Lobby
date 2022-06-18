import create from "zustand";
import { devtools } from "zustand/middleware";
import api from "../services/api";

const unitStore = (set) => ({
  unitData: [],
  setUnitData: (data) => {
    // console.log(data);
    set((state) => ({
      unitData: data,
    }));
  },
  reloadData: (prop_id) => {
    api
      .get(`http://192.168.29.112:5000/properties/${prop_id}/units`)
      .then(({ data }) => {
        set((state) => ({
          unitData: data.units,
        }));
      });
  },
});

const useUnitStore = create(devtools(unitStore));
export default useUnitStore;
