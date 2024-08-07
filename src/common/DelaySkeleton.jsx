import { useState, useEffect } from "react";

function DelaySkeleton({children, delay = 200})
{
	const [long, setLong] = useState(false);
	useEffect( ()=>{
		const timeout = setTimeout( ()=>setLong(true), delay );
		return ()=>clearTimeout(timeout);
	}, [delay] );

	if(!long) return null;
	return children;
}

export default DelaySkeleton;