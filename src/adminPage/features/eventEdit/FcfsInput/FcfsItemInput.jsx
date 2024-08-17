import { useContext } from "react";
import { EventEditDispatchContext } from "../businessLogic/context.js";
import { Input } from "@admin/components/SmallInput.jsx";
import DateInput from "@admin/components/DateInput.jsx";
import { formatDate, padNumber } from "@common/utils.js";

const MINUTE = 60;

function minuteIntToString(min)
{
	const h = Math.floor(min / 60) % 24;
	const m = min % 60;
	return `${padNumber(h)}:${padNumber(m)}`;
}

function strToMinutes(str)
{
	const [h, m] = str.split(":").map(Number);
	return h*MINUTE + m;
}

function FcfsItemInput({uniqueKey, date, start, end, participantCount, prizeInfo})
{
	const dispatch = useContext(EventEditDispatchContext);
	const enableDateEdit = uniqueKey.startsWith("auto_made_");

	function modify(value)
	{
		dispatch({type: "modify_fcfs_item", key: uniqueKey, value});
	}

	return <div className="grid grid-cols-[1fr_2fr_2fr_60px_3fr] h-10 gap-4 justify-center items-center text-body-m">
		{
			enableDateEdit ? <div className="text-center">{formatDate(date, "M/DD")}</div> : 
			<DateInput date={date} setDate={ (date)=>dispatch({type: "modify_fcfs_item", key: uniqueKey, value: {date}}) } size="4"/>
		}
		<Input type="time" required text={minuteIntToString(start)} setText={value=>modify({start: strToMinutes(value)}) } step="300" size="12"/>
		<Input type="time" required text={minuteIntToString(end)} setText={value=>modify({end: strToMinutes(value)}) } step="300" size="12"/>
		<Input type="text" required text={participantCount} setText={value=>modify({participantCount: Number.isNaN(+value) ? 0 : +value}) } inputMode="numeric" pattern="[0-9]+" size="3" placeholder="인원"/>
		<Input type="text" text={prizeInfo} setText={value=>modify({prizeInfo: value}) } placeholder="경품 이름 입력" />
	</div>
}

export default FcfsItemInput;