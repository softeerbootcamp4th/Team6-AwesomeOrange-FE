import { useRef } from "react";
import useSectionInitialize from "@/scroll/useSectionInitialize";
import useSwiperState from "@/common/useSwiperState";
import IntroductionDetail from "./IntroductionDetail";
import GiftDetail from "./GiftDetail";
import JSONData from "./content.json";
import TabBar from "./TabBar";
import InteractionSlide from "./InteractionSlide";

export default function InteractionPage() {
  const SECTION_IDX = 1;
  const sectionRef = useRef(null);
  const [currentInteraction, swiperRef] = useSwiperState();
  useSectionInitialize(SECTION_IDX, sectionRef);

  const isJoinedList = [1, 0, 0, 1, -1];

  return (
    <section
      ref={sectionRef}
      className="bg-black py-60 flex flex-col items-center"
    >
      <TabBar
        currentInteraction={currentInteraction}
        isJoinedList={isJoinedList}
        swiperRef={swiperRef}
      />

      <swiper-container
        slides-per-view="auto"
        centered-slides="true"
        space-between="16"
        class="w-full"
        speed="200"
        ref={swiperRef}
      >
        {JSONData.interaction.map((interaction) => (
          <swiper-slide key={interaction} class="w-[566px] h-[456px] bg-white">
            <InteractionSlide interaction={interaction} />
          </swiper-slide>
        ))}
      </swiper-container>

      <div className="pt-32 flex flex-col xl:flex-row gap-[140px]">
        <IntroductionDetail contentList={JSONData.howto} />
        <GiftDetail contentList={JSONData.gift} />
      </div>
    </section>
  );
}
