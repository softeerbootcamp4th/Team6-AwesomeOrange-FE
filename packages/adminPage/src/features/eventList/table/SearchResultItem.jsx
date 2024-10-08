import { Link } from "react-router-dom";

import tableTemplateCol from "./tableStyle.js";
import { useEventStatus } from "@admin/serverTime/EventStatus.js";
import Button from "@common/components/Button.jsx";
import Checkbox from "@common/components/Checkbox.jsx";
import { formatDate } from "@common/utils.js";

function SearchResultItem({ eventId, name, startTime, endTime, eventType, checked, setCheck }) {
  const eventStatus = useEventStatus(startTime, endTime);

  return (
    <label className={`${tableTemplateCol} h-8 text-body-s bg-white hover:bg-blue-100`}>
      <div className="flex justify-center items-center">
        <Checkbox checked={checked} onChange={setCheck} disabled={eventStatus !== "예정"} />
      </div>
      <div className="flex justify-center items-center font-medium">{eventId}</div>
      <div className="flex justify-center items-center overflow-hidden">
        <Link className="w-full font-bold truncate hover:underline" to={`./${eventId}`}>
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
        {eventType === "fcfs" ? "선착순" : eventType === "draw" ? "추첨" : "???"}
      </div>
      <div className="flex justify-center items-center">{eventStatus}</div>
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
