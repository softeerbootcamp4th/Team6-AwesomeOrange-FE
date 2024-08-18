import { useRef, useCallback, useEffect } from "react";

function useScrollControl()
{
	const hullRef = useRef(null);
	const itemRef = useRef(null);
	const observerRef = useRef(null);
	function getMap()
	{
		if(itemRef.current === null) itemRef.current = new Map();
		return itemRef.current;
	}

	const mountMap = useCallback( (ref, key)=>{
		const map = getMap();
		if(ref) {
			map.set(key, ref);
			observerRef.current?.observe(ref);
		}
		else {
			const prevRef = map.get(key);
			observerRef.current?.unobserve(prevRef);
			map.delete(key);
		}
	}, [] );

	const scrollTo = useCallback( (key)=>{
		const map = getMap();
		if(!map.has(key)) return;
		map.get(key).scrollIntoView({ behavior: "smooth" });
	}, [] )

	useEffect( ()=>{
		observerRef.current = new IntersectionObserver( (entries)=>{
			console.log(entries);
		}, {root: hullRef.current ?? null, threshold: 0.01} );
		return ()=>{
			observerRef.current.disconnect();
		}
	}, [] );

	return {
		hullRef,
		mountMap,
		scrollTo,
	};
}

export default useScrollControl;