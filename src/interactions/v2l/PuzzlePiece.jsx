import { useState } from "react";
import { LINEAR } from "./constants.js";

function PuzzlePiece({shape, onClick, fixRotate})
{
	const [fixing, setFixing] = useState(false);
	const style = {
		transform: `rotate( ${shape.rotate*90}deg)`
	};

	return <div style={style} className={
			`size-28 text-white rounded-xl border-2 border-white transition-transform ease-out ${fixing ? "duration-0" : "duration-500"}`
		}
		onClick={()=>{
			onClick();
			setFixing(false);
		}}
		onTransitionEnd={()=>{
			if(shape.rotate < 4) return;
			setFixing(true);
			fixRotate();
		}}
	>
		{shape.type === LINEAR ? "-" : "┌"}
	</div>
}

export default PuzzlePiece;