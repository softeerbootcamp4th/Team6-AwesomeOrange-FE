import { useImperativeHandle } from "react";
import orderIcon from "@/assets/property3.svg";
import seat from "./assets/seat.svg";
import univasalIsland from "./assets/univasalIsland.svg";
import univasalIsland2 from "./assets/univasalIsland2.svg";

function UnivasalIslandInteraction() {

	const seatHullStyle = `absolute w-[1200px] h-[800px] 
		bottom-[min(calc(100%-800px),-140px)] 
		lg:bottom-[min(calc(100%-900px),-170px)] 
		xl:bottom-[min(calc(100%-1000px),-200px)] 
		-translate-x-24 md:translate-x-0
		scale-[70%] lg:scale-[85%] xl:scale-100 
	flex justify-center items-end origin-bottom`;

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
				<img className="w-[453.48px] h-[718.4px]" src={seat} alt="left seat" />
				<div className="w-[226px] h-[780px] flex flex-col gap-2">
					<img src={univasalIsland} alt="univasal island" />
					<img src={univasalIsland2} alt="univasal island" />
				</div>
				<img className="w-[453.48px] h-[718.4px]" src={seat} alt="right seat" />
			</div>
		</article>
	)
}

export default UnivasalIslandInteraction;