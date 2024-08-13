import SearchBar from "./SearchBar.jsx";
import Button from "@common/components/Button.jsx";

import Checkbox from "@common/components/Checkbox.jsx";



function EventList()
{
	
	return <div className="w-full h-full flex flex-col gap-4">
		<div className="flex justify-end">
			<Button>+ 이벤트 등록</Button>
		</div>
		<SearchBar />
		<div className="grid grid-cols-2">
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
				<legend>레전</legend>
				<div>
					<label>
						<Checkbox name="event-type-fcfs" defaultChecked />
						선착순
					</label>
					<label>
						<Checkbox name="event-type-draw" defaultChecked />
						추첨
					</label>
				</div>
			</fieldset>
		</div>
	</div>
}

export default EventList;