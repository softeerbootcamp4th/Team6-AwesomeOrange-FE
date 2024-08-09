import Suspense from "@/common/Suspense.jsx";
import { ModalCloseContext } from "@/modal/modal.jsx";
import { lazy, useContext, useRef, useState } from "react";
import InteractionAnswer from "./InteractionAnswer";
import userStore from "@/auth/store.js";

const lazyInteractionList = [
  lazy(() => import("./distanceDriven")),
  lazy(() => import("./fastCharge")),
  lazy(() => import("./univasalIsland")),
  lazy(() => import("./v2l")),
  lazy(() => import("./subsidy")),
];

export default function InteractionModal({ index, answer }) {
  const close = useContext(ModalCloseContext);
  const InteractionComponent = lazyInteractionList[index];
  const [isActive, setIsActive] = useState(false);
  const [isAnswerUp, setIsAnswerUp] = useState(false);
  const interactionRef = useRef(null);
  const isLogin = userStore((state) => state.isLogin);

  if (!InteractionComponent) return <></>;

  function joinEvent() {
    setIsAnswerUp(true);
    if (isLogin) {
      /*
       *  로그인 유저가 서버로 추첨이벤트 참여 api 전송하는 코드 미구현
       */
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-5/6 h-5/6 relative backdrop-blur-[100px] border border-neutral-600 rounded overflow-hidden">
        <button
          onClick={close}
          className="z-10 absolute top-5 right-5 xl:top-10 xl:right-10 bg-neutral-800 p-1 xl:p-3 rounded-full"
        >
          <img src="icons/close-white.svg" alt="닫기" />
        </button>

        <InteractionComponent
          interactCallback={() => setIsActive(true)}
          $ref={interactionRef}
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            onClick={joinEvent}
            disabled={!isActive}
            className={`${isActive ? "opacity-100" : "opacity-50"} bg-white px-4 py-2 xl:px-10 xl:py-4 text-black text-body-s`}
          >
            확인하기
          </button>

          <button
            onClick={() => interactionRef.current.reset()}
            className="border-2 border-neutral-100 p-1 xl:p-2"
          >
            <img src="icons/refresh.svg" alt="다시하기" />
          </button>
        </div>

        <InteractionAnswer
          isAnswerUp={isAnswerUp}
          setIsAnswerUp={setIsAnswerUp}
          answer={answer}
          close={close}
          isLogin={isLogin}
        />
      </div>
    </Suspense>
  );
}
