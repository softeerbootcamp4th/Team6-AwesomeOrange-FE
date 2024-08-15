import { Input, TextBox } from "@admin/components/SmallInput.jsx";
import DateTimeRangeInput from "./DateTimeRangeInput.jsx";

function EventBaseDataInput({state, dispatch}) {
	const columnsStyle = "grid grid-cols-[5rem_1fr] items-center gap-2";

	return <>
		<label className={columnsStyle}>
			<span className="text-center">
				이벤트 명<sup className="text-red-500">*</sup>
			</span>
			<Input className="w-[25rem] h-8" text={state.name} setText={(value)=>dispatch({type:"set_name", value})} required/>
		</label>
		<label className={columnsStyle}>
			<span className="text-center">이벤트 ID</span>
			<Input className="w-[25rem] h-8" defaultValue={state.eventId} disabled/>
		</label>
		<label className={columnsStyle}>
			<span className="text-center">이벤트 기간<sup className="text-red-500">*</sup></span>
			<DateTimeRangeInput range={[state.startTime, state.endTime]} setRange={(range)=>{
				dispatch({type:"set_date_range", value: range});
			}} wrapperClass="flex gap-2 items-center flex-wrap" inputClass="w-48 h-8" />
		</label>
	</>
}

export default EventBaseDataInput;