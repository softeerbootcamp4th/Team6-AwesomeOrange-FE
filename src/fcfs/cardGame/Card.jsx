import { useState } from "react";
import style from "./style.module.css"

function Card({index, offline, locked, fliped})
{
	const [isFlipped, setFlipped] = useState(fliped);
	const cardFaceBaseStyle = "absolute top-0 left-0 w-full h-full";

	function flip()
	{
		if(offline) return setFlipped(true);

		setFlipped(true);
	}

	return <button 
		className={`w-60 h-80 relative transition-all transition-200 ease-in-out-cubic ${style.card} ${isFlipped ? style.flipped : ""}`}
		onClick={flip}
		disabled={locked || fliped || isFlipped}
	>
		<div className={`${cardFaceBaseStyle} ${style.front}`}>앞면</div>
		<div className={`${cardFaceBaseStyle} ${style.back} ${fliped ? style.wrong : ""}`}>뒷면</div>
	</button>
}

export default Card;