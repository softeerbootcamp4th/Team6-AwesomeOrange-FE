import { useEffect, useRef, useState } from "react";
import TapBar from "./description/TapBar.jsx";
import InteractionSlide from "./description/InteractionSlide.jsx";
import GiftDetail from "./description/GiftDetail.jsx";

import EventDescriptionLayout from "@main/eventDescription/EventDescriptionLayout.jsx";
import useSectionInitialize from "@main/scroll/useSectionInitialize.js";
import { INTERACTION_SECTION } from "@main/scroll/constants.js";
import useSwiperState from "@main/hooks/useSwiperState.js";

import JSONData from "./content.json";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { EVENT_DRAW_ID } from "@common/constants.js";

export default function InteractionPage() {
  const sectionRef = useRef(null);
  const [currentInteraction, swiperRef] = useSwiperState();
  const [joinedList, setJoinedList] = useState([-1, -1, -1, -1, -1]);
  const slideTo = (_index) => swiperRef.current.swiper.slideTo(_index);
  useSectionInitialize(INTERACTION_SECTION, sectionRef);

  useEffect(() => {
    fetchServer(`/api/v1/draw/${EVENT_DRAW_ID}`)
      .then((res) => {
        console.log(res);
        /*
         * 사용자가 참여한 이벤트 날짜 문자열이 들어간 가변적 길이의 리스트를 서버로부터 받아올 예정. 그런데 그 문자열의 형식을 아직 모른다..
         */
        setJoinedList([0, 1, 1, 0, -1]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
