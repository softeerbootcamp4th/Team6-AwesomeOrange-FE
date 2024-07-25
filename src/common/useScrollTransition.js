import { useState, useEffect } from "react";
import throttleRaF from "./throttleRaf.js";

function clamp(target, min, max)
{
	if(target < min) return min;
	if(target > max) return max;
	return target;
}

/**
 * 스크롤 트랜지션을 더 쉽게 사용할 수 있게 하는 커스텀 훅입니다.
 * 
 * @param {number} start - 스크롤이 시작되는 위치입니다.
 * @param {number} end - 스크롤이 종료되는 위치입니다.
 * 
 * @return {number} 시작 위치와 종료 위치에 따른 현재 스크롤 위치의 진행 비율입니다.
 */
function useScrollTransition(start, end, transFunc)
{
	const [scroll, setScroll] = useState(0);

	useEffect( ()=>{
		const scrollRenew = throttleRaf( ()=>setScroll(window.scrollY) );
		document.addEventListener("scroll", scrollRenew);
		()=> {
			document.removeEventListener("scroll", scrollRenew);
		}
	}, [] );

	const ratio = clamp((scroll - start) / (end-start), 0, 1);
	return ratio;
}

export default useScrollTransition;