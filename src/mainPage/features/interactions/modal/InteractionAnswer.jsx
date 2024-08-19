import { useState, useContext } from "react";
import InteractionContext from "./context.js";
import MoveCommentButton from "./buttons/MoveCommentButton.jsx";
import ShareButton from "./buttons/ShareButton.jsx";
import ParticipateButton from "./buttons/ParticipateButton.jsx";
import AnswerDescription from "./AnswerDescription.jsx";

import useUserStore from "@main/auth/store.js";
import useDrawEventStore from "@main/drawEvent/store.js";

import style from "./InteractionAnswer.module.css";
import content from "../content.json";

function getParticipantState(index)
{
  return (state) => {
    if(!state.getOpenStatus(index) || state.fallbackMode) return "";
    if(state.isTodayEvent(index)) {
      if(state.currentJoined) return "오늘 응모가 완료되었습니다!";
      else return "";
    }
    if(state.joinStatus[index]) return "이미 응모하셨습니다!";
    else return "응모 기간이 지났습니다!";
  }
}

export default function InteractionAnswer({ isAnswerUp, setIsAnswerUp }) {
  const index = useContext(InteractionContext);

  const isLogin = useUserStore((state) => state.isLogin);
  const isTodayEvent = useDrawEventStore( (state)=>state.isTodayEvent(index) );
  const participantState = useDrawEventStore( getParticipantState(index) );
  const [isAniPlaying, setIsAniPlaying] = useState(false);

  return (
    <div
      className={`top-0 ${isAnswerUp ? "" : "translate-y-full"} absolute w-full h-full flex items-center justify-center bg-black/90 transition-all ease-out duration-300`}
    >
      <span
        onAnimationEnd={() => setIsAniPlaying(false)}
        className={`${isAniPlaying ? style.toast : ""} opacity-0 fixed top-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-blue-100 text-neutral-600 text-body-m font-bold`}
      >
        단축 URL이 클립보드에 복사 되었습니다!
      </span>

      <button
        tabIndex={isAnswerUp ? undefined : -1}
        onClick={() => setIsAnswerUp(false)}
        aria-label="뒤로가기"
        className="absolute top-5 xl:top-10 left-5 xl:left-10 p-1 xl:p-3 bg-neutral-800 rounded-full"
      >
        <img src="/icons/left-arrow.svg" alt="뒤로가기" draggable="false" />
      </button>
      <AnswerDescription {...content.answer[index]} />
      <div className="absolute bottom-10 flex flex-col items-center gap-10">
        {(isLogin || !isTodayEvent) ? (
          <>
            <span className="text-body-m text-green-400 font-bold">
              {participantState}
            </span>
            <div className="flex gap-4 items-end">
              <MoveCommentButton disabled={!isAnswerUp} hidden={!isTodayEvent}/>
              <ShareButton 
                openToast={ ()=>setIsAniPlaying(true) }
                disabled={!isAnswerUp} 
                url="https://softeer-awesome-orange.vercel.app/" 
              />
            </div>
          </>
        ) : (
          <ParticipateButton disabled={!isAnswerUp} />
        )}
      </div>
    </div>
  );
}
