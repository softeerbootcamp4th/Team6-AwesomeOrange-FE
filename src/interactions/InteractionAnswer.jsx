import scrollTo from "@/scroll/scrollTo";
import style from "./InteractionAnswer.module.css";
import { useEffect, useState } from "react";
import openModal from "@/modal/openModal.js";
import AuthModal from "@/auth/AuthModal.jsx";
// import fcfsStore from "@/fcfs/store";

export default function InteractionAnswer({
  isAnswerUp,
  setIsAnswerUp,
  answer,
  close,
  isLogin,
}) {
  // const currentServerTime = fcfsStore((state) => state.currentServerTime);
  const [isAniPlaying, setIsAniPlaying] = useState(false);
  const [isEventToday, setIsEventToday] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const authModal = (
    <AuthModal
      onComplete={() => {
        /*
         *  비로그인자가 정보등록을 성공시켰을 때 서버로 추첨이벤트 참여 api를 보내는 코드 미구현
         */
      }}
    />
  );

  useEffect(() => {
    /*
     *  서버에서 해당 날짜의 사용자 응모 여부와, 시간을 받아온 후 이벤트 날짜와 비교하는 코드 미구현
     */

    setIsEventToday(true);
    setIsJoined(false);
  }, []);

  function onClickWrite() {
    close();
    scrollTo(3);
  }

  function onClickShare() {
    setIsAniPlaying(true);

    /*
     *  서버에서 단축 url을 받아오는 코드 미구현
     */

    const simpleURL = "https://youtu.be/KMU0tzLwhbE";
    navigator.clipboard.writeText(simpleURL);
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
        <img src="icons/left-arrow.svg" alt="뒤로가기" />
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
        {isLogin ? (
          <>
            <span className="text-body-m text-green-400 font-bold">
              {isJoined
                ? "오늘 응모가 완료되었습니다!"
                : "응모 기간이 지났습니다!"}
            </span>

            <div className="flex gap-4 items-end">
              <div className="flex flex-col gap-2">
                <div
                  className={`${isEventToday ? "" : "hidden"} relative flex flex-col items-center animate-bounce`}
                >
                  <span className=" bg-green-400 text-nowrap text-body-s xl:text-body-m text-neutral-800 rounded-full px-4 xl:px-8 py-1 xl:py-2 font-bold">
                    당첨확률 UP!
                  </span>

                  <img src="icons/polygon-tri.svg" alt="역삼각형" />
                </div>

                <button
                  onClick={onClickWrite}
                  className="bg-white text-body-m text-black px-5 xl:px-10 py-2 xl:py-4"
                >
                  기대평 작성하기
                </button>
              </div>

              <button
                onClick={onClickShare}
                className="border-2 border-neutral-300 text-body-m text-white px-5 xl:px-10 py-[7px] xl:py-[14px]"
              >
                공유하기
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => openModal(authModal)}
            className="text-body-m text-black bg-white px-10 py-4"
          >
            응모하기
          </button>
        )}
      </div>
    </div>
  );
}
