import { useState } from "react";

function Card({index, offline, locked, fliped})
{
	const [isFlipped, setFlipped] = useState(fliped);

	function flip()
	{
		setFlipped(true);
	}

	return <button className={`w-60 h-80 bg-white`} onClick={flip}>
	</button>
}

export default Card;