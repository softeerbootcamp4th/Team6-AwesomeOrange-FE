import InteractionModal from "../modal/InteractionModal";
import openModal from "@common/modal/openModal.js";
import { padNumber } from "@common/utils.js";
import { EVENT_START_DATE, DAY_MILLISEC } from "@common/constants";
import useEventStore from "@main/realtimeEvent/store.js";

function getEventDateString(eventDate) {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const fullDate = new Date(eventDate);

  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  return `${padNumber(month)}월 ${padNumber(date)}일(${day[fullDate.getDay()]})`;
}

export default function InteractionSlide({ interactionDesc, index, isCurrent, slideTo, answer }) {
  const currentServerTime = useEventStore((state) => state.currentServerTime);
  const activeImgPath = `images/active${index + 1}.png`;
  const inactiveImgPath = `images/inactive${index + 1}.png`;
  const numberImgPath = `icons/rect${index + 1}.svg`;
  const eventDate = EVENT_START_DATE.getTime() + index * DAY_MILLISEC;
  const isOpened = true || currentServerTime >= eventDate;

  function onClickExperience() {
    openModal(<InteractionModal index={index} answer={answer} />, "interaction");
  }

  return (
    <div
      onClick={() => slideTo(index)}
      className="w-full h-full flex flex-col justify-center items-center select-none"
    >
      <span className="sm:pt-10 text-body-m sm:text-body-l text-white font-bold">
        {getEventDateString(eventDate)}
      </span>

      <div className="pt-5 flex items-center">
        <img src={numberImgPath} alt="" />

        <span
          className={`${isCurrent ? "opacity-100" : "opacity-50"} pl-3 text-title-m sm:text-head-s text-white font-bold`}
        >
          {interactionDesc}
        </span>
      </div>

      <button
        onClick={onClickExperience}
        disabled={!isCurrent}
        className={`mt-8 py-1 sm:py-4 px-5 sm:px-10 bg-white ${!isOpened ? "hidden" : isCurrent ? "opacity-100" : "opacity-50"}`}
      >
        <span className="text-detail-l sm:text-body-s text-black font-bold">인터랙션 체험하기</span>
      </button>

      <span className={`pt-5 text-title-m text-neutral-200 ${isOpened && "hidden"}`}>
        오픈 예정
      </span>

      <img
        src={inactiveImgPath}
        alt="inactiveImage"
        className={`-z-10 absolute transition ease-in-out duration-200 ${isCurrent ? "opacity-0" : "opacity-100"}`}
      />
      <img
        src={activeImgPath}
        alt="activeImage"
        className={`-z-10 absolute transition ease-in-out duration-200 ${isCurrent ? "opacity-100" : "opacity-30 sm:opacity-0"}`}
      />
    </div>
  );
}
