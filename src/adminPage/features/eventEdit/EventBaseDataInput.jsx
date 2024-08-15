import { Input, TextBox } from "@admin/components/SmallInput.jsx";
import DateTimeRangeInput from "./DateTimeRangeInput.jsx";

function EventBaseDataInput({state, dispatch, mode}) {
	const columnsStyle = "grid grid-cols-[6rem_1fr] items-center gap-2";
	const NAME_MAX_LENGTH = 40;

	return <>
		<label className={columnsStyle}>
			<span className="text-center">
				이벤트 명<sup className="text-red-500">*</sup>
			</span>
			<div className="w-[25rem] h-8 relative flex items-center">
				<Input className="w-full h-full" 
					text={state.name} setText={(value)=>dispatch({type:"set_name", value})} 
					required maxLength="40"
					pattern={"^[ㄱ-ㅎ가-힣A-Za-z0-9~!.,\\[\\]\\(\\):\\-_%*\\/+#$@'\"=\\s]*$"}
				/>
				<span className={`absolute right-3 text-detail-l ${state.name.length === NAME_MAX_LENGTH ? "text-red-500" : "text-neutral-600"}`}>
					{state.name.length}/{NAME_MAX_LENGTH}
				</span>
			</div>
		</label>
		<label className={columnsStyle}>
			<span className="text-center">이벤트 ID</span>
			<Input className="w-[25rem] h-8" defaultValue={state.eventId} disabled/>
		</label>
		<label className={columnsStyle}>
			<span className="text-center">이벤트 프레임<sup className="text-red-500">*</sup></span>
			<Input className="w-[25rem] h-8" 
				text={state.eventFrameId} setText={(value)=>dispatch({type:"set_event_frame", value})} 
				required disabled={mode === "edit"}
			/>
		</label>
		<label className={columnsStyle}>
			<span className="text-center">이벤트 기간<sup className="text-red-500">*</sup></span>
			<DateTimeRangeInput range={[state.startTime, state.endTime]} setRange={(range)=>{
				dispatch({type:"set_date_range", value: range});
			}} wrapperClass="flex gap-2 items-center flex-wrap" inputClass="w-48 h-8" required />
		</label>

	</>
}

export default EventBaseDataInput;