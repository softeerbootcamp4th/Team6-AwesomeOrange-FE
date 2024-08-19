import { useRef } from "react";
import TapBar from "./description/TapBar.jsx";
import InteractionSlide from "./description/InteractionSlide.jsx";
import GiftDetail from "./description/GiftDetail.jsx";
import JSONData from "./content.json";

import EventDescriptionLayout from "@main/eventDescription/EventDescriptionLayout.jsx";
import useSectionInitialize from "@main/scroll/useSectionInitialize.js";
import { INTERACTION_SECTION } from "@main/scroll/constants.js";
import useSwiperState from "@main/hooks/useSwiperState.js";

import DrawEventFetcher from "@main/drawEvent/DrawEventFetcher.jsx";
import Suspense from "@common/components/Suspense.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";

export default function InteractionPage() {
  const sectionRef = useRef(null);
  const [currentInteraction, swiperRef] = useSwiperState();
  const slideTo = (_index) => swiperRef.current.swiper.slideTo(_index);

  useSectionInitialize(INTERACTION_SECTION, sectionRef);

  return (
    <>
      <section ref={sectionRef} className="bg-black py-24 lg:py-60 flex flex-col items-center">
        <TapBar currentInteraction={currentInteraction} slideTo={slideTo} />

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
                slideTo={slideTo}
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
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <DrawEventFetcher />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
