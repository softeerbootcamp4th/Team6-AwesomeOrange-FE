import useSwiperState from "@/common/useSwiperState.js";

const PAGE_COUNT = 3;

function DetailInformation()
{
	const [page, swiperElRef] = useSwiperState();
	const isLastPage = page === PAGE_COUNT-1;

	const slideClass = "w-full max-w-[1200px] bg-yellow-400";
	const navigationClass = "absolute top-[calc(50%-2.25rem)] size-[4.5rem] p-4 rounded-full bg-neutral-100 z-10 cursor-pointer";

	return <section className="w-full flex flex-col items-center">
		<div className="w-full max-w-[2000px] h-[32rem] lg:h-[50rem] relative">
			<swiper-container class="w-full h-full" 
				slides-per-view="auto" space-between="400" centered-slides="true"
				ref={swiperElRef} 
			>
				<swiper-slide class={slideClass}>Hi</swiper-slide>
				<swiper-slide class={slideClass}>I'm</swiper-slide>
				<swiper-slide class={slideClass}>Temmie</swiper-slide>
			</swiper-container>
			<div className={`${navigationClass} left-0 ${page === 0 ? "invisible" : ""}`} onClick={ ()=>{
				swiperElRef.current.swiper.slidePrev();
			} }>
				Left
			</div>
			<div className={`${navigationClass} right-0 ${isLastPage ? "invisible" : ""}`} onClick={ ()=>{
				swiperElRef.current.swiper.slideNext();
			} }>
				Right
			</div>
			<div className="absolute top-0 right-24 z-10 cursor-pointer">
				{page}
			</div>
		</div>
	</section>
}

export default DetailInformation;