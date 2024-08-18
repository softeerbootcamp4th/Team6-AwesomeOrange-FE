import { formatDate } from "@common/utils.js";

function EventBaseDataRenderer( { name, eventId, eventFrameId, startTime, endTime, description, url } ) {
  const columnsStyle = "grid grid-cols-[6rem_1fr] items-center gap-2";

  return (
    <div className="grid grid-cols-[6rem_1fr] auto-rows-[minmax(2rem,auto)] items-center gap-2">
      <p className="text-center font-bold">
        이벤트 명
      </p>
      <p className="font-medium">{name}</p>
      <p className="text-center font-bold">이벤트 ID</p>
      <p className="font-medium">{eventId}</p>
      <p className="text-center font-bold">
        이벤트 프레임
      </p>
      <p>{eventFrameId}</p>
      <p className="text-center font-bold">
        이벤트 기간
      </p>
      <div>{formatDate(startTime, "YYYY-MM-DD hh:mm")} ~ {formatDate(endTime, "YYYY-MM-DD hh:mm")}</div>
      <p className="text-center font-bold self-start h-8 flex justify-center items-center">이벤트 요약</p>
      <div className="relative">
        {description}
      </div>
      <p className="text-center font-bold">이벤트 URL</p>
      <a href={url} className="text-blue-800 hover:underline active:underline">{url}</a>
    </div>
  );
}

export default EventBaseDataRenderer;
