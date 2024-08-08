import Suspense from "@/common/Suspense.jsx";
import { lazy } from "react";

export default function InteractionModal({index}) {
  const lazyInteractionList = [
    lazy(() => import("./distanceDriven")),
    lazy(() => import("./fastCharge")),
    lazy(() => import("./univasalIsland")),
    lazy(() => import("./v2l")),
    lazy(() => import("./subsidy")),
  ];

  const InteractionComponent = lazyInteractionList[index];
  if (!InteractionComponent) return <></>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-5/6 h-5/6 backdrop-blur-[100px] border border-neutral-600 rounded">
        <InteractionComponent />
      </div>
    </Suspense>
  );
}
