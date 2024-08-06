import { useRef, useState } from "react";
import useSectionInitialize from "../scroll/useSectionInitialize";
import IntroductionDetail from "./IntroductionDetail";
import GiftDetail from "./GiftDetail";
import JSONData from "./content.json";
import TabBar from "./TabBar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function InteractionPage() {
  const SECTION_IDX = 1;
  const sectionRef = useRef(null);
  const [currentInteraction, setCurrentInteraction] = useState(0);
  useSectionInitialize(SECTION_IDX, sectionRef);

  const isJoinedList = [1, 0, 0, 1, -1];

  return (
    <section
      ref={sectionRef}
      className="bg-black py-60 flex flex-col items-center"
    >
      <TabBar
        currentInteraction={currentInteraction}
        setCurrentInteraction={setCurrentInteraction}
        isJoinedList={isJoinedList}
      />

      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="w-full bg-white h-full"
      >
        <SwiperSlide className="w-1/3 h-[500px]">
          <div className="bg-red-400">1</div>
        </SwiperSlide>
        <SwiperSlide className="w-1/3 h-[500px]">
          <div className="bg-red-500">2</div>
        </SwiperSlide>
        <SwiperSlide className="w-1/3 h-[500px]">
          <div className="bg-red-400">3</div>
        </SwiperSlide>
      </Swiper>

      <div className="pt-32 flex flex-col xl:flex-row gap-[140px]">
        <IntroductionDetail contentList={JSONData.howto} />
        <GiftDetail contentList={JSONData.gift} />
      </div>
    </section>
  );
}
