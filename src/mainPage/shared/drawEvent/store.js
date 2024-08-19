import { create } from "zustand";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { getQuery, getQuerySuspense } from "@common/dataFetch/getQuery.js";
import { getServerPresiseTime, getDayDifference } from "@common/utils.js";
import { EVENT_DRAW_ID, EVENT_START_DATE, DAY_MILLISEC } from "@common/constants.js";

function getJoinDataEvent() {
  return fetchServer(`/api/v1/event/draw/${EVENT_DRAW_ID}/participation`)
    .then(({ dates }) => {
      let newJoinedList = [false, false, false, false, false];
      dates.forEach((date) => {
        const day = getDayDifference(EVENT_START_DATE, new Date(date));
        newJoinedList[day] = true;
      });
      return newJoinedList;
    })
    .catch(() => [false, false, false, false, false]);
}

const drawEventStore = create((set, get) => ({
  joinStatus: [false, false, false, false, false],
  openBaseDate: new Date("9999-12-31"),
  currentJoined: false,
  getJoinData: (logined) => {
    async function promiseFn() {
      try {
        const [serverTime, joinStatus] = Promise.all([
          getQuery("server-time", getServerPresiseTime),
          getJoinDataEvent(),
        ]);
        const currentDay = getDayDifference(EVENT_START_DATE, serverTime);
        let currentJoined = false;
        if (currentDay >= 0 && currentDay < joinStatus.length) {
          currentJoined = joinStatus[currentDay];
        }
        set({ joinStatus, openBaseDate: serverTime, currentJoined });
        return joinStatus;
      } catch {
        set({
          joinStatus: [false, false, false, false, false],
          openBaseDate: new Date("9999-12-31"),
          currentJoined: false,
        });
        return [false, false, false, false, false];
      }
    }
    return getQuerySuspense(`draw-info-data@${logined}`, promiseFn, [set]);
  },
  setCurrentJoin: (value) => {
    set({ currentJoined: value });
  },
  getJoinStatus: (index) => {
    return get().joinStatus[index];
  },
  getOpenStatus: (index) => {
    return get().openBaseDate >= EVENT_START_DATE.getTime() + index * DAY_MILLISEC;
  },
}));

export default drawEventStore;
