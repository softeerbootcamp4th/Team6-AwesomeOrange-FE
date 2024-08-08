import userStore from "@/auth/store.js";
import scrollTo from "@/scroll/scrollTo";
import style from "./InteractionAnswer.module.css";
import { useState } from "react";

export default function InteractionAnswer({
  isAnswerUp,
  setIsAnswerUp,
  answer,
  close,
}) {
  const isLogin = userStore((state) => state.isLogin);
  const [isAniPlaying, setIsAniPlaying] = useState(false);

  function onClickWrite() {
    close();
    scrollTo(3);
  }

  function onClickShare() {
    setIsAniPlaying(true);

    /*
     *  서버에서 받아온 단축 url을 클립보드에 복사하는 코드 미구현
     */
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
        className="absolute top-10 left-10 p-3 bg-neutral-800 rounded-full"
      >
        <img src="icons/left-arrow.svg" alt="뒤로가기" />
      </button>

      <div className="w-1/2 flex gap-8">
        <span className="text-head-l text-blue-400 font-bold whitespace-pre">
          {answer.head}
        </span>
        <div className="flex flex-col gap-4">
          <span className="text-title-s text-neutral-50">{answer.desc}</span>

          <span className="text-body-s text-neutral-300">{answer.subdesc}</span>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-10">
        {isLogin ? (
          <>
            <span className="text-body-m text-green-400 font-bold">
              오늘 응모가 완료되었습니다!
            </span>

            <div className="flex gap-4 items-end">
              <div className="flex flex-col gap-2">
                <div className="relative flex flex-col items-center animate-bounce">
                  <span className=" bg-green-400 text-nowrap text-body-m text-neutral-800 rounded-full px-8 py-2 font-bold">
                    당첨확률 UP!
                  </span>

                  <img src="icons/polygon-tri.svg" alt="역삼각형" />
                </div>

                <button
                  onClick={onClickWrite}
                  className="bg-white text-body-m text-black px-10 py-4"
                >
                  기대평 작성하기
                </button>
              </div>

              <button
                onClick={onClickShare}
                className="border-2 border-neutral-300 text-body-m text-white px-10 py-[14px]"
              >
                공유하기
              </button>
            </div>
          </>
        ) : (
          <button className="text-body-m text-black bg-white px-10 py-4">
            응모하기
          </button>
        )}
      </div>
    </div>
  );
}
