import { useImperativeHandle } from "react";
import InteractionDescription from "../InteractionDescription.jsx";
import AnswerText from "./AnswerText.jsx";
import usePointDrag from "./usePointDrag.js";

function DistanceDrivenInteraction({ interactCallback, $ref }) {
  const { x, y, reset, isDragging, onPointerDown } = usePointDrag();

  const circleStyle = {
    transform: `translate(${x}px, ${y}px)`,
  };

  function pulseAnimation(e) {
    e.currentTarget.animate(
      [
        { transform: "scale(1)", opacity: 0.5 },
        { transform: "scale(16)", opacity: 0 },
      ],
      {
        duration: 300,
        iteractions: 1,
        easing: "ease-out",
        pseudoElement: "::before",
      },
    );
  }

  useImperativeHandle($ref, () => ({ reset }), [reset]);

  return (
    <article className="relative w-full h-full overflow-hidden flex items-center flex-col">
      <InteractionDescription
        order="1"
        title="걱정 없이, 더 멀리"
        description="The new IONIQ 5는 한 번의 충전으로 얼마나 멀리 주행할 수 있을까요?"
        directive="가운데 점을 드래그하여 최대 주행거리를 예측해보세요!"
        shouldNotSelect={isDragging}
      />
      <div className="absolute top-1/2">
        <div
          className="rounded-full size-8 bg-blue-500 cursor-pointer touch-none before:size-8 before:rounded-full before:absolute before:left-0 before:top-0 before:z-10 before:bg-blue-500 before:opacity-50"
          onPointerDown={(e) => {
            onPointerDown(e);
            pulseAnimation(e);
            interactCallback?.();
          }}
          style={circleStyle}
        />
        <svg
          className="overflow-visible stroke-blue-500 absolute top-4 left-4 pointer-events-none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="0"
            x2={x}
            y2={y}
            strokeWidth="5"
            strokeLinecap="round"
          ></line>
        </svg>
      </div>
      <p className="text-white absolute bottom-32 md:bottom-36 lg:bottom-[180px] text-title-s pointer-events-none">
        <span className="text-head-m md:text-head-l lg:text-17.5 mr-1.5 lg:mr-2.5">
          <AnswerText distance={Math.hypot(x, y)} />
        </span>
        km
      </p>
    </article>
  );
}

export default DistanceDrivenInteraction;
