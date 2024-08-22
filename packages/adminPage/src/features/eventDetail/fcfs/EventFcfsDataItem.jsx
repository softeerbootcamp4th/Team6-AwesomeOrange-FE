import { formatDate } from "@common/utils.js";

function EventFcfsDataItem({ id, startTime, endTime, participantCount, prizeInfo }) {
  return (
    <>
      <p className="text-center font-bold">{id}</p>
      <p className="text-center">{formatDate(startTime, "M/DD")}</p>
      <p className="text-center">
        {formatDate(startTime, "hh:mm")} ~ {formatDate(endTime, "hh:mm")}
      </p>
      <p className="text-center">{participantCount}명</p>
      <p>{prizeInfo}</p>
    </>
  );
}

export default EventFcfsDataItem;
