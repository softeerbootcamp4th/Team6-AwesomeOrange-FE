import { isLogined } from "@main/auth/store.js";
import drawEventStore from "@main/drawEvent/store.js";

import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { mutate } from "@common/dataFetch/getQuery.js";
import { EVENT_DRAW_ID } from "@common/constants.js";

export default function joinEvent(index) {
  const isLogin = isLogined();
  const { isTodayEvent, getJoinStatus, setCurrentJoin } = drawEventStore.getState();
  const todayEvent = isTodayEvent(index);

  if (!isLogin || !todayEvent || getJoinStatus(index) ) return;

  mutate( 
    "draw-info-data", 
    ()=>fetchServer(`/api/v1/event/draw/${EVENT_DRAW_ID}/participation`, { method: "post" }),
    {
      onSuccess: ()=>setCurrentJoin(true),
      onError: ()=>alert("이벤트 참여에 실패했습니다.")
    }
  );
}
