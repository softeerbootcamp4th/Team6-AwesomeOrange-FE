import { useEffect, useRef } from "react";
import useFcfsStore from "../store.js";
import CountdownController from "./CountdownController";
import Suspense from "@/common/Suspense.jsx";
import ErrorBoundary from "@/common/ErrorBoundary.jsx";

function CountStarterDummy()
{
	const controller = useRef( new CountdownController(0, 0) );
	const getData = useFcfsStore( store=>store.getData );
	const currentServerTime = useFcfsStore ( store=>store.currentServerTime );
	const currentEventTime = useFcfsStore ( store=>store.currentEventTime );
	const handleCountdown = useFcfsStore ( store=>store.handleCountdown );

	getData();

	useEffect( ()=>{
		controller.current = new CountdownController(currentServerTime, currentEventTime);
		const counter = controller.current;
		counter.addEventListener("interval", handleCountdown);
		counter.start();

		return ()=> {
			counter.removeEventListener("interval", handleCountdown);
			counter.end();
		}
	}, [currentServerTime, currentEventTime, handleCountdown] );

	return null;
}

function CountStarter()
{
	return <ErrorBoundary>
		<Suspense>
			<CountStarterDummy />
		</Suspense>
	</ErrorBoundary>
}

export default CountStarter;