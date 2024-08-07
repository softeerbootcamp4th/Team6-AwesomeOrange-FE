export default function InteractionSlide({
  interactionDesc,
  index,
  isCurrent,
  joined,
}) {
  const activeImgPath = `active${index + 1}.png`;
  const inactiveImgPath = `inactive${index + 1}.png`;
  const numberImgPath = `icons/rect${index + 1}.svg`;

  function eventDate() {
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(2024, 8, 9);
    date.setDate(date.getDate() + index);
    return `${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}월 ${date.getDate() < 10 ? "0" : ""}${date.getDate()}일(${day[date.getDay()]})`;
  }

  function onClickJoin() {
    console.log("오픈");
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
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
        onClick={onClickJoin}
        disabled={!isCurrent || joined < 0}
        className={`mt-8 py-4 px-10 bg-white ${joined < 0 ? "hidden" : isCurrent ? "opacity-100" : "opacity-50"}`}
      >
        <span className="text-body-s text-black font-bold">
          안터랙션 체험하기
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
