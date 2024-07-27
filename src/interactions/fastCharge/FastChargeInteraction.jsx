import { useState, useImperativeHandle } from "react";
import orderIcon from "@/assets/property2.svg";
import dialSvg from "./timer.svg";
//import useDialDrag from "./useDialDrag.js";

function FastChargeInteraction({interacted, $ref})
{
	const [timer, setTimer] = useState(0);
	//const [dialRef, angle, resetAngle] = useDialDrag(0);

	function reset()
	{
		setTimer(0);
		//resetAngle();
	}
	useImperativeHandle($ref, ()=>({reset}), [setTimer]);

	return <article className="bg-black relative w-full h-full overflow-hidden flex items-center flex-col">
		<div className="w-full max-w-[1200px] px-10 lg:px-20 flex gap-2 items-start mt-16 lg:mt-[6.25rem] ">
			<img src={orderIcon} alt="2" />
			<div className="flex flex-col gap-3.5 font-bold">
				<h3 className="text-neutral-400 text-title-l">불편함 없이, 더 빠르게</h3>
				<p className="text-white text-body-l">The new IONIQ 5의 배터리를 충전하는 데 얼마만큼의 시간이 걸릴까요?</p>
				<p className="text-neutral-200 text-body-s">다이얼을 돌려 충전에 필요한 시간을 확인해보세요!</p>
			</div>
		</div>
		<div className="absolute top-[clamp(240px,40%,384px)] w-72 md:w-96 h-32 border-solid border-2 border-neutral-600 rounded-[30px]">
			<div></div>
		</div>
		<img src={dialSvg} alt="다이얼" className="absolute bottom-0 size-72 md:size-96 lg:size-[562px] translate-y-1/2"></img>
	</article>
}

export default FastChargeInteraction;