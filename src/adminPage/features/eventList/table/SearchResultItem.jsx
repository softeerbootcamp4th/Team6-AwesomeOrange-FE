import { Link } from "react-router-dom";

import tableTemplateCol from "./tableStyle.js";
import EventStatus from "@admin/serverTime/EventStatus.js";
import Button from "@common/components/Button.jsx";
import Checkbox from "@common/components/Checkbox.jsx";
import { formatDate } from "@common/utils.js";

function SearchResultItem({
  eventId,
  name,
  startTime,
  endTime,
  eventType,
  checked,
  setCheck,
}) {
  return (
    <label
      className={`${tableTemplateCol} h-8 text-body-s bg-white hover:bg-blue-100`}
    >
      <div className="flex justify-center items-center">
        <Checkbox checked={checked} onChange={setCheck} />
      </div>
      <div className="flex justify-center items-center">{eventId}</div>
      <div className="flex justify-center items-center overflow-hidden">
        <Link
          className="w-full font-bold text-ellipsis overflow-hidden whitespace-nowrap hover:underline"
          to={`./${eventId}`}
        >
          {name}
        </Link>
      </div>
      <div className="flex justify-center items-center">
        {formatDate(startTime, "YYYY-MM-DD hh:mm")}
      </div>
      <div className="flex justify-center items-center">
        {formatDate(endTime, "YYYY-MM-DD hh:mm")}
      </div>
      <div className="flex justify-center items-center">
        {eventType === "fcfs"
          ? "선착순"
          : eventType === "draw"
            ? "추첨"
            : "???"}
      </div>
      <div className="flex justify-center items-center">
        <EventStatus startTime={startTime} endTime={endTime} />
      </div>
      <div className="flex justify-center items-center">
        <Link to={`./${eventId}`}>
          <Button styleType="ghost" className="px-2 py-1 text-body-s">
            상세보기
          </Button>
        </Link>
      </div>
    </label>
  );
}

export default SearchResultItem;
