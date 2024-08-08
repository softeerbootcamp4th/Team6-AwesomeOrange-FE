import Suspense from "@/common/Suspense.jsx";
import { ModalCloseContext } from "@/modal/modal.jsx";
import { lazy, useContext, useRef, useState } from "react";

export default function InteractionModal({ index }) {
  const lazyInteractionList = [
    lazy(() => import("./distanceDriven")),
    lazy(() => import("./fastCharge")),
    lazy(() => import("./univasalIsland")),
    lazy(() => import("./v2l")),
    lazy(() => import("./subsidy")),
  ];
  const close = useContext(ModalCloseContext);
  const InteractionComponent = lazyInteractionList[index];
  const [isActive, setIsActive] = useState(false);
  const interactionRef = useRef(null);

  if (!InteractionComponent) return <></>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-5/6 h-5/6 relative backdrop-blur-[100px] border border-neutral-600 rounded">
        <button
          onClick={close}
          className="z-10 absolute top-10 right-10 bg-neutral-800 p-3 rounded-full"
        >
          <img src="icons/close-white.svg" alt="닫기" />
        </button>

        <InteractionComponent
          interactCallback={() => setIsActive(true)}
          $ref={interactionRef}
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            disabled={!isActive}
            className={`${isActive ? "opacity-100" : "opacity-50"} bg-white px-10 py-4 text-black text-body-s`}
          >
            확인하기
          </button>

          <button
            onClick={() => interactionRef.current.reset()}
            className="border-2 border-neutral-100 p-2"
          >
            <img src="icons/refresh.svg" alt="다시하기" />
          </button>
        </div>
      </div>
    </Suspense>
  );
}
