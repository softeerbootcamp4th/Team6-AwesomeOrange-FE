import userStore from "@main/auth/store.js";
import { EVENT_DRAW_ID } from "@common/constants.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { EVENT_START_DATE } from "@common/constants";
import useEventStore from "@main/realtimeEvent/store.js";
import { getDayDifference } from "@common/utils";

export default function joinEvent(index) {
  const isLogin = userStore.getState().isLogin;
  const eventDate = EVENT_START_DATE.getTime() + index * 24 * 60 * 60 * 1000;
  const currentServerTime = useEventStore.getState().currentServerTime;

  if (isLogin && getDayDifference(eventDate, currentServerTime) === 0) {
    fetchServer(`/api/v1/event/draw/${EVENT_DRAW_ID}/participation`, {
      method: "POST",
    }).catch((e) => {
      console.log(e);
    });
  }
}
