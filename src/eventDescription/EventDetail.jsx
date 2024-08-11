import makeHighlight from "./makeHighlight.jsx";

export default function EventDetail({
  durationYear,
  duration,
  announceDate,
  announceDateCaption,
  howto,
}) {
  return (
    <div className="flex flex-col flex-grow gap-10">
      <h4 className="text-body-l text-neutral-50 font-bold">
        상세 안내
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-[11fr 9fr] gap-5">
        <div className="bg-neutral-900 p-6 flex flex-col font-bold">
          <span className="text-body-m text-neutral-300">이벤트 기간</span>

          <span className="pt-6 text-body-m text-blue-100">{durationYear}</span>

          <span className="text-body-l text-blue-400">{duration}</span>
        </div>

        <div className="bg-neutral-900 p-6 flex flex-col">
          <span className="text-body-m text-neutral-300 font-bold">
            당첨자 발표
          </span>

          <span className="pt-6 text-body-l text-white font-bold">
            {makeHighlight(announceDate, "font-normal text-neutral-300")}
          </span>

          <span className="pt-2 text-body-s text-neutral-300">
            {announceDateCaption}
          </span>
        </div>
        <div className="md:col-span-2 p-6 bg-neutral-900 flex flex-col font-bold">
          <span className="pb-6 text-body-m text-neutral-300">참여방법</span>

          <ul className="flex flex-col gap-2">
            {howto.map((description, index) => (
              <li key={`howTo-${index}`} className="flex gap-2">
                <span className="size-6 flex justify-center items-center bg-neutral-100 text-neutral-900 text-body-s px-2 py-0.5 rounded flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-neutral-400 text-body-m">
                  {makeHighlight(description, "text-white")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
