function DrawMetadataInput()
{
	return <div className="flex flex-col">
		<div className="flex justify-left items-center gap-2 h-10 text-body-l">
			<span>인원 수 : </span>
			<select className="w-24 h-full text-body-l">
			{
				Array.from({length: 10}, (_,i)=><option value={i+1} key={`select-grades-${i}`}>{i+1}명</option>)
			}
			</select>
		</div>
		<div>
			<div className="grid grid-cols-[3rem_1fr_2fr] font-bold">
				<div className="text-center">등수</div>
				<div className="text-center">인원 수</div>
				<div className="text-center">경품</div>
			</div>
			<div className="grid grid-cols-[3rem_1fr_2fr] font-medium">
				<div className="text-center">1등</div>
				<div className="text-center">명</div>
				<div className="text-center">__</div>
			</div>
		</div>
	</div>
}

export default DrawMetadataInput;