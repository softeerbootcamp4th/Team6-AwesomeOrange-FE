import { useState } from "react";
import useFcfsStore from "../store.js";
import * as Status from "../constants.js";
import CardGameTitle from "./CardGameTitle.jsx";
import Card from "./Card.jsx";

function getLocked(eventStatus, isParticipated, offline)
{
	if(offline) return false;
	if(isParticipated) return true;
	if(eventStatus === Status.PROGRESS || eventStatus === Status.OFFLINE) return false;
	return true;
}

function CardGame({offline})
{
	const [transLocked, setTransLocked] = useState(false);
	const eventStatus = useFcfsStore( store=>store.eventStatus );
	const isParticipated = useFcfsStore( store=>store.isParticipated );
	const isOffline = offline || (eventStatus === Status.OFFLINE);
	const isLocked = getLocked(eventStatus, isParticipated, offline);
	const cardProps = {
		offline: isOffline,
		locked: isLocked || transLocked,
		fliped: isParticipated,
		setGlobalLock: setTransLocked
	};

	return <>
		<div className="h-32 flex justify-center items-center">
			<CardGameTitle status={offline ? Status.OFFLINE : isParticipated ? Status.ALREADY : eventStatus} />
		</div>
		<div className="grid grid-cols-1 sm:grid-cols-2 min-[1140px]:grid-cols-4 gap-10">
			<Card index={1} {...cardProps} />
			<Card index={2} {...cardProps} />
			<Card index={3} {...cardProps} />
			<Card index={4} {...cardProps} />
		</div>
	</>
}

export default CardGame;