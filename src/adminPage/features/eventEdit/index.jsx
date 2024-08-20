import { useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { eventEditReducer, setDefaultState } from "./businessLogic/reducer.js";
import {
  EventEditContext,
  EventEditDispatchContext,
  EventEditModeContext,
} from "./businessLogic/context.js";

import EventBaseDataInput from "./EventBaseDataInput.jsx";
import EventDetailInput from "./EventDetailInput.jsx";
import TitleContainer from "@admin/components/TitleContainer.jsx";
import Button from "@common/components/Button.jsx";
import openModal from "@common/modal/openModal.js";
import AlertModal from "@admin/modals/AlertModal.jsx";
import ConfirmModal from "@admin/modals/ConfirmModal.jsx";

import { useMutation } from "@common/dataFetch/getQuery.js";
import { fetchServer, handleError } from "@common/dataFetch/fetchServer.js";

const submitErrorHandler = {
  400: "잘못된 입력으로 이벤트 등록에 실패했습니다.",
  401: "인증되지 않은 사용자입니다.",
};

const tempSubmitErrorHandler = {
  400: "잘못된 입력으로 임시저장에 실패했습니다.",
  401: "인증되지 않은 사용자입니다.",
};

const tempLoadErrorHandler = {
  401: "인증되지 않은 사용자입니다.",
  404: "임시저장된 데이터가 없습니다.",
};

function EventEditor({ initialData = null } = {}) {
  const navigate = useNavigate();
  const mode = useContext(EventEditModeContext);
  const [state, dispatch] = useReducer(eventEditReducer, initialData, setDefaultState);
  const submitMutate = useMutation(
    mode === "create" ? "event-detail-created" : `event-detail-${state.eventId}`,
    () =>
      fetchServer(mode === "create" ? "/api/v1/admin/events" : "/api/v1/admin/events/edit", {
        method: "post",
        body: state,
      }).catch(handleError(submitErrorHandler)),
    {
      onSuccess: () => {
        openModal(
          <AlertModal
            title={`${mode === "create" ? "등록" : "수정"} 완료`}
            description={`이벤트가 성공적으로 ${mode === "create" ? "등록" : "수정"}되었습니다!`}
          />,
        ).then( ()=>navigate(mode === "create" ? "/events" : `/events/${state.eventId}`) );
      },
      onError: (e) => {
        openModal(<AlertModal title="등록 실패" description={e.message} />);
      },
    },
  );

  const submitDisabled =
    (state.eventType === "fcfs" && state.fcfs.size === 0) ||
    (state.eventType === "draw" && state.draw.policies.size === 0);

  function onSubmit(e) {
    e.preventDefault();
    if (submitDisabled) return;
    submitMutate();
  }

  async function submitTempSave() {
    try {
      await fetchServer("/api/v1/admin/events/temp", {
        method: "post",
        body: state,
      }).catch(handleError(tempSubmitErrorHandler));
      openModal(<AlertModal title="완료" description="작성 중인 내용이 임시저장되었습니다." />);
    } catch (e) {
      openModal(<AlertModal title="저장 실패" description={e.message} />);
    }
  }

  async function applyTempSave() {
    try {
      const data = await fetchServer("/api/v1/admin/events/temp").catch(
        handleError(tempLoadErrorHandler),
      );
      if (
        data.eventId === state.eventId ||
        (state.eventId === undefined && !data.eventId.startsWith("HD"))
      ) {
        dispatch({ type: "apply_external_data", value: data });
      } else {
        openModal(
          <AlertModal
            title="불러오기 실패"
            description={
              <>
                임시저장된 데이터가 현재 작성 중인 데이터의 것이 아닙니다!
                <br />
                임시저장 ID : {data.eventId || "새로 생성될 이벤트"}
              </>
            }
          />,
        );
      }
    } catch (e) {
      openModal(<AlertModal title="불러오기 실패" description={e.message} />);
    }
  }

  const tempSaveConfirmModal = (
    <ConfirmModal
      title="임시저장"
      description="작성 중인 내용을 임시저장하시겠습니까?"
      onConfirm={submitTempSave}
    />
  );
  const tempLoadConfirmModal = (
    <ConfirmModal
      title="주의"
      description={
        <>
          임시저장된 내용을 불러오겠습니까?
          <br />
          작성 중인 내용은 대체됩니다.
        </>
      }
      onConfirm={applyTempSave}
    />
  );

  return (
    <form className="flex flex-col gap-8 group relative" onSubmit={onSubmit}>
      <TitleContainer>
        <div>
          <h2 className="text-title-m font-bold">
            {mode === "edit" ? "이벤트 수정" : "이벤트 등록"}
          </h2>
          <p className="text-detail-l">
            <span className="text-red-500">*</span>는 필수 입력
          </p>
        </div>
        <div className="flex gap-4">
          <Button styleType="ghost" onClick={() => openModal(tempLoadConfirmModal)}>
            임시저장 불러오기
          </Button>
          <Button styleType="ghost" onClick={() => openModal(tempSaveConfirmModal)}>
            임시저장
          </Button>
          <Button type="submit" disabled={submitDisabled}>
            등록
          </Button>
        </div>
      </TitleContainer>
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
