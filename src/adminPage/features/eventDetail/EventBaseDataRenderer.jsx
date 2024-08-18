import tableStyle from "./tableStyle.js";
import DrawButtonHolder from "./drawButton/DrawButtonHolder.jsx";
import Suspense from "@common/components/Suspense.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";
import { formatDate } from "@common/utils.js";

function EventBaseDataRenderer({
  name,
  eventId,
  eventFrameId,
  startTime,
  endTime,
  description,
  url,
  eventType,
}) {
  return (
    <div className={tableStyle}>
      <p className="text-center font-bold">이벤트 명</p>
      <p className="font-medium">{name}</p>
      <p className="text-center font-bold">이벤트 ID</p>
      <p className="font-medium">{eventId}</p>
      <p className="text-center font-bold">이벤트 프레임</p>
      <p>{eventFrameId}</p>
      <p className="text-center font-bold">이벤트 기간</p>
      <div>
        {formatDate(startTime, "YYYY-MM-DD hh:mm")} ~ {formatDate(endTime, "YYYY-MM-DD hh:mm")}
      </div>
      <p className="text-center font-bold self-start h-8 flex justify-center items-center">
        이벤트 요약
      </p>
      <div className="relative">{description}</div>
      <p className="text-center font-bold">이벤트 URL</p>
      <p>
        <a href={url} className="text-blue-800 hover:underline active:underline">
          {url}
        </a>
      </p>
      <p className="text-center font-bold">이벤트 종류</p>
      <div className="flex flex-wrap justify-between items-center">
        <p className="font-medium">{eventType === "fcfs" ? "선착순" : "추첨"}</p>
        {eventType === "draw" && (
          <ErrorBoundary fallback={"error"}>
            <Suspense fallback={"suspense"}>
              <DrawButtonHolder endTime={new Date(endTime)} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

export default EventBaseDataRenderer;
