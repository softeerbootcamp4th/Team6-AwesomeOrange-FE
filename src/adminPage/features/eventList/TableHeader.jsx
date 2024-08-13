import tableTemplateCol from "./tableStyle.js";
import TableSorter from "./TableSorter.jsx";

const headerData = [
	{key:"eventId", name:"ID" },
	{key:"name", name:"이벤트 명" },
	{key:"startTime", name:"이벤트 오픈시간" },
	{key:"endTime", name:"이벤트 종료시간" },
	{key:"eventType", name:"종류" }
];

function TableHeader({state, dispatch})
{
	function changeSort(target)
	{
		return (value)=>dispatch({type: "set_sort", target, value});
	}

	return <div className={`${tableTemplateCol}`}>
		<div>선택</div>
		{headerData.map( ({key, name})=><TableSorter key={key} state={state[key]} setState={changeSort(key)} >{name}</TableSorter> )}
		<div>상태</div>
		<div>상세</div>
	</div>
}

export default TableHeader;