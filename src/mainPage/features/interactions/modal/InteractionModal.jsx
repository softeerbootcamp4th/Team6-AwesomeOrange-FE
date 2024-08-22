import { lazy, useContext, useRef, useState } from "react";

import IntearctionContext from "./context.js";
import InteractionAnswer from "./InteractionAnswer.jsx";
import ShowAnswerButton from "./buttons/ShowAnswerButton.jsx";
import ResetButton from "@main/components/ResetButton.jsx";

import { ModalCloseContext } from "@common/modal/modal.jsx";
import Spinner from "@common/components/Spinner.jsx";
import Suspense from "@common/components/Suspense.jsx";

const lazyInteractionList = [
  lazy(() => import("../distanceDriven")),
  lazy(() => import("../fastCharge")),
  lazy(() => import("../univasalIsland")),
  lazy(() => import("../v2l")),
  lazy(() => import("../subsidy")),
];

export default function InteractionModal() {
  const close = useContext(ModalCloseContext);
  const index = useContext(IntearctionContext);
  const InteractionComponent = lazyInteractionList[index];
  const [isActive, setIsActive] = useState(false);
  const [isAnswerUp, setIsAnswerUp] = useState(false);
  const interactionRef = useRef(null);
  const closeButtonRef = useRef(null);

  if (!InteractionComponent) return;

  // backdrop-blur-[100px]을 적용시키면 느린 성능의 컴퓨터에서 인터랙션이 매우 느리게 동작함
  return (
    <div 
      className="w-[calc(100%-2rem)] h-[calc(100%-2rem)] md:size-5/6 relative bg-[url('/images/interactionBackdrop.webp')] bg-cover bg-center bg-black/80 border border-neutral-600 rounded overflow-hidden"
      aria-modal="true"
    >
      <button
        onClick={close}
        ref={closeButtonRef}
        className="z-10 absolute top-5 right-5 xl:top-10 xl:right-10 bg-neutral-800 p-1 xl:p-3 rounded-full select-none"
      >
        <img src="/icons/close-white.svg" alt="닫기" draggable="false" />
      </button>

      <Suspense fallback={<Spinner />}>
        <InteractionComponent interactCallback={() => setIsActive(true)} $ref={interactionRef} />
      </Suspense>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        <ShowAnswerButton disabled={!isActive || isAnswerUp} onClick={() => setIsAnswerUp(true)} />
        <ResetButton onClick={() => interactionRef.current.reset()} disabled={isAnswerUp} />
      </div>

      <InteractionAnswer
        isAnswerUp={isAnswerUp}
        goBack={() => {
          setIsAnswerUp(false);
          closeButtonRef.current.focus();
        }}
      />
    </div>
  );
}
