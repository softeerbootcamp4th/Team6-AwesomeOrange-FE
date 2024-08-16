import { useState } from "react";
import { Input } from "@admin/components/SmallInput.jsx";
import Checkbox from "@common/components/Checkbox.jsx";

function BatchTimeUpdateInput({caption, value, applyBatch})
{
	const [enabled, setEnabled] = useState(false);

	function onCheckboxClick(newValue)
	{
		setEnabled(newValue);
		if(newValue) applyBatch(value);
	}
	function setTimeValue(newValue)
	{
		if(!enabled) return;
		applyBatch(newValue);
	}

	return <label className="w-48 flex flex-col gap-2">
		<div className="text-body-s flex justify-center items-center gap-2">
			<Checkbox checked={enabled} onChange={onCheckboxClick}/>
			{caption}
		</div>
		<Input type="time" disabled={!enabled} text={value} setText={ setTimeValue } />
	</label>
}

export default BatchTimeUpdateInput;