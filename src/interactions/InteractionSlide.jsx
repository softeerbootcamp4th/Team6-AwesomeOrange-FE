import openModal from "@/modal/openModal.js";
import InteractionModal from "./InteractionModal";

export default function InteractionSlide({
  interactionDesc,
  index,
  isCurrent,
  joined,
  swiperRef,
}) {
  const activeImgPath = `active${index + 1}.png`;
  const inactiveImgPath = `inactive${index + 1}.png`;
  const numberImgPath = `icons/rect${index + 1}.svg`;

  function eventDate() {
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    const fullDate = new Date(2024, 8, 9);
    fullDate.setDate(fullDate.getDate() + index);

    const month = fullDate.getMonth();
    const date = fullDate.getDate();

    return `${month < 9 ? "0" : ""}${month + 1}월 ${date < 10 ? "0" : ""}${date}일(${day[fullDate.getDay()]})`;
  }

  function onClickExperience() {
    if (joined < 0) return;

    openModal(<InteractionModal index={index}/>, "interaction");
  }

  return (
    <div
      onClick={() => swiperRef.current.swiper.slideTo(index)}
      className="w-full h-full flex flex-col items-center select-none"
    >
      <span className="pt-[150px] text-body-l text-white font-bold">
        {eventDate()}
      </span>

      <div className="pt-5 flex items-center">
        <img src={numberImgPath} />

        <span
          className={`${isCurrent ? "opacity-100" : "opacity-50"} pl-3 text-head-s text-white font-bold`}
        >
          {interactionDesc}
        </span>
      </div>

      <button
        onClick={onClickExperience}
        disabled={!isCurrent || joined < 0}
        className={`mt-8 py-4 px-10 bg-white ${joined < 0 ? "hidden" : isCurrent ? "opacity-100" : "opacity-50"}`}
      >
        <span className="text-body-s text-black font-bold">
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
        className={`-z-10 absolute transition ease-in-out duration-200 ${isCurrent ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
