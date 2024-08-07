export default function TarBar({
  currentInteraction,
  joinedList,
  swiperRef,
}) {
  return (
    <>
      <span className="py-5 text-body-l text-neutral-200 font-bold items-center border-b-[3px] border-b-neutral-400">
        EVENT 1
      </span>

      <span className="pt-9 text-head-m text-white font-bold">
        The 새로워진 IONIQ 5, 인터랙션으로 만나다
      </span>

      <span className="pt-4 text-title-s text-neutral-300 whitespace-pre-wrap text-center">
        {`The new IONIQ 5의 새로운 기능을 날마다 체험하고 이벤트에 응모하세요!\n추첨을 통해 IONIQ과 함께하는 제주 여행 패키지를 드립니다`}
      </span>

      <div className="py-12 flex gap-5 sm:gap-[60px]">
        {joinedList.map((joined, index) => (
          <div
            key={index}
            onClick={() => swiperRef.current.swiper.slideTo(index)}
            className="flex flex-col items-center select-none"
          >
            <img
              src="icons/check-mint.svg"
              alt="체크"
              className={`${joined > 0 ? "" : "invisible"}`}
            />

            <span
              className={`text-body-l font-bold transition ease-in-out duration-200 ${currentInteraction === index ? "text-neutral-100" : "text-neutral-500"}`}
            >
              Day{index + 1}
            </span>

            <span
              className={`text-body-m font-bold ${joined > 0 ? "text-green-400" : "text-neutral-700"}`}
            >
              {joined > 0 ? "참여 완료" : !joined ? "미참여" : ""}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
