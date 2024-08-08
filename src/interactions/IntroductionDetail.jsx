export default function IntroductionDetail({ contentList }) {
  return (
    <div className="flex flex-col">
      <span className="text-body-l pb-10 text-neutral-50 font-bold">
        상세 안내
      </span>

      <div className="flex gap-5">
        <div className="bg-neutral-900 p-6 flex flex-col font-bold">
          <span className="text-body-m text-neutral-300">이벤트 기간</span>

          <span className="pt-6 text-body-m text-blue-100">2024년</span>

          <span className="text-body-l text-blue-400">
            09월09일(월)~13일(금)
          </span>
        </div>

        <div className="bg-neutral-900 p-6 flex flex-col">
          <span className="text-body-m text-neutral-300 font-bold">
            당첨자 발표
          </span>

          <span className="pt-6 text-body-l text-white font-bold">
            2024년 9월 말
            <span className="font-normal text-neutral-300">{` (예정)`}</span>
          </span>

          <span className="pt-2 text-body-s text-neutral-300">
            * 추후 응모 시 입력한 연락처로 개별 안내
          </span>
        </div>
      </div>

      <div className="mt-5 p-6 bg-neutral-900 flex flex-col font-bold">
        <span className="pb-6 text-body-m text-neutral-300">참여방법</span>

        {contentList.map((contentSubList, index) => (
          <div key={index} className="mt-[9px]">
            <span className="bg-neutral-100 text-neutral-900 text-body-s px-2 py-0.5 rounded-[4px] mr-4">
              {index + 1}
            </span>

            {contentSubList.map((content, index) => (
              <span
                key={index}
                className={`${index % 2 ? "text-neutral-400" : "text-white"} text-body-m`}
              >
                {content}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
