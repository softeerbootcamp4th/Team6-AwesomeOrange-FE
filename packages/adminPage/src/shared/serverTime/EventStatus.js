import useServerTime from "./store.js";

export function useEventStatus(_startTime, _endTime) {
  const serverTime = useServerTime((store) => store.serverTime);
  const startTime = _startTime instanceof Date ? _startTime : new Date(_startTime);
  const endTime = _endTime instanceof Date ? _endTime : new Date(_endTime);

  if (startTime > serverTime) return "예정";
  if (endTime > serverTime) return "진행중";
  return "종료";
}

function EventStatus({ startTime: _startTime, endTime: _endTime }) {
  const status = useEventStatus(_startTime, _endTime);
  return status;
}

export default EventStatus;
