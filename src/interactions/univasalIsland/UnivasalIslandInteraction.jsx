import { useImperativeHandle } from "react";
import useIslandDrag from "./useIslandDrag.js";

import orderIcon from "@/assets/property3.svg";
import seat from "./assets/seat.png";
import univasalIsland1x from "./assets/univasalIsland@1x.png";
import univasalIsland2x from "./assets/univasalIsland@2x.png";
import univasalIslandLeg from "./assets/univasalIsland2.png";

function UnivasalIslandInteraction() {
	const { islandEventListener, phoneEventListener, islandStyle, phoneStyle, reset, phoneSnapArea } = useIslandDrag();

	const seatHullStyle = `absolute w-[1200px] h-[800px] 
		bottom-[min(calc(100%-800px),-140px)] 
		lg:bottom-[min(calc(100%-900px),-170px)] 
		xl:bottom-[min(calc(100%-1000px),-200px)] 
	flex justify-center items-end`;

	const seatStyle = `w-[317.44px] h-[501.88px]
		lg:w-[385.46px] lg:h-[610.64px]
		xl:w-[453.48px] xl:h-[718.4px]`;

	const univasalIslandStyle = `w-[158.2px] h-[546px]
		lg:w-[192.1px] lg:h-[663px]
		xl:w-[226px] xl:h-[780px]
		flex flex-col gap-2 cursor-pointer`;

	const snapAreaStyle = `absolute`;

	return (
		<article className="relative w-full h-full overflow-hidden flex items-center flex-col">
			<div className="w-full max-w-[1200px] px-10 lg:px-20 flex gap-2 items-start mt-16 lg:mt-[6.25rem] ">
				<img src={orderIcon} alt="3" />
				<div className="flex flex-col gap-3.5 font-bold">
					<h3 className="text-neutral-400 text-title-m md:text-title-l">
						나에게 맞게, 자유자재로
					</h3>
					<p className="text-white text-body-m md:text-body-l">
						새로워진 The new IONIQ 5의 유니버설 아일랜드는 어떤 모습일까요?
					</p>
					<p className="text-neutral-200 text-body-s">
						유니버설 아일랜드를 드래그하여 이동시키고 스마트폰을 충전해보세요!
					</p>
				</div>
			</div>
			<div className={seatHullStyle}>
				<img className={seatStyle} src={seat} alt="left seat" draggable="false" />
				<div className={univasalIslandStyle} draggable="true" style={islandStyle} {...islandEventListener}>
					<img src={univasalIsland1x} srcSet={`${univasalIsland1x} 1x, ${univasalIsland2x} 2x`} alt="univasal island" draggable="false"/>
					<img src={univasalIslandLeg} alt="univasal island" draggable="false" />
					<div className={snapAreaStyle} ref={phoneSnapArea}></div>
				</div>
				<img className={seatStyle} src={seat} alt="right seat" draggable="false" />
			</div>
		</article>
	)
}

export default UnivasalIslandInteraction;