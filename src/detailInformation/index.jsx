function DetailInformation()
{
	const slideClass = "w-full max-w-[1200px] bg-yellow-400";

	return <section className="w-full flex flex-col items-center">
		<swiper-container class="w-full max-w-[2000px] h-[32rem] lg:h-[50rem]" slides-per-view="auto" space-between="400" centered-slides="true">
			<swiper-slide class={slideClass}>Hi</swiper-slide>
			<swiper-slide class={slideClass}>I'm</swiper-slide>
			<swiper-slide class={slideClass}>Temmie</swiper-slide>
		</swiper-container>
	</section>
}

export default DetailInformation;