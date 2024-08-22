import { useEffect, useRef } from "react";
import { WIDTH, HEIGHT } from "./constants.js";
import { KVMap } from "@common/utils.js";

function usePuzzleKetMount()
{
	const refs = useRef(null);

	function getRefMap()
	{
		if(refs.current === null) refs.current = new KVMap();
		return refs.current;
	}

	useEffect( ()=>{
		function onKeyPress(e)
		{
			const map = getRefMap();

			if(!map.hasValue(document.activeElement)) return;

			const key = map.getWithValue(document.activeElement);
			const x = key % WIDTH;
			const y = Math.floor(key / WIDTH);
			if(e.code === "ArrowUp") {
				if(y -1 < 0) return;
				map.getWithKey( key - WIDTH ).focus();
			}
			if(e.code === "ArrowDown") {
				if(y + 1 >= HEIGHT) return;
				map.getWithKey( key + WIDTH ).focus();
			}
			if(e.code === "ArrowLeft") {
				if(x -1 < 0) return;
				map.getWithKey( key - 1 ).focus();
			}
			if(e.code === "ArrowRight") {
				if(x + 1 >= WIDTH) return;
				map.getWithKey( key + 1 ).focus();
			}
		}

		document.addEventListener("keydown", onKeyPress);
		return ()=>document.removeEventListener("keydown", onKeyPress);
	}, [] );

	return (i)=>(ref)=>{
		getRefMap().set(i, ref);
	}
}

export default usePuzzleKetMount;