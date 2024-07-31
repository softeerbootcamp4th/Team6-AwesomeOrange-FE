import { useImperativeHandle } from "react";
import InteractionDescription from "../InteractionDescription.jsx";
import Phone from "./Phone.jsx";
import useIslandDrag from "./useIslandDrag.js";
import style from "./style.module.css";

import seat from "./assets/seat.png";
import univasalIsland1x from "./assets/univasalIsland@1x.png";
import univasalIsland2x from "./assets/univasalIsland@2x.png";
import univasalIslandLeg from "./assets/univasalIsland2.png";

function UnivasalIslandInteraction({ interactCallback, $ref }) {
  const {
    islandEventListener,
    phoneEventListener,
    islandStyle,
    phoneStyle,
    reset,
    phoneSnapArea,
    phoneIsSnapping,
  } = useIslandDrag();

  useImperativeHandle($ref, () => ({ reset }), [reset]);

  const seatHullStyle = `absolute w-[1200px] h-[800px] ${style.hull} flex justify-center items-end select-none`;
  const univasalIslandStaticStyle = `${style.island} flex flex-col gap-2 cursor-pointer touch-none`;
  const snapAreaStyle = `absolute scale-50 ${style.snap}`;

  return (
    <article className="relative w-full h-full overflow-hidden flex items-center flex-col">
      <InteractionDescription
        order="3"
        title="나에게 맞게, 자유자재로"
        description="새로워진 The new IONIQ 5의 유니버설 아일랜드는 어떤 모습일까요?"
        directive="유니버설 아일랜드를 드래그하여 이동시키고 스마트폰을 충전해보세요!"
      />
      <div className={seatHullStyle}>
        <img
          className={style.seat}
          src={seat}
          alt="left seat"
          draggable="false"
        />
        <div
          className={univasalIslandStaticStyle}
          style={islandStyle}
          onPointerDown={(e) => {
            islandEventListener.onPointerDown(e);
            interactCallback?.();
          }}
        >
          <img
            src={univasalIsland1x}
            srcSet={`${univasalIsland1x} 1x, ${univasalIsland2x} 2x`}
            alt="univasal island"
            draggable="false"
          />
          <img
            src={univasalIslandLeg}
            alt="univasal island"
            draggable="false"
          />
          <div className={snapAreaStyle} ref={phoneSnapArea}></div>
        </div>
        <img
          className={style.seat}
          src={seat}
          alt="right seat"
          draggable="false"
        />
        <Phone
          isSnapped={phoneIsSnapping}
          dynamicStyle={phoneStyle}
          onPointerDown={(e) => {
            phoneEventListener.onPointerDown(e);
            interactCallback?.();
          }}
        />
      </div>
    </article>
  );
}

export default UnivasalIslandInteraction;
