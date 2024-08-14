import { clamp } from "@common/utils.js";

function getPaginationItem(currentPage, maxPage, length)
{
	let prevDelta = length % 2 === 1 ? (length - 1) / 2 : length / 2 - 1;
	let postDelta = length % 2 === 1 ? (length - 1) / 2 : length / 2;

	if(currentPage - prevDelta <= 0) return Array.from({length}, (_, i)=>i+1);
	if(currentPage + postDelta > maxPage) return Array.from({length}, (_, i)=>maxPage - length + i + 1);
	return Array.from({length}, (_, i)=>currentPage - prevDelta + i);
}
