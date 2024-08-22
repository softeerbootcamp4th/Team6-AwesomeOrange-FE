import { useContext } from "react";
import { EventEditContext, EventEditDispatchContext } from "../businessLogic/context.js";
import BatchTimeUpdater from "./BatchTimeUpdater.jsx";
import FcfsItemInput from "./FcfsItemInput.jsx";
import Button from "@common/components/Button.jsx";
import fcfsInputGridStyle from "./tableStyle.js";

function FcfsInput() {
  const { fcfs, startTime, endTime } = useContext(EventEditContext);
  const dispatch = useContext(EventEditDispatchContext);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <BatchTimeUpdater />
      <div className="w-full max-w-[800px] flex flex-col gap-2">
        <div className={`${fcfsInputGridStyle} h-10 text-body-m font-bold justify-items-center`}>
          <div>날짜</div>
          <div>오픈시간</div>
          <div>종료시간</div>
          <div>당첨자 수</div>
          <div>경품</div>
          <div>삭제</div>
        </div>
        {[...fcfs].map((value) => (
          <FcfsItemInput key={value.uniqueKey} {...value} />
        ))}
        <Button
          className="mt-4"
          onClick={() => dispatch({ type: "add_fcfs_item" })}
          disabled={startTime === null || endTime === null}
        >
          + 추가
        </Button>
      </div>
    </div>
  );
}

export default FcfsInput;
