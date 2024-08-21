import { create } from "zustand";
import { fetchServer, handleError } from "@common/dataFetch/fetchServer.js";
import { getQuery, getQuerySuspense } from "@common/dataFetch/getQuery.js";
import { getServerPresiseTime, getDayDifference } from "@common/utils.js";
import { EVENT_DRAW_ID, EVENT_START_DATE, DAY_MILLISEC } from "@common/constants.js";



function getJoinDataEvent() {
  return fetchServer(`/api/v1/event/draw/${EVENT_DRAW_ID}/participation`).then(({ dates }) => {
    let newJoinedList = [false, false, false, false, false];
    dates.forEach((date) => {
      const day = getDayDifference(EVENT_START_DATE, new Date(date));
      newJoinedList[day] = true;
    });
    return newJoinedList;
  }).catch( handleError( {401: "unauthorized"} ) )
    .catch( (e)=>{
      if(e.message === "unauthorized") return [false, false, false, false, false];
      throw e;
    });
}

const drawEventStore = create((set, get) => ({
  joinStatus: [false, false, false, false, false],
  openBaseDate: new Date("9999-12-31"),
  currentJoined: false,
  fallbackMode: false,
  getJoinData: (userId) => {
    async function promiseFn() {
      try {
        const [serverTime, joinStatus] = await Promise.all([
          getQuery("server-time", getServerPresiseTime),
          getJoinDataEvent(),
        ]);
        return { joinStatus, openBaseDate: serverTime, fallbackMode: false };
      } catch(e) {
        return {
          joinStatus: [false, false, false, false, false],
          openBaseDate: new Date("9999-12-31"),
          currentJoined: false,
          fallbackMode: true,
        };
      }
    }
    async function setter() {
      const newState = await getQuery(`draw-info-data@${userId}`, promiseFn);
      set(newState);
      return newState;
    }
    return getQuerySuspense("__zustand__draw-event-store-getData", setter, [userId, set]);
  },
  setCurrentJoin: (value) => {
    set({ currentJoined: value });
  },
  readjustJoinStatus: (index) => {
    set(({ joinStatus }) => {
      const newJoinStatus = [...joinStatus];
      newJoinStatus[index] = true;
      return { joinStatus: newJoinStatus };
    });
  },
  setFallbackMode: () => {
    set({
      joinStatus: [false, false, false, false, false],
      openBaseDate: new Date("9999-12-31"),
      currentJoined: false,
      fallbackMode: true,
    });
  },
  getJoinStatus: (index) => {
    if (get().isTodayEvent(index)) return get().currentJoined || get().joinStatus[index];
    return get().joinStatus[index];
  },
  getOpenStatus: (index) => {
    return get().openBaseDate >= EVENT_START_DATE.getTime() + index * DAY_MILLISEC;
  },
  isTodayEvent: (index) => {
    return (
      getDayDifference(get().openBaseDate, EVENT_START_DATE.getTime() + index * DAY_MILLISEC) === 0
    );
  },
}));

export default drawEventStore;
