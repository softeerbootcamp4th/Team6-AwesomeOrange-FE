import useSwiperState from "@/common/useSwiperState.js";
import left from "./assets/left.svg";
import right from "./assets/right.svg";

const PAGE_COUNT = 3;

function DetailInformation()
{
	const [page, swiperElRef] = useSwiperState();
	const isLastPage = page === PAGE_COUNT-1;

	const slideClass = "w-full max-w-[1200px] bg-yellow-400";
	const navigationClass = `absolute [--size:3rem] md:[--size:4.5rem] top-[calc(50%-var(--size)*0.5)] size-[var(--size)] p-2 md:p-4 
	flex justify-center items-center rounded-full bg-neutral-100 z-10 cursor-pointer`;

	return <section className="w-full flex flex-col items-center gap-10">
		<div className="w-full max-w-[1728px] h-[32rem] lg:h-[50rem] relative">
			<swiper-container class="w-full h-full" 
				slides-per-view="auto" space-between="400" centered-slides="true"
				ref={swiperElRef} 
			>
				<swiper-slide class={slideClass}>Hi</swiper-slide>
				<swiper-slide class={slideClass}>I'm</swiper-slide>
				<swiper-slide class={slideClass}>Temmie</swiper-slide>
			</swiper-container>
			<div className={`${navigationClass} left-6 ${page === 0 ? "invisible" : ""}`} onClick={ ()=>{
				swiperElRef.current.swiper.slidePrev();
			} }>
				<img src={left} alt="left" width="40" height="40" />
			</div>
			<div className={`${navigationClass} right-6 ${isLastPage ? "invisible" : ""}`} onClick={ ()=>{
				swiperElRef.current.swiper.slideNext();
			} }>
				<img src={right} alt="right" width="40" height="40" />
			</div>
		</div>
		<div className="w-full max-w-[1248px] px-6 h-14 flex justify-end lg:justify-between align-center">
			<div className="hidden lg:flex">
				<div>어쩌구</div>
				<div>저쩌구</div>
				<div>거쩌구</div>
			</div>
			<div className="flex justify-end flex-wrap gap-6 h-full">
				<a href="https://www.hyundai.com/kr/ko/e/vehicles/the-new-ioniq5/intro" target="_blank" className="text-body-s border-black border-2 bg-white text-black px-6 py-4">
					더뉴 아이오닉 5 더 알아보기
				</a>
				<a href="https://www.hyundai.com/kr/ko/e/vehicles/purchase-consult" target="_blank" className="text-body-s bg-black text-white px-6 py-4">
					구매 상담 신청
				</a>
			</div>
		</div>
	</section>
}

export default DetailInformation;