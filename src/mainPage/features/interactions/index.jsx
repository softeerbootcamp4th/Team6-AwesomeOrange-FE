import { useEffect, useRef, useState } from "react";
import TapBar from "./description/TapBar.jsx";
import InteractionSlide from "./description/InteractionSlide.jsx";
import GiftDetail from "./description/GiftDetail.jsx";
import JSONData from "./content.json";

import EventDescriptionLayout from "@main/eventDescription/EventDescriptionLayout.jsx";
import useSectionInitialize from "@main/scroll/useSectionInitialize.js";
import { INTERACTION_SECTION } from "@main/scroll/constants.js";
import useSwiperState from "@main/hooks/useSwiperState.js";
import useEventStore from "@main/realtimeEvent/store.js";

import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { EVENT_DRAW_ID } from "@common/constants.js";
import { getDayDifference } from "@common/utils.js";
import { EVENT_START_DATE } from "@common/constants.js";

export default function InteractionPage() {
  const sectionRef = useRef(null);
  const [currentInteraction, swiperRef] = useSwiperState();
  const currentServerTime = useEventStore((state) => state.currentServerTime);
  const [joinedList, setJoinedList] = useState([-1, -1, -1, -1, -1]);
  const slideTo = (_index) => swiperRef.current.swiper.slideTo(_index);
  useSectionInitialize(INTERACTION_SECTION, sectionRef);

  useEffect(() => {
    fetchServer(`/api/v1/event/draw/${EVENT_DRAW_ID}/participation`)
      .then(({ dates }) => {
        let newJoinedList = [0, 0, 0, 0, 0];
        dates.forEach((date) => {
          const day = getDayDifference(EVENT_START_DATE, new Date(date));
          newJoinedList[day] = 1;
        });
        for (let i = 0; i < newJoinedList.length; i++) {
          if (
            currentServerTime <
            EVENT_START_DATE.getTime() + i * 24 * 60 * 60 * 1000
          ) {
            newJoinedList[i] = -1;
          }
        }
        setJoinedList(newJoinedList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentServerTime]);

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
