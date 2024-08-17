import {useState, useEffect} from "react";
import throttleRaf from "@common/throttleRaf.js";

const MAX_ANSWER = 800;

function AnswerText({distance})
{
	const [ratio, setRatio] = useState(1);
	useEffect( ()=>{
		function onResize(e) {
			setRatio(Math.hypot(window.innerWidth, window.innerHeight) / (2*MAX_ANSWER));
		}
		window.addEventListener("resize", onResize);
		return ()=>window.removeEventListener("resize", onResize);
	}, [] );

	return <>{Math.round(distance/ratio)}</>;
}

export default AnswerText;