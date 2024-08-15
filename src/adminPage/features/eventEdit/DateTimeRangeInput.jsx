import { useState } from "react";
import { Input } from "@admin/components/SmallInput.jsx";
import { formatDate } from "@common/utils.js";

function dateToSplittedState(date)
{
	if(date === null || date === "" || date === undefined) return ["", ""];
	return formatDate(date, "YYYY-MM-DD hh:mm").split(" ");
}

function applyDateInputToDateObj(inputValue, timeValue)
{
	if(inputValue === "") return null;
	const [y,m,d] = inputValue.split("-").map( Number );

	let date = timeValue === null ? new Date("1970.1.1 00:00") : new Date(timeValue);

	date.setFullYear(y);
	date.setMonth(m-1);
	date.setDate(d);
	return date;
}

function applyTimeInputToDateObj(inputValue, timeValue)
{
	if(inputValue === "") return null;
	const [h,m] = inputValue.split(":").map( Number );

	let date = timeValue === null ? new Date() : new Date(timeValue);

	date.setHours(h);
	date.setMinutes(m);
	return date;
}

function DateTimeRangeInput({range=[null, null], setRange, wrapperClass, inputClass}={})
{
	const [ startDate, startTime ] = dateToSplittedState(range[0]);
	const [ endDate, endTime ] = dateToSplittedState(range[1]);

	function setStartDate(value)
	{
		if(value === "") return setRange([null, range[1]]);
		let date = applyDateInputToDateObj(value, range[0]);
		if(range[1] === null || date <= range[1]) setRange([date, range[1]]);
		else setRange([range[1], range[1]]);
	}

	function setStartTime(value)
	{
		if(value === "") return setRange([null, range[1]]);
		let date = applyTimeInputToDateObj(value, range[0]);
		if(range[1] === null || date <= range[1]) setRange([date, range[1]]);
		else setRange([range[1], range[1]]);
	}

	function setEndDate(value)
	{
		if(value === "") return setRange([range[0], null]);
		let date = applyDateInputToDateObj(value, range[1]);
		if(range[0] === null || date >= range[0]) setRange([range[0], date]);
		else setRange([range[0], range[0]]);
	}

	function setEndTime(value)
	{
		if(value === "") return setRange([range[0], null]);
		let date = applyTimeInputToDateObj(value, range[1]);
		if(range[0] === null || date >= range[0]) setRange([range[0], date]);
		else setRange([range[0], range[0]]);
	}

	return (
	<div className={wrapperClass}>
		<div className="flex gap-4">
			<Input className={inputClass} text={startDate} setText={setStartDate} type="date" name="startDate" />
			<Input className={inputClass} text={startTime} setText={setStartTime} type="time" name="startTime" step="300"/>
		</div>
		~
		<div className="flex gap-4">
			<Input className={inputClass} text={endDate} setText={setEndDate} type="date" name="endDate" />
			<Input className={inputClass} text={endTime} setText={setEndTime} type="time" name="endTime" step="300"/>
		</div>
	</div>
	);
}

export default DateTimeRangeInput;