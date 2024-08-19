import { isLogined } from "@main/auth/store.js";
import drawEventStore from "@main/drawEvent/store.js";

import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { getDayDifference } from "@common/utils.js";
import { EVENT_DRAW_ID } from "@common/constants.js";

export default function joinEvent(index) {
  const isLogin = isLogined();
  const { isTodayEvent, currentJoined, setCurrentJoin } = drawEventStore.getState();
  const todayEvent = isTodayEvent(index);

  if( !isLogin || !todayEvent || currentJoined ) return;

  fetchServer(`/api/v1/event/draw/${EVENT_DRAW_ID}/participation`, {method: "post"})
    .then( ()=>setCurrentJoin( true ) )
    .catch( ()=>{
      console.log(e);
      alert("이벤트 참여에 실패했습니다.");
    } );
}
