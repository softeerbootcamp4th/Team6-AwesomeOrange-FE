import useFcfsStore from "../store.js";
import CardGameTitle from "./CardGameTitle.jsx";

function CardGame({offline})
{
	const eventStatus = useFcfsStore( store=>store.eventStatus );

	return <div>
		<div className="h-32 flex justify-center items-center">
			<CardGameTitle status={offline ? "unknown" : eventStatus} />
		</div>
	</div>
}

export default CardGame;