import create from "zustand";
import { devtools } from "zustand/middleware";
import api from "../services/api";

const transactionStore = (set) => ({
  transactionData: [],
  setTransactionData: (data) => {
    // console.log(data);
    set((state) => ({
      unitData: data,
    }));
  },
  reloadData: (prop_id, unit_id) => {
    api
      .get(
        `http://192.168.29.112:5000/properties/${prop_id}/units/${unit_id}/transactions`
      )
      .then(({ data }) => {
        set((state) => ({
          transactionData: data.transactions,
        }));
      });
  },
});

const useTransactionStore = create(devtools(transactionStore));
export default useTransactionStore;
