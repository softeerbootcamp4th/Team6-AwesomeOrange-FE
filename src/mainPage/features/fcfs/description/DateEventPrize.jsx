import useFcfsStore from "@main/realtimeEvent/store.js";
import { OFFLINE } from "@main/realtimeEvent/constants.js";
import getEventDateState from "@main/realtimeEvent/getEventDateState.js";

function DateEventPrize({ date, title, capacity, image }) {
  const currentServerTime = useFcfsStore((store) => store.currentServerTime);
  const eventStatus = useFcfsStore((store) => store.eventStatus);
  const dateObj = new Date(date);
  const dateStatus =
    eventStatus === OFFLINE
      ? "default"
      : getEventDateState(currentServerTime, dateObj);

  const bgColor = dateStatus === "active" ? "bg-blue-100" : "bg-neutral-900";
  const opacity = dateStatus === "ended" ? "opacity-50" : "opacity-100";

  return (
    <div className={`flex gap-6 p-6 ${bgColor} ${opacity}`}>
      <img src={image} alt={title} width="130" height="88" />
      <div className="font-bold">
        <p
          className={`text-body-m ${dateStatus === "ended" ? "text-neutral-500" : "text-blue-400"}`}
        >
          {dateObj.getMonth() + 1}/{dateObj.getDate()}
        </p>
        <p
          className={`text-body-l ${dateStatus === "active" ? "text-black" : "text-white"}`}
        >
          {title}
        </p>
        <p className="text-body-l text-neutral-300">{capacity}명</p>
      </div>
    </div>
  );
}

export default DateEventPrize;
