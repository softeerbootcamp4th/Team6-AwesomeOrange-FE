const ONE_DAY = 24 * 60 * 60 * 1000;
export default function getEventDateState(currrentTimeDate, eventTimeDate) {
  const currentTime = currrentTimeDate.valueOf();
  const eventTime = eventTimeDate.valueOf();
  const eventEndTime = eventTimeDate.valueOf() + ONE_DAY;
  if (currentTime < eventTime) return "default";
  if (currentTime < eventEndTime) return "active";
  return "ended";
}
