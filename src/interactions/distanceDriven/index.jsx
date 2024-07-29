import InteractionDescription from "../InteractionDescription.jsx";

function DistanceDrivenInteraction()
{
	return <article className="relative w-full h-full overflow-hidden flex items-center flex-col">
		<InteractionDescription 
			order="1"
			title="걱정 없이, 더 멀리"
			description="The new IONIQ 5는 한 번의 충전으로 얼마나 멀리 주행할 수 있을까요?"
			directive="가운데 점을 드래그하여 최대 주행거리를 예측해보세요!"
		/>
		<div className="absolute top-1/2">
			<div className="rounded-full size-8 bg-blue-300 cursor-pointer"></div>
		</div>
		<p className="text-white absolute bottom-32 md:bottom-36 lg:bottom-[180px] text-title-s pointer-events-none">
			<span className="text-head-m md:text-head-l lg:text-[4.375rem] mr-1.5 lg:mr-2.5">
				{0}
			</span>
			km
		</p>
	</article>
}

export default DistanceDrivenInteraction;