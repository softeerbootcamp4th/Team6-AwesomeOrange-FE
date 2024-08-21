import { useEffect, useRef } from "react";

const voidAssistive = ()=>"";

function getDir(keyCode)
{
	switch(keyCode) 
	{
		case "ArrowUp": return [0, -1];
		case "ArrowDown": return [0, 1];
		case "ArrowLeft": return [-1, 0];
		case "ArrowRight": return [1, 0];
		default: return [0, 0];
	}
}

function useA11yDrag({
	grabText = voidAssistive, 
	moveText = voidAssistive, 
	dropText = voidAssistive,
	onKeyMove, 
	setSubtitle,
	enabled = true
})
{
	const target = useRef(null);
	const grabbed = useRef(false);

	useEffect( ()=>{
		if(target.current === null || !enabled) return;

		function onKeyDown(e)
		{
			if(document.activeElement !== target.current) return;

			if(grabbed.current)
			{
				switch(e.code) 
				{
					case "Tab": {
						e.preventDefault();
						break;
					}
					case "Space": {
						grabbed.current = false;
						setSubtitle(()=>dropText);
						e.preventDefault();
						break;
					}
					case "ArrowUp": 
					case "ArrowDown":
					case "ArrowLeft":
					case "ArrowRight":{
						const [x, y] = getDir(e.code);
						onKeyMove(x, y);
						setSubtitle(()=>moveText);
						e.preventDefault();
						break;
					}
				}
			}
			else if(e.code === "Space")
			{
				grabbed.current = true;
				setSubtitle(()=>grabText);
				e.preventDefault();
			}
		}

		document.addEventListener("keydown", onKeyDown);
		return ()=>{
			document.removeEventListener("keydown", onKeyDown);
		}
	}, []);

	return target;
};

export default useA11yDrag;