import { useState, useImperativeHandle } from "react";
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

	return <article className="bg-black w-full h-full overflow-hidden flex justify-center flex-col">
		<div className="w-full max-w-[1200px] px-20 flex flex-col gap-3.5 font-bold">
			<h3 className="text-neutral-400 text-title-l">불편함 없이, 더 빠르게</h3>
			<p className="text-white text-body-l">The new IONIQ 5의 배터리를 충전하는 데 얼마만큼의 시간이 걸릴까요?</p>
			<p className="text-neutral-200 text-body-s">다이얼을 돌려 충전에 필요한 시간을 확인해보세요!</p>
		</div>
		<img src={dialSvg} alt="다이얼" className="w-48 h-48"></img>
	</article>
}

export default FastChargeInteraction;