import tableTemplateCol from "./tableStyle.js";
import EventStatus from "@admin/serverTime/EventStatus.js";
import Button from "@common/components/Button.jsx";
import Checkbox from "@common/components/Checkbox.jsx";
import { formatDate } from "@common/utils.js";

function SearchResultItem({eventId, name, startTime, endTime, eventType })
{
	return <div className={`${tableTemplateCol} h-8 text-body-s bg-white hover:bg-blue-100`}>
		<div className="flex justify-center items-center">
			<Checkbox />
		</div>
		<div className="flex justify-center items-center">{eventId}</div>
		<div className="flex justify-center items-center overflow-hidden">
			<span className="w-full text-ellipsis overflow-hidden whitespace-nowrap">{name}</span>
		</div>
		<div className="flex justify-center items-center">{formatDate(startTime, "YYYY-MM-DD hh:mm")}</div>
		<div className="flex justify-center items-center">{formatDate(endTime, "YYYY-MM-DD hh:mm")}</div>
		<div className="flex justify-center items-center">{eventType === "fcfs" ? "선착순" : eventType === "draw" ? "추첨" : "???"}</div>
		<div className="flex justify-center items-center"><EventStatus startTime={startTime} endTime={endTime} /></div>
		<div className="flex justify-center items-center">
			<Button styleType="ghost" className="px-2 py-1 text-body-s">상세보기</Button>
		</div>
	</div>
}

export default SearchResultItem;