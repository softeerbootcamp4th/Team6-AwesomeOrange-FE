import { lazy, useContext, useRef, useState } from "react";

import InteractionAnswer from "./InteractionAnswer.jsx";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Suspense from "@common/components/Suspense.jsx";
import Button from "@common/components/Button.jsx";
import ResetButton from "@main/components/ResetButton.jsx";

import userStore from "@main/auth/store.js";

const lazyInteractionList = [
  lazy(() => import("../distanceDriven")),
  lazy(() => import("../fastCharge")),
  lazy(() => import("../univasalIsland")),
  lazy(() => import("../v2l")),
  lazy(() => import("../subsidy")),
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

  // backdrop-blur-[100px]을 적용시키면 느린 성능의 컴퓨터에서 인터랙션이 매우 느리게 동작함
  return (
    <div className="w-[calc(100%-2rem)] h-[calc(100%-2rem)] md:size-5/6 relative bg-[url('/images/interactionBackdrop.webp')] bg-cover bg-center bg-black/80 border border-neutral-600 rounded overflow-hidden">
      <button
        onClick={close}
        className="z-10 absolute top-5 right-5 xl:top-10 xl:right-10 bg-neutral-800 p-1 xl:p-3 rounded-full"
      >
        <img src="icons/close-white.svg" alt="닫기" />
      </button>

      <Suspense fallback={<div>Loading...</div>}>
        <InteractionComponent
          interactCallback={() => setIsActive(true)}
          $ref={interactionRef}
        />
      </Suspense>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        <Button
          onClick={joinEvent}
          styleType="filled"
          backdrop="dark"
          disabled={!isActive}
          className="px-4 py-2 xl:px-10 xl:py-4 text-black text-body-s"
        >
          확인하기
        </Button>
        <ResetButton onClick={() => interactionRef.current.reset()} />
      </div>

      <InteractionAnswer
        isAnswerUp={isAnswerUp}
        setIsAnswerUp={setIsAnswerUp}
        answer={answer}
        close={close}
        isLogin={isLogin}
      />
    </div>
  );
}
