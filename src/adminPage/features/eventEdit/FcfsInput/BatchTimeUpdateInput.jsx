import { useState } from "react";
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
	const checked = state[`${type}Check`];
	const timeStr = valueToTimeStr( state[type] );

	function onCheckboxClick(newValue)
	{
		dispatch({type: `toggle_${type}_time`, value: newValue});
	}
	function setTimeValue(newValue)
	{
		dispatch({type: `set_${type}_time`, value: timeStrToValue(newValue)});
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