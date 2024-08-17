import { useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { eventEditReducer, setDefaultState } from "./businessLogic/reducer.js";
import { EventEditContext, EventEditDispatchContext, EventEditModeContext } from "./businessLogic/context.js";

import EventBaseDataInput from "./EventBaseDataInput.jsx";
import EventDetailInput from "./EventDetailInput.jsx";
import Button from "@common/components/Button.jsx";
import openModal from "@common/modal/openModal.js";
import AlertModal from "@admin/modals/AlertModal.jsx";

import { useMutation } from "@common/dataFetch/getQuery.js";
import { fetchServer, handleError } from "@common/dataFetch/fetchServer.js";

const submitErrorHandler = {
  400: "잘못된 입력으로 이벤트 등록에 실패했습니다.",
  401: "인증되지 않은 사용자입니다."
}

function EventEditor({ initialData = null } = {}) {
  const navigate = useNavigate();
  const mode = useContext(EventEditModeContext);
  const [state, dispatch] = useReducer(
    eventEditReducer,
    initialData,
    setDefaultState,
  );
  const submitMutate = useMutation( mode === "create" ? "admin-event-created" : `admin-event-detail@${state.eventId}`, 
    ()=>fetchServer(mode === "create" ? "/api/v1/admin/events" : "/api/v1/admin/events/edit", {
      method: "post",
      body: state
    }).catch(handleError(submitErrorHandler)),
    {
      onSuccess: ()=>{
        openModal( <AlertModal title="등록 완료" description={`이벤트가 성공적으로 ${mode === "create" ? "등록" : "수정"}되었습니다!`} /> );
        navigate("/events");
      },
      onError: (e)=>{
        openModal( <AlertModal title="등록 실패" description={e.message} /> );
      }
    }
  );

  const submitDisabled = (state.eventType === "fcfs" && state.fcfs.size === 0) || (state.eventType === "draw" && state.draw.policies.size === 0);

  function onSubmit(e) {
    e.preventDefault();
    if(submitDisabled) return;
    submitMutate();
  }

  return (
    <form className="flex flex-col gap-8 group relative" onSubmit={onSubmit}>
      <div className="flex w-full justify-between sticky top-4 bg-white z-20 after:w-full after:h-5 after:-top-4 after:-z-10 after:absolute after:bg-white">
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
              <span className="py-2 text-center font-bold">
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
