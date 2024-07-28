import { useImperativeHandle } from "react";
import orderIcon from "@/assets/property3.svg";

function UnivasalIslandInteraction() {
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
		</article>
	)
}

export default UnivasalIslandInteraction;