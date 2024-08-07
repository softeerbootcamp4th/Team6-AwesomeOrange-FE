import { useRef } from "react";
import useSectionInitialize from "@/scroll/useSectionInitialize";
import useSwiperState from "@/common/useSwiperState";
import IntroductionDetail from "./IntroductionDetail";
import GiftDetail from "./GiftDetail";
import JSONData from "./content.json";
import TapBar from "./TapBar";
import InteractionSlide from "./InteractionSlide";

export default function InteractionPage() {
  const SECTION_IDX = 1;
  const sectionRef = useRef(null);
  const [currentInteraction, swiperRef] = useSwiperState();
  useSectionInitialize(SECTION_IDX, sectionRef);

  const joinedList = [1, 0, 0, 1, -1];

  return (
    <section
      ref={sectionRef}
      className="bg-black py-60 flex flex-col items-center"
    >
      <TapBar
        currentInteraction={currentInteraction}
        joinedList={joinedList}
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
        {JSONData.interaction.map((interactionDesc, index) => (
          <swiper-slide key={index} class="w-[566px] h-[456px]">
            <InteractionSlide
              interactionDesc={interactionDesc}
              index={index}
              isCurrent={currentInteraction === index}
              joined={joinedList[index]}
            />
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
