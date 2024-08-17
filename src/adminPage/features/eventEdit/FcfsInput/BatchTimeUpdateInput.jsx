import { useState, useContext } from "react";
import { EventEditDispatchContext } from "../businessLogic/context.js";
import { fcfsBatchControlReducer, getBatchTimeConfig, getToggleBatchTimeConfig } from "./reducer.js";
import { Input } from "@admin/components/SmallInput.jsx";
import Checkbox from "@common/components/Checkbox.jsx";

import { padNumber } from "@common/utils.js";

const MINUTES = 60;

function valueToTimeStr(value)
{
	const m = value % MINUTES;
	const h = (value - m) / MINUTES;
	return `${padNumber(h)}:${padNumber(m)}`;
}

function timeStrToValue(str)
{
	let [h,m] = str.split(":").map( Number );
	return h*MINUTES+m;
}

function BatchTimeUpdateInput({caption, type, state, dispatch})
{
	const eventEditDispatch = useContext(EventEditDispatchContext);
	const checked = state[`${type}Check`];
	const timeStr = valueToTimeStr( state[type] );

	function onCheckboxClick(newValue)
	{
		const action = {type: `toggle_${type}_time`, value: newValue};
		const nextState = fcfsBatchControlReducer(state, action);
		dispatch({type: "apply", value: nextState});

		const config = getToggleBatchTimeConfig(nextState, type);
		eventEditDispatch({type: "modify_all_fcfs_item", value: config});
	}
	function setTimeValue(newValue)
	{
		const action = {type: `set_${type}_time`, value: timeStrToValue(newValue)};
		const nextState = fcfsBatchControlReducer(state, action);
		dispatch({type: "apply", value: nextState});
		eventEditDispatch({type: "modify_all_fcfs_item", value: getBatchTimeConfig(nextState, state)});
	}

	return <label className="w-48 flex flex-col gap-2">
		<div className="text-body-s flex justify-center items-center gap-2">
			<Checkbox checked={checked} onChange={onCheckboxClick}/>
			{caption}
		</div>
		<Input type="time" disabled={!checked} text={timeStr} setText={ setTimeValue } />
	</label>
}

export default BatchTimeUpdateInput;