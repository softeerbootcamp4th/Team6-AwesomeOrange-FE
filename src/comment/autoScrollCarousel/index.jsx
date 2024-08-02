

function AutoScrollCarousel({speed, gap=0, children})
{
	//const {position, ref} = useAutoCarousel(speed);

	const flexStyle = "flex [&>div]:flex-shrink-0 gap-[var(--gap,0)] absolute";
	return <div className="w-full h-full overflow-hidden">
		<div style={{"--gap": gap+"px"}} className="relative">
			<div className={`${flexStyle} -translate-x-full`}>{children}</div>
			<div className={flexStyle}>{children}</div>
			<div className={`${flexStyle} translate-x-full`}>{children}</div>
		</div>
	</div>
}

export default AutoScrollCarousel;