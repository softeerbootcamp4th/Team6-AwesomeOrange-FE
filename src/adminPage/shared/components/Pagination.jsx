import { clamp } from "@common/utils.js";

function getPaginationItem(currentPage, maxPage, length)
{
	let prevDelta = length % 2 === 1 ? (length - 1) / 2 : length / 2 - 1;
	let postDelta = length % 2 === 1 ? (length - 1) / 2 : length / 2;

	if(currentPage - prevDelta <= 0) return Array.from({length}, (_, i)=>i+1);
	if(currentPage + postDelta > maxPage) return Array.from({length}, (_, i)=>maxPage - length + i + 1);
	return Array.from({length}, (_, i)=>currentPage - prevDelta + i);
}

function Pagination({currentPage, setPage: _setPage, maxPage, length=5})
{
	const setPage = (index)=>()=>_setPage(clamp(index, 1, maxPage));

	return <div>
		<button onClick={setPage(currentPage - 5)} type="button"> 뒤로 5칸더가기 </button>
		<button onClick={setPage(currentPage - 1)} type="button"> 뒤로 1칸더가기 </button>
		{
			getPaginationItem(currentPage, maxPage, length).map( (i)=><button key={i} onClick={setPage(i)} type="button">{i}</button> )
		}
		<button onClick={setPage(currentPage + 1)} type="button"> 앞으로 1칸더가기 </button>
		<button onClick={setPage(currentPage + 5)} type="button"> 앞으로 5칸더가기 </button>
	</div>
}

export default Pagination;