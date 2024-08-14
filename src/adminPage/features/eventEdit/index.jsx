import Input from "@common/components/Input.jsx";

function EventEditor({defaultValue})
{
	return <div>
		<label>
			<span>이벤트 명<sup>*</sup></span>
			<Input />
		</label>
		<label>
			<span>이벤트 ID</span>
			<span>(대충 이벤트 id 들어감)</span>
		</label>
		<div>
			<span>이벤트 기간<sup>*</sup></span>

		</div>
	</div>
}

export default EventEditor;