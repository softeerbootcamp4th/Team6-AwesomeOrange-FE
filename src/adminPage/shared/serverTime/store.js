import { create } from "zustand";
import { getQuerySuspense } from "@/common/dataFetch/getQuery.js";
import { getServerPresiseTime } from "@common/utils.js";

const serverTimeStore = create((set) => ({
  serverTime: new Date("2024-08-31 12:00"), // <-- dummy initial data
  getData: () => {
    const promiseFn = async () => {
      const time = await getServerPresiseTime();
      set({ serverTime: new Date(time) });
      return time;
    };
    return getQuerySuspense("server-precise-time", promiseFn, [set]);
  },
}));

export default serverTimeStore;
