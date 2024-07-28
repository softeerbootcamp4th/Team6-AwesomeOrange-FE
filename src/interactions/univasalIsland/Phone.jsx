function Phone({dynamicStyle, onPointerDown})
{
	const staticStyle = `absolute bg-white 
		left-[541px] top-[293px] w-[54px] h-[97px]
		lg:left-[528px] lg:top-[185px] lg:w-[66px] lg:h-[118px]
		xl:left-[516px] xl:top-[75px] xl:w-[77px] xl:h-[140px]
		touch-none
	`;

	return <div className={staticStyle} style={dynamicStyle} onPointerDown={onPointerDown}>
	</div>
}

export default Phone