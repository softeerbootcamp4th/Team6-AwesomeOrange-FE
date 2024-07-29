import InteractionDescription from "../InteractionDescription.jsx";
import usePointDrag from "./usePointDrag.js";

function DistanceDrivenInteraction()
{
	const { x, y, reset, onPointerDown } = usePointDrag();

	const circleStyle = {
		transform : `translate(${x}px, ${y}px)`,
	};

	function pulseAnimation(e)
	{
		e.currentTarget.animate( [
			{transform: "scale(1)", opacity: 0.5},
			{transform: "scale(16)", opacity: 0}
		],
		{
			duration: 300,
			iteractions: 1,
			easing: "ease-out",
			pseudoElement: "::before"
		} );
	}

	return <article className="relative w-full h-full overflow-hidden flex items-center flex-col">
		<InteractionDescription 
			order="1"
			title="걱정 없이, 더 멀리"
			description="The new IONIQ 5는 한 번의 충전으로 얼마나 멀리 주행할 수 있을까요?"
			directive="가운데 점을 드래그하여 최대 주행거리를 예측해보세요!"
		/>
		<div className="absolute top-1/2">
			<div className="rounded-full size-8 bg-blue-500 cursor-pointer before:size-8 before:rounded-full before:absolute before:left-0 before:top-0 before:z-10 before:bg-blue-500 before:opacity-50"
				onPointerDown={(e)=>{
					onPointerDown(e);
					pulseAnimation(e);
				}}
				style={circleStyle}
			/>
			<svg className="overflow-visible stroke-blue-500 absolute top-4 left-4 pointer-events-none" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<line x1="0" y1="0" x2={x} y2={y} strokeWidth="4" strokeLinecap="round"></line>
			</svg>
		</div>
		<p className="text-white absolute bottom-32 md:bottom-36 lg:bottom-[180px] text-title-s pointer-events-none">
			<span className="text-head-m md:text-head-l lg:text-[4.375rem] mr-1.5 lg:mr-2.5">
				{Math.round(Math.hypot(x, y) / 3)}
			</span>
			km
		</p>
	</article>
}

export default DistanceDrivenInteraction;