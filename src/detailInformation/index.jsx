import DetailSwiper from "./DetailSwiper.jsx";
import content from "./content.json";

function DetailInformation()
{
	return <section className="w-full flex flex-col items-center py-24 lg:py-60 gap-16 lg:gap-40">
		<div className="flex flex-col gap-3 lg:gap-9 text-center font-bold items-center">
			<p className="text-body-m text-neutral-600 w-fit py-3 lg:py-5 border-b-[3px] border-blue-300">차량 상세 정보</p>
			<h2 className="text-head-s lg:text-head-m text-black">The new IONIQ 5<br/>전기차의 <span className="sketch-line">ICON</span>이 되다.</h2>
		</div>
		<DetailSwiper content={content}/>
	</section>
}

export default DetailInformation;