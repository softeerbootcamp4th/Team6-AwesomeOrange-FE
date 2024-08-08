import Suspense from "@/common/Suspense.jsx";
import ErrorBoundary from "@/common/ErrorBoundary.jsx";
import useFcfsStore from "./store.js";
import CountStarter from "./countdown/CountStarter.jsx";

function Consumer()
{
	const getData = useFcfsStore( store=>store.getData );
	const countdown = useFcfsStore( store=>store.countdown );
	const eventStatus = useFcfsStore( store=>store.eventStatus );

	getData();

	return <div>
		<p>{countdown}</p>
		<p>{eventStatus}</p>
	</div>
}

function Test()
{
	return <ErrorBoundary fallback={"error"}>
		<Suspense fallback={"suspense"}>
			<Consumer />
		</Suspense>
	</ErrorBoundary>
}


function FcfsSection()
{
	return <>
		<Test />
		<CountStarter />
	</>
}

export default FcfsSection;