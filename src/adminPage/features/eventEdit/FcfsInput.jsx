import { useState } from "react";

import BatchTimeUpdateInput from "./BatchTimeUpdateInput.jsx";
import Button from "@common/components/Button.jsx";

const MINUTES = 60;

function FcfsInput({state, dispatch}) {
  const [batchStartTime, setBatchStartTime] = useState("00:00");
  const [batchEndTime, setBatchEndTime] = useState("23:55");
  function applyStartBatch(value)
  {
    setBatchStartTime(value);
    if(value === "") return;
    const [h,m] = value.split(":").map( Number );
    const time = h*MINUTES + m;
    dispatch({type: "modify_all_fcfs_item", value: {start: time}});
  }
  function applyEndBatch(value)
  {
    setBatchEndTime(value);
    if(value === "") return;
    const [h,m] = value.split(":").map( Number );
    const time = h*MINUTES + m;
    dispatch({type: "modify_all_fcfs_item", value: {end: time}});
  }
  function autoFill()
  {
    dispatch({type: "auto_fill_fcfs"});
  }

  return <div>
    <div>
      <BatchTimeUpdateInput caption="오픈시간 일괄 설정" value={batchStartTime} applyBatch={applyStartBatch} />
      <BatchTimeUpdateInput caption="종료시간 일괄 설정" value={batchEndTime} applyBatch={applyEndBatch} />
      <Button disabled={state.startTime === null || state.endTime === null} onClick={autoFill}>자동 채우기</Button>
    </div>
    <div>
      {
        [...state.fcfs].map( (value)=><div className="flex gap-4" key={value.key}>
          <div>{value.key}</div>
          <div>{value.start}</div>
          <div>{value.end}</div>
        </div> )
      }
    </div>
  </div>;
}

export default FcfsInput;
