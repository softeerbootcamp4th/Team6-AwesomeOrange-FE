import Checkbox from "@common/components/Checkbox.jsx";

function Filter({state, dispatch})
{
	function changeFilter(target)
	{
		return (value)=>dispatch({type: "set_filter", target, value});
	}

	return <div className="grid grid-cols-2">
		<fieldset>
			<legend>상태</legend>
			<div>
				<label>
					<Checkbox name="event-state-scheduled" defaultChecked />
					예정
				</label>
				<label>
					<Checkbox name="event-state-ongoing" defaultChecked />
					진행
				</label>
				<label>
					<Checkbox name="event-state-pending-draw" defaultChecked />
					추첨대기
				</label>
				<label>
					<Checkbox name="event-state-ended" defaultChecked />
					종료
				</label>
				<label>
					<Checkbox name="event-state-temp" defaultChecked />
					임시저장
				</label>
			</div>
		</fieldset>
		<fieldset>
			<legend>레전드</legend>
			<div>
				<label>
					<Checkbox name="event-type-fcfs" checked={state.fcfs} onChange={changeFilter("fcfs")} />
					선착순
				</label>
				<label>
					<Checkbox name="event-type-draw" checked={state.draw} onChange={changeFilter("draw")} />
					추첨
				</label>
			</div>
		</fieldset>
	</div>
}

export default Filter;