import { create } from "zustand";
import * as Status from "./constants.js";
import {
  fetchServer,
  HTTPError,
  ServerCloseError,
} from "@/common/dataFetch/fetchServer.js";
import { getQuerySuspense } from "@/common/dataFetch/getQuery.js";
import { EVENT_ID } from "@/common/constants.js";

const HOURS = 60 * 60;

async function getServerPresiseTime() {
  const startClientTime = performance.now();
  const { timestamp: serverTime } = await fetch("/api/serverTime").then((e) =>
    e.json(),
  );
  const networkPayloadTime = performance.now() - startClientTime;

  return new Date(serverTime).getTime() + networkPayloadTime;
}

async function getFcfsEventInfo() {
  try {
    const eventData = await fetchServer(`/api/v1/event/fcfs/${EVENT_ID}/info`);
    return eventData;
  } catch (e) {
    if (e instanceof HTTPError && e.status === 404)
      return {
        nowDateTime: "9999-12-31T11:59:59.000Z",
        eventStatus: Status.OFFLINE,
      };
    if (e instanceof ServerCloseError)
      return {
        currentEventTime: "9999-12-31T11:59:59.000Z",
        eventStatus: Status.OFFLINE,
      };
    throw e;
  }
}

async function getFcfsParticipated() {
  try {
    const eventData = await fetchServer(`/api/v1/event/fcfs/participated`); // ???
    return eventData;
  } catch (e) {
    if (e instanceof HTTPError && e.status === 404)
      return { answerResult: false, winner: false };
    if (e instanceof ServerCloseError)
      return { answerResult: false, winner: false };
    throw e;
  }
}

function getEventStatusFromCount(countdown) {
  if (countdown <= -7 * HOURS) return Status.OFFLINE;
  if (countdown <= 0) return Status.PROGRESS;
  if (countdown <= 3 * HOURS) return Status.COUNTDOWN;
  return Status.WAITING;
}

const fcfsStore = create((set) => ({
  countdown: 0,
  currentServerTime: 0,
  currentEventTime: 0,
  eventStatus: Status.OFFLINE,
  isParticipated: false,
  getData: () => {
    const promiseFn = async function () {
      // get server time and event info
      const [serverTime, eventInfo] = await Promise.all([
        getServerPresiseTime(),
        getFcfsEventInfo(),
      ]);
      const currentServerTime = serverTime;
      const currentEventTime = new Date(eventInfo.nowDateTime).getTime();

      // get countdown and syncronize state
      const countdown = Math.ceil(
        (currentEventTime - currentServerTime) / 1000,
      );
      set({
        currentServerTime,
        currentEventTime,
        countdown,
        eventStatus: eventInfo.eventStatus,
      });
    };
    return getQuerySuspense("fcfs-info-data", promiseFn, [set]);
  },
  getPariticipatedData: (isLogin) => {
    const promiseFn = async function () {
      const participated = await getFcfsParticipated();
      set({isParticipated: participated.answerResult});
    };
    return getQuerySuspense(`fcfs-participated-data-${isLogin}`, promiseFn, [set]);
  },
  setEventStatus: (eventStatus) => set({ eventStatus }),
  handleCountdown: () =>
    set((state) => ({
      countdown: state.countdown - 1,
      eventStatus: getEventStatusFromCount(state.countdown - 1),
    })),
}));

export default fcfsStore;
