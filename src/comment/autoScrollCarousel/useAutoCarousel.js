import { useState, useEffect, useRef, useCallback } from "react";
import useMountDragEvent from "@/common/useMountDragEvent";

function useAutoCarousel(speed)
{
	const childRef = useRef(null);
	const [position, setPosition] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const timestamp = useRef(null);
	const dragging = useRef(false);
	const prevDragState = useRef({x:0, mouseX:0});

	useEffect( ()=>{
		if(isHovered) return;

		let progress = true;
		timestamp.current = performance.now();
		function animate(time)
		{
			if(childRef.current === null) return;

			const interval = performance.now() - timestamp.current;
			setPosition(position => {
				const newPos = position + speed * interval;
				return newPos % childRef.current.clientWidth;
			});
			timestamp.current = time;
			if(progress) requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);

		return ()=>{
			progress = false;
		}
	}, [isHovered] );

	const onDrag = useCallback(({x: mouseX})=>{
		if(!dragging.current) return;

		let newPos = prevDragState.current.x - mouseX + prevDragState.current.mouseX;
		newPos %= childRef.current.clientWidth;
		setPosition( newPos );
	}, []);

	const onDragEnd = useCallback((e)=>{
		if(!dragging.current) return;
		dragging.current = false;
		if(e.pointerType === "touch") setIsHovered(false);
	}, []);


	useMountDragEvent( onDrag, onDragEnd );

	return {
		position,
		ref: childRef,
		eventListener: {
			onMouseEnter(e) {
				setIsHovered(true);
			},
			onMouseLeave(e) {
				setIsHovered(false);
			},
			onPointerDown(e) {
				setIsHovered(true);
				dragging.current = true;
				prevDragState.current.x = position;
				prevDragState.current.mouseX = e.clientX;
			}
		}
	}
}

export default useAutoCarousel;