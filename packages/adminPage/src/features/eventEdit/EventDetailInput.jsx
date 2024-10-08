import { useContext } from "react";
import {
  EventEditContext,
  EventEditDispatchContext,
  EventEditModeContext,
} from "./businessLogic/context.js";

import FcfsInput from "./FcfsInput";
import DrawInput from "./DrawInput";

function EventTypeSelector({ selected, onClick, children }) {
  const selectorBaseStyle = `flex justify-center items-center px-8 py-2 rounded-t-lg text-body-m relative hover:bg-blue-50`;
  const selectedStyle = `text-blue-400 font-bold after:w-full after:h-1 after:absolute after:-bottom-px after:border-b-2 after:border-blue-400`;
  const unSelectedStyle = `text-neutral-800 hover:text-blue-400`;

  return (
    <button
      type="button"
      className={`${selectorBaseStyle} ${selected ? selectedStyle : unSelectedStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function EventDetailInput() {
  const { eventType } = useContext(EventEditContext);
  const dispatch = useContext(EventEditDispatchContext);
  const mode = useContext(EventEditModeContext);

  function selectEventType(type) {
    return () => {
      if (mode === "edit") return;
      dispatch({ type: "set_event_type", value: type });
    };
  }

  return (
    <div className="w-full">
      <div className="flex w-full border-b border-neutral-200 font-medium">
        <EventTypeSelector selected={eventType === "fcfs"} onClick={selectEventType("fcfs")}>
          선착순
        </EventTypeSelector>
        <EventTypeSelector selected={eventType === "draw"} onClick={selectEventType("draw")}>
          추첨
        </EventTypeSelector>
      </div>
      <div className="flex-grow flex justify-center items-center p-4">
        {eventType === "fcfs" && <FcfsInput />}
        {eventType === "draw" && <DrawInput />}
      </div>
    </div>
  );
}

export default EventDetailInput;
