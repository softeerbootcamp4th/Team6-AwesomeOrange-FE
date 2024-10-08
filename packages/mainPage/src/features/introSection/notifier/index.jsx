import FcfsNotifierCountdown from "./FcfsNotifierCountdown.jsx";
import scrollTo from "@main/scroll/scrollTo.js";
import { FCFS_SECTION } from "@main/scroll/constants.js";

import useEventStore from "@main/realtimeEvent/store.js";
import { PROGRESS, OFFLINE } from "@main/realtimeEvent/constants.js";

function FcfsNotifier({ visible }) {
  const eventStatus = useEventStore((store) => store.eventStatus);

  function onClick() {
    scrollTo(FCFS_SECTION);
  }

  if (eventStatus === OFFLINE) return null;

  return (
    <button
      onClick={onClick}
      className={`${visible ? "" : "translate-y-[200%]"} bottom-6 transition duration-150 ease-in-out fixed left-1/2 -translate-x-1/2 graphic-gradient rounded-full p-px shadow-[0_4px_12px_0px_rgba(0,0,0,0.25)] z-40 select-none`}
    >
      <div className="bg-black flex flex-wrap justify-center items-center gap-2.5 px-6 md:px-10 py-4 rounded-full text-body-m font-bold">
        {eventStatus === PROGRESS ? (
          <span className="text-transparent bg-clip-text graphic-gradient">
            현재 이벤트 진행중!
          </span>
        ) : (
          <FcfsNotifierCountdown />
        )}
      </div>
    </button>
  );
}

export default FcfsNotifier;
