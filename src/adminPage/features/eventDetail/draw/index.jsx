import tableStyle from "../tableStyle.js";

function EventDrawDataRenderer({data})
{
	const metadataGridStyle = "grid grid-cols-[3rem_6rem_1fr] gap-4 justify-items-center";
	return <>
		<section className={tableStyle}>
			<p className="text-center font-bold h-8 self-start flex justify-center items-center">당첨 인원수</p>
			<div>
				<div className={`${metadataGridStyle} h-8 items-center font-bold`}>
					<p>등수</p>
					<p>인원 수</p>
					<p>경품</p>
				</div>
				<div className={`${metadataGridStyle} gap-y-2 font-regular`}>
					<p>1등</p>
					<p>0명</p>
					<p className="justify-self-start">디지털 미러</p>
				</div>
			</div>
			<p className="text-center font-bold">점수 정책</p>
			<div>준비중입니다.</div>
		</section>
	</>
}

export default EventDrawDataRenderer;