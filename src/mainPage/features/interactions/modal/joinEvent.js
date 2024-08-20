import { isLogined } from "@main/auth/store.js";
import drawEventStore from "@main/drawEvent/store.js";

import { fetchServer, handleError } from "@common/dataFetch/fetchServer.js";
import { mutate } from "@common/dataFetch/getQuery.js";
import { EVENT_DRAW_ID } from "@common/constants.js";

const joinEventErrorHandler = {
  409: "이미 참여했습니다.",
  404: "이벤트가 존재하지 않습니다.",
  offline: "오프라인 폴백 모드로 전환합니다."
}

export default function joinEvent(index) {
  const isLogin = isLogined();
  const { isTodayEvent, getJoinStatus, setCurrentJoin, readjustJoinStatus, setFallbackMode } = drawEventStore.getState();
  const todayEvent = isTodayEvent(index);

  if (!isLogin || !todayEvent || getJoinStatus(index) ) return;

  mutate( 
    "draw-info-data", 
    ()=>fetchServer(`/api/v1/event/draw/${EVENT_DRAW_ID}/participation`, { method: "post" })
      .catch(handleError(joinEventErrorHandler)),
    {
      onSuccess: ()=>setCurrentJoin(true),
      onError: (e)=>{
        switch(e.message) {
          case joinEventErrorHandler[409]: 
            readjustJoinStatus();
            break;
          case joinEventErrorHandler[404]:
          case joinEventErrorHandler["offline"]:
            setFallbackMode();
            break;
          default:
            alert("이벤트 참여에 실패했습니다.");
        }
      }
    }
  );
}
