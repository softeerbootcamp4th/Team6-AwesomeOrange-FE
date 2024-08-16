import { useReducer, useContext } from "react";
import { getDefaultState, fcfsBatchControlReducer, getBatchTimeConfig } from "./reducer.js";
import BatchTimeUpdateInput from "./BatchTimeUpdateInput.jsx";
import { EventEditContext, EventEditDispatchContext } from "../businessLogic/context.js";
import Button from "@common/components/Button.jsx";

function BatchTimeUpdater()
{
	const { startTime, endTime } = useContext(EventEditContext);
	const eventDispatch = useContext(EventEditDispatchContext);
	const [batchTimeState, batchTimeDispatch] = useReducer(fcfsBatchControlReducer, null, getDefaultState);

	function autoFill()
	{
		eventDispatch({type: "auto_fill_fcfs", config: getBatchTimeConfig(batchTimeState)});
	}

	return <div className="flex justify-center flex-wrap gap-8 gap-y-2">
		<BatchTimeUpdateInput caption="오픈시간 일괄 설정" type="start" state={batchTimeState} dispatch={batchTimeDispatch}/>
		<BatchTimeUpdateInput caption="종료시간 일괄 설정" type="end" state={batchTimeState} dispatch={batchTimeDispatch}/>
		<Button disabled={startTime === null || endTime === null} onClick={autoFill}>자동 채우기</Button>
	</div>
}

export default BatchTimeUpdater;