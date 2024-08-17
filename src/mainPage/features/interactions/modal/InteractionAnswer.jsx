import { useState } from "react";

import scrollTo from "@main/scroll/scrollTo.js";
import { COMMENT_SECTION } from "@main/scroll/constants.js";
import AuthModal from "@main/auth/AuthModal.jsx";
import openModal from "@common/modal/openModal.js";
import Button from "@common/components/Button.jsx";
import { fetchServer } from "@common/dataFetch/fetchServer";
import userStore from "@main/auth/store.js";
import { EVENT_START_DATE, DAY_MILLISEC } from "@common/constants.js";
import useEventStore from "@main/realtimeEvent/store.js";
import getEventDateState from "@main/realtimeEvent/getEventDateState";

import style from "./InteractionAnswer.module.css";
import joinEvent from "./joinEvent";

export default function InteractionAnswer({ isAnswerUp, setIsAnswerUp, answer, close, index }) {
  const isLogin = userStore((state) => state.isLogin);
  const currentServerTime = useEventStore((state) => state.currentServerTime);
  const eventDate = EVENT_START_DATE.getTime() + index * DAY_MILLISEC;
  const [isAniPlaying, setIsAniPlaying] = useState(false);
  const isEventToday = getEventDateState(currentServerTime, eventDate) === "active";
  const authModal = <AuthModal onComplete={() => joinEvent(index)} />;

  async function onClickWrite() {
    await close();
    scrollTo(COMMENT_SECTION);
  }

  function onClickShare() {
    setIsAniPlaying(true);

    // 단축 URL 받아오는 요청. 추후 수정 필요
    fetchServer(
      `/api/v1/url/shorten?originalUrl=https%3A%2F%2Fsofteer-awesome-orange.vercel.app%2F&userId=1`,
      {
        method: "POST",
      },
    )
      .then((res) => {
        console.log(res);
        navigator.clipboard.writeText("https://youtu.be/KMU0tzLwhbE");
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
        onClick={() => setIsAnswerUp(false)}
        className="absolute top-5 xl:top-10 left-5 xl:left-10 p-1 xl:p-3 bg-neutral-800 rounded-full"
      >
        <img src="/icons/left-arrow.svg" alt="뒤로가기" draggable="false" />
      </button>

      <div className="w-2/3 xl:w-1/2 flex flex-col xl:flex-row gap-2 xl:gap-8">
        <span className="text-head-s xl:text-head-l text-blue-400 font-bold whitespace-pre">
          {answer.head}
        </span>

        <div className="flex flex-col gap-4">
          <span className="text-body-l xl:text-title-s text-neutral-50">{answer.desc}</span>

          <span className="text-detail-l xl:text-body-s text-neutral-300">{answer.subdesc}</span>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-10">
        {isLogin || !isEventToday ? (
          <>
            <span className="text-body-m text-green-400 font-bold">
              {isEventToday ? "오늘 응모가 완료되었습니다!" : "응모 기간이 지났습니다!"}
            </span>

            <div className="flex gap-4 items-end">
              <div className={`${isEventToday ? "flex" : "hidden"} flex-col gap-2}`}>
                <div className="flex relative flex-col items-center animate-bounce">
                  <span className=" bg-green-400 text-nowrap text-body-s xl:text-body-m text-neutral-800 rounded-full px-4 xl:px-8 py-1 xl:py-2 font-bold">
                    당첨확률 UP!
                  </span>

                  <img src="icons/polygon-tri.svg" alt="역삼각형" draggable="false" />
                </div>

                <Button
                  onClick={onClickWrite}
                  styleType="filled"
                  backdrop="dark"
                  className="text-body-m px-4 sm:px-10 py-4"
                >
                  기대평 작성하기
                </Button>
              </div>

              <Button
                onClick={onClickShare}
                styleType="ghost"
                backdrop="dark"
                className="text-body-m px-4 sm:px-10 py-4"
              >
                공유하기
              </Button>
            </div>
          </>
        ) : (
          <Button
            onClick={() => openModal(authModal)}
            styleType="filled"
            backdrop="dark"
            className="text-body-m px-10 py-4"
          >
            응모하기
          </Button>
        )}
      </div>
    </div>
  );
}
