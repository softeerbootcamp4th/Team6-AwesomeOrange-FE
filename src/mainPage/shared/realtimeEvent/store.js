import { create } from "zustand";
import * as Status from "./constants.js";
import { fetchServer, HTTPError, ServerCloseError } from "@common/dataFetch/fetchServer.js";
import { getQuery, getQuerySuspense } from "@common/dataFetch/getQuery.js";
import { getServerPresiseTime } from "@common/utils.js";
import { EVENT_FCFS_ID } from "@common/constants.js";

const HOURS = 60 * 60;

async function getFcfsEventInfo() {
  try {
    const eventData = await fetchServer(`/api/v1/event/fcfs/${EVENT_FCFS_ID}/info`);
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
    const eventData = await fetchServer(`/api/v1/event/fcfs/${EVENT_FCFS_ID}/participated`); // ???
    return eventData;
  } catch (e) {
    if (e instanceof HTTPError && (e.status === 401 || e.status == 404)) return false;
    if (e instanceof ServerCloseError) return false;
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
        getQuery("server-time", getServerPresiseTime),
        getFcfsEventInfo(),
      ]);
      const currentServerTime = serverTime;
      const currentEventTime = new Date(eventInfo.nowDateTime).getTime();

      // get countdown and syncronize state
      const countdown = Math.ceil((currentEventTime - currentServerTime) / 1000);
      return {
        currentServerTime,
        currentEventTime,
        countdown,
        eventStatus: eventInfo.eventStatus,
      };
    };
    const setter = async function () {
      const newState = await getQuery("fcfs-info-data", promiseFn);
      set(newState);
      return newState;
    };
    return getQuerySuspense("fcfs-info-data", setter, [set]);
  },
  getPariticipatedData: (userId) => {
    const setter = async function () {
      const participated = await getQuery(`fcfs-participated-data@${userId}`, getFcfsParticipated);
      set({ isParticipated: participated });
      return participated;
    };
    return getQuerySuspense(`__zustand__fcfs-participated-getData`, setter, [set, userId]);
  },
  setEventStatus: (eventStatus) => set({ eventStatus }),
  handleCountdown: () =>
    set((state) => ({
      countdown: state.countdown - 1,
      eventStatus: getEventStatusFromCount(state.countdown - 1),
    })),
}));

export default fcfsStore;
