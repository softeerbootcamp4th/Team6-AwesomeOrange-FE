import { useReducer } from "react";
import { eventEditReducer, setDefaultState } from "./businessLogic/reducer.js";

import EventBaseDataInput from "./EventBaseDataInput.jsx";
import EventDetailInput from "./EventDetailInput.jsx";
import Button from "@common/components/Button.jsx";

function EventEditor({ mode, initialData = null } = {}) {
  const [state, dispatch] = useReducer(
    eventEditReducer,
    initialData,
    setDefaultState,
  );

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
          <Button type="submit">등록</Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <EventBaseDataInput state={state} dispatch={dispatch} mode={mode} />
        <div className="grid grid-cols-[6rem_1fr] items-start gap-2">
          <span className="py-2 text-center">
            이벤트 종류<sup className="text-red-500">*</sup>
          </span>
          <EventDetailInput state={state} dispatch={dispatch} mode={mode} />
        </div>
      </div>
    </form>
  );
}

export default EventEditor;
