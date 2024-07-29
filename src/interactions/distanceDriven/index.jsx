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
	</article>
}

export default DistanceDrivenInteraction;