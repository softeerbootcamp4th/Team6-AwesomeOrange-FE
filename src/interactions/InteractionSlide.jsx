import openModal from "@/modal/openModal.js";
import InteractionModal from "./InteractionModal";
import {padNumber} from "@/common/utils.js";

function getEventDate(index) {
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  const fullDate = new Date(2024, 8, 9 + index);

  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  return `${padNumber(month)}월 ${padNumber(date)}일(${day[fullDate.getDay()]})`;
}

export default function InteractionSlide({
  interactionDesc,
  index,
  isCurrent,
  joined,
  slideTo,
  answer,
}) {
  const activeImgPath = `active${index + 1}.png`;
  const inactiveImgPath = `inactive${index + 1}.png`;
  const numberImgPath = `icons/rect${index + 1}.svg`;

  function onClickExperience() {
    if (joined < 0) return;

    openModal(
      <InteractionModal index={index} answer={answer} />,
      "interaction",
    );
  }

  return (
    <div
      onClick={() => slideTo(index)}
      className="w-full h-full flex flex-col justify-center items-center select-none"
    >
      <span className="sm:pt-10 text-body-m sm:text-body-l text-white font-bold">
        {getEventDate(index)}
      </span>

      <div className="pt-5 flex items-center">
        <img src={numberImgPath} />

        <span
          className={`${isCurrent ? "opacity-100" : "opacity-50"} pl-3 text-title-m sm:text-head-s text-white font-bold`}
        >
          {interactionDesc}
        </span>
      </div>

      <button
        onClick={onClickExperience}
        disabled={!isCurrent || joined < 0}
        className={`mt-8 py-1 sm:py-4 px-5 sm:px-10 bg-white ${joined < 0 ? "hidden" : isCurrent ? "opacity-100" : "opacity-50"}`}
      >
        <span className="text-detail-l sm:text-body-s text-black font-bold">
          인터랙션 체험하기
        </span>
      </button>

      <span
        className={`pt-5 text-title-m text-neutral-200 ${joined < 0 ? "" : "hidden"}`}
      >
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
