function EventFcfsDataItem({data})
{
	return <><p>준비중</p><p>준비중</p><p>준비중</p><p>준비중</p></>
}

function EventFcfsDataRenderer({data})
{
	const gridStyle = "grid grid-cols-[3rem_1.5fr_4rem_1fr] gap-4 justify-center items-center text-body-m";
	return <section>
		<div className={`${gridStyle} h-10 font-bold`}>
			<div className="text-center">날짜</div>
			<div className="text-center">이벤트 시간</div>
			<div className="text-center">당첨자 수</div>
			<div className="text-center">경품</div>
		</div>
		<div className={`${gridStyle} h-8 font-medium`}>
			{data.map( (item)=><EventFcfsDataItem key={item.id} {...item} /> )}
		</div>
	</section>
}

export default EventFcfsDataRenderer;