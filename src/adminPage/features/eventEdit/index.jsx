import { useReducer, useContext } from "react";
import { eventEditReducer, setDefaultState } from "./businessLogic/reducer.js";
import { EventEditContext, EventEditDispatchContext, EventEditModeContext } from "./businessLogic/context.js";

import EventBaseDataInput from "./EventBaseDataInput.jsx";
import EventDetailInput from "./EventDetailInput.jsx";
import Button from "@common/components/Button.jsx";

function EventEditor({ initialData = null } = {}) {
  const mode = useContext(EventEditModeContext);
  const [state, dispatch] = useReducer(
    eventEditReducer,
    initialData,
    setDefaultState,
  );

  const submitDisabled = (state.eventType === "fcfs" && state.fcfs.size === 0);

  function onSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(state, null, 4));
  }

  return (
    <form className="flex flex-col gap-8 group" onSubmit={onSubmit}>
      <div className="flex w-full justify-between">
        <div>
          <h2 className="text-title-m font-bold">
            {mode === "edit" ? "이벤트 수정" : "이벤트 등록"}
          </h2>
          <p className="text-detail-l">
            <span className="text-red-500">*</span>는 필수 입력
          </p>
        </div>
        <div className="flex gap-4">
          <Button>임시저장 불러오기</Button>
          <Button>임시저장</Button>
          <Button type="submit" disabled={submitDisabled}>등록</Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <EventEditContext.Provider value={state}>
          <EventEditDispatchContext.Provider value={dispatch}>
            <EventBaseDataInput />
            <div className="grid grid-cols-[6rem_1fr] items-start gap-2">
              <span className="py-2 text-center">
                이벤트 종류<sup className="text-red-500">*</sup>
              </span>
              <EventDetailInput />
            </div>
          </EventEditDispatchContext.Provider>
        </EventEditContext.Provider>
      </div>
    </form>
  );
}

export default EventEditor;
