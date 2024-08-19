function AnswerDescription({head, desc, subdesc})
{
	return <div className="w-2/3 xl:w-1/2 flex flex-col xl:flex-row gap-2 xl:gap-8">
		<span className="text-head-s xl:text-head-l text-blue-400 font-bold whitespace-pre">
			{head}
		</span>

		<div className="flex flex-col gap-4">
			<span className="text-body-l xl:text-title-s text-neutral-50 font-bold">
				{desc}
			</span>

			<span className="text-detail-l xl:text-body-s text-neutral-300 font-medium">
				{subdesc}
			</span>
		</div>
	</div>
}

export default AnswerDescription;