import { Fragment } from "react";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { useQuery } from "@common/dataFetch/getQuery.js";

function DrawResultModal({eventId})
{
	const drawResultData = useQuery(`event-detail-draw-result-${eventId}`, ()=>{
		return fetchServer(`/api/v1/admin/draw/${eventId}/winners`);
	});
	const maxGrade = drawResultData.at(-1).ranking;
	const tableStyle = "w-full grid grid-cols-[4rem_1fr_2fr] auto-rows-[minmax(2rem,auto)] gap-4 items-center justify-items-center";

	return <div className="w-full h-full flex flex-col justify-center items-center gap-4">
		<h2 className="text-title-m font-bold">당첨자</h2>
		<div className="flex flex-wrap gap-4">
			{Array.from( {length:maxGrade}, (_,i)=><button key={`grade-${i+1}`}>{i+1}등</button> )}
		</div>
		<div className="w-full flex-grow overflow-y-scroll">
			<div className={`${tableStyle} font-bold sticky pb-4 top-0 bg-white`}>
				<p>등수</p>
				<p>이름</p>
				<p>전화번호</p>
			</div>
			<div className={`${tableStyle} gap-y-2 font-regular`}>
				{ drawResultData.map( ({ranking, name, phoneNumber})=><Fragment key={`${ranking}-${name}-${phoneNumber}`}>
					<p className="font-medium">{ranking}등</p>
					<p>{name}</p>
					<p>{phoneNumber}</p>
				</Fragment> ) }
			</div>
		</div>
	</div>;
}

export default DrawResultModal;