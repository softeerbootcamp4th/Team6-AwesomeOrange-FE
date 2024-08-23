import useEventStore from "@main/realtimeEvent/store.js";
import { convertSecondsToString } from "@common/utils.js";

function FcfsNotifierCountdown() {
  const countdown = useEventStore((store) => store.countdown);

  return (
    <>
      <span className="text-body-m text-white">선착순 이벤트까지</span>
      <span className="font-ds-digital text-transparent text-[1.25rem] bg-clip-text graphic-gradient">
        {convertSecondsToString(countdown)}
      </span>
    </>
  );
}

export default FcfsNotifierCountdown;
