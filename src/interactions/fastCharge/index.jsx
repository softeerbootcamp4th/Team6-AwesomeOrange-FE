import { useImperativeHandle } from "react";
import InteractionDescription from "../InteractionDescription.jsx";
import BatteryProgressBar from "./BatteryProgressBar.jsx";
import dialSvg from "./assets/timer.svg";
import useDialDrag from "./useDialDrag.js";

const MAX_MINUTE = 30;

function getProgress(angle) {
  const rawProgress = -angle / (Math.PI * 2);
  if (rawProgress < 0) return 0;
  if (rawProgress > 1) return 1;
  return rawProgress;
}

function FastChargeInteraction({ interactCallback, $ref }) {
  const {
    angle,
    style: dialStyle,
    ref: dialRef,
    onPointerStart,
    resetAngle,
  } = useDialDrag(0);

  useImperativeHandle(
    $ref,
    () => ({
      reset() {
        resetAngle();
      },
    }),
    [resetAngle],
  );
  const progress = getProgress(angle);

  return (
    <article className="relative w-full h-full overflow-hidden flex items-center flex-col">
      <InteractionDescription 
        order="2"
        title="불편함 없이, 더 빠르게"
        description="The new IONIQ 5의 배터리를 충전하는 데 얼마만큼의 시간이 걸릴까요?"
        directive="다이얼을 돌려 충전에 필요한 시간을 확인해보세요!"
      />
      <div className="absolute top-[clamp(240px,40%,384px)] w-72 md:w-96 h-32 border-solid border-2 border-neutral-600 rounded-[30px] p-3.5">
        <div className="absolute w-5 h-9 bg-neutral-600 right-[-1.25rem] top-[2.875rem] rounded-r-md"></div>
        <BatteryProgressBar progress={progress} />
      </div>
      <div className="absolute bottom-0 size-72 md:size-[448px] lg:size-[562px] translate-y-[40%] md:translate-y-1/2 flex justify-center">
        <img
          src={dialSvg}
          alt="다이얼"
          className="w-full h-full absolute left-0 top-0 cursor-pointer touch-none"
          style={dialStyle}
          ref={dialRef}
          onPointerDown={(e) => {
            onPointerStart(e);
            interactCallback?.();
          }}
          draggable="false"
        />
        <p className="text-white absolute bottom-[calc(50%+48px)] md:bottom-[calc(50%+94px)] lg:bottom-[calc(50%+140px)] text-title-s pointer-events-none">
          <span className="text-head-m md:text-head-l lg:text-[4.375rem] mr-1.5 lg:mr-2.5">
            {Math.round(progress * MAX_MINUTE)}
          </span>
          분
        </p>
      </div>
    </article>
  );
}

export default FastChargeInteraction;
