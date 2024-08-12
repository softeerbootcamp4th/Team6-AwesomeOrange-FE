import { useRef } from "react";
import useSectionInitialize from "@/scroll/useSectionInitialize";
import useSwiperState from "@/common/useSwiperState";
import EventDescriptionLayout from "@/eventDescription/EventDescriptionLayout.jsx";
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

  const slideTo = (_index) => swiperRef.current.swiper.slideTo(_index);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-24 lg:py-60 flex flex-col items-center"
    >
      <TapBar
        currentInteraction={currentInteraction}
        joinedList={joinedList}
        slideTo={slideTo}
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
          <swiper-slide key={index} class="w-5/6 sm:w-[566px] h-[456px]">
            <InteractionSlide
              interactionDesc={interactionDesc}
              index={index}
              isCurrent={currentInteraction === index}
              joined={joinedList[index]}
              slideTo={slideTo}
              answer={JSONData.answer[index]}
            />
          </swiper-slide>
        ))}
      </swiper-container>
      <div className="w-full pt-[7.5rem] px-6 flex flex-col justify-center items-center">
        <EventDescriptionLayout detail={JSONData.detail}>
          <GiftDetail contentList={JSONData.gift} />
        </EventDescriptionLayout>
      </div>
    </section>
  );
}
