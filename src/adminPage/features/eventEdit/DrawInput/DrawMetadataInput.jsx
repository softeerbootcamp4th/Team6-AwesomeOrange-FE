import { useContext } from "react";
import {EventEditContext, EventEditDispatchContext} from "../businessLogic/context.js";
import DrawMetadataItemInput from "./DrawMetadataItemInput.jsx";

function DrawMetadataInput()
{
	const {draw: {metadata}} = useContext(EventEditContext);
	const dispatch = useContext(EventEditDispatchContext);

	return <div className="flex flex-col gap-4">
		<div className="flex justify-left items-center gap-2 h-10 text-body-l">
			<span className="font-bold">등수<sup className="text-red-500">*</sup> : </span>
			<select className="w-24 h-full text-body-l font-medium" 
				value={metadata.size} 
				onChange={(e)=>dispatch({type: "modify_draw_total_grade", value: +(e.target.value)})}>
				{
					Array.from({length: 10}, (_,i)=><option value={i+1} key={`select-grades-${i}`}>{i+1}</option>)
				}
			</select>
		</div>
		<div className="flex flex-col gap-2">
			<div className="grid grid-cols-[3rem_6rem_1fr] gap-4 font-bold items-center">
				<div className="text-center">등수</div>
				<div className="text-center">인원 수</div>
				<div className="text-center">경품</div>
			</div>
			<div className="grid grid-cols-[3rem_6rem_1fr] gap-4 gap-y-2 font-regular items-center">
				{[...metadata].map( (data)=><DrawMetadataItemInput key={data.grade} {...data} /> )}
			</div>
		</div>
	</div>
}

export default DrawMetadataInput;