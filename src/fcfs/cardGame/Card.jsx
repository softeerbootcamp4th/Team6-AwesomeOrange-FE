import { useState } from "react";
import style from "./style.module.css"
import correct1x from "./assets/correct@1x.png";
import correct2x from "./assets/correct@2x.png";
import failed1x from "./assets/failed@1x.png";
import failed2x from "./assets/failed@2x.png";
import hidden1x from "./assets/hidden@1x.png";
import hidden2x from "./assets/hidden@2x.png";

function Card({index, offline, locked, fliped, setGlobalLock})
{
	const [isFlipped, setFlipped] = useState(fliped);
	const [isCorrect, setIsCorrect] = useState(false);
	const cardFaceBaseStyle = "absolute top-0 left-0 w-full h-full";

	function flip()
	{
		setGlobalLock(true);
		if(offline) return setFlipped(true);

		setFlipped(true);
	}

	const answer1x = isCorrect ? correct1x : failed1x;
	const answer2x = isCorrect ? correct2x : failed2x;

	return <button 
		className={`w-60 h-80 relative transition-all duration-200 ease-in-out-cubic ${style.card} ${isFlipped ? style.flipped : ""}`}
		onClick={flip}
		onTransitionEnd={ ()=>setGlobalLock(false) }
		disabled={locked || fliped || isFlipped}
	>
		<div className={`${cardFaceBaseStyle}`}>
			<img src={hidden1x} srcSet={`${hidden1x} 1x, ${hidden2x} 2x`} alt="hidden" className="w-full h-full" draggable="false" />
		</div>
		<div className={`${cardFaceBaseStyle} ${style.back}`}>
			<img src={answer1x} srcSet={`${answer1x} 1x, ${answer2x} 2x`} 
			alt={isCorrect ? "축하합니다, 당첨입니다!" : "아쉽게도 정답이 아니네요!"} 
			className="w-full h-full" draggable="false"  />
		</div>
	</button>
}

export default Card;