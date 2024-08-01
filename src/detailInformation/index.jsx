import useSwiperState from "@/common/useSwiperState.js";
import DetailItem from "./DetailItem.jsx";
import content from "./content.json";
import left from "./assets/left.svg";
import right from "./assets/right.svg";

function DetailInformation()
{
	const [page, swiperElRef] = useSwiperState();
	const isLastPage = page === content.length-1;

	const slideClass = "w-[calc(100%-128px)] min-[1024px]:w-full max-w-[1200px] bg-yellow-400";
	const navigationClass = `invisible absolute [--size:3rem] md:[--size:4.5rem] top-[calc(50%-var(--size)*0.5)] size-[var(--size)] p-2 md:p-4 
	flex justify-center items-center rounded-full bg-neutral-100 z-10 cursor-pointer`;

	const breakpoints = JSON.stringify(
	{
		1024: {
			spaceBetween: 400
		}
	});

	return <section className="w-full flex flex-col items-center gap-10">
		<div className="w-full max-w-[1728px] h-[32rem] lg:h-[50rem] relative">
			<swiper-container class="w-full h-full" 
				slides-per-view="auto" centered-slides="true"
				space-between="20"
				breakpoints={breakpoints}
				ref={swiperElRef} 
			>
				{ content.map( (item)=><swiper-slide class={slideClass} key={item.title}>
					<DetailItem {...item} />
				</swiper-slide> ) }
			</swiper-container>
			<div className={`${navigationClass} left-6 ${page === 0 ? "" : "lg:visible"}`} onClick={ ()=>{
				swiperElRef.current.swiper.slidePrev();
			} }>
				<img src={left} alt="left" width="40" height="40" />
			</div>
			<div className={`${navigationClass} right-6 ${isLastPage ? "" : "lg:visible"}`} onClick={ ()=>{
				swiperElRef.current.swiper.slideNext();
			} }>
				<img src={right} alt="right" width="40" height="40" />
			</div>
		</div>
		<div className="w-full max-w-[1248px] px-16 lg:px-6 h-14 flex justify-end lg:justify-between align-center">
			<ul className="hidden lg:flex text-body-l gap-[3.75rem]">
				{ content.map( ({tabName}, i)=><li className={i === page ? "text-black" : "text-neutral-300"} key={tabName} onClick={ ()=>{
					swiperElRef.current.swiper.slideTo(i);
				} }>{tabName}</li> ) }
			</ul>
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