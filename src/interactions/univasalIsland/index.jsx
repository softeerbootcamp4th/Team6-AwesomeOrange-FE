import { useImperativeHandle } from "react";
import InteractionDescription from "../InteractionDescription.jsx";
import Phone from "./Phone.jsx";
import useIslandDrag from "./useIslandDrag.js";

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

  const seatHullStyle = `absolute w-[1200px] h-[800px] 
		bottom-[min(calc(100%-800px),-140px)] 
		lg:bottom-[min(calc(100%-900px),-170px)] 
		xl:bottom-[min(calc(100%-1000px),-200px)] 
	flex justify-center items-end select-none`;

  const seatStyle = `w-[317.44px] h-[501.88px]
		lg:w-[385.46px] lg:h-[610.64px]
		xl:w-[453.48px] xl:h-[718.4px]`;

  const univasalIslandStaticStyle = `w-[158.2px] h-[546px]
		lg:w-[192.1px] lg:h-[663px]
		xl:w-[226px] xl:h-[780px]
		flex flex-col gap-2 cursor-pointer touch-none`;

  const snapAreaStyle = `absolute scale-50
		left-[21px] top-[40px] w-[54px] h-[97px]
		lg:left-[25px] lg:top-[49px] lg:w-[66px] lg:h-[118px]
		xl:left-[30px] xl:top-[56px] xl:w-[77px] xl:h-[140px]
	`;

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
          className={seatStyle}
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
          className={seatStyle}
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
