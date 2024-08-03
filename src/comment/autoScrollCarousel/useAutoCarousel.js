import { useState, useEffect, useRef } from "react";
import useMountDragEvent from "@/common/useMountDragEvent";

function useAutoCarousel(speed)
{
	const childRef = useRef(null);
	const [position, setPosition] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const timestamp = useRef(null);

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
			//if(progress) requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);

		return ()=>{
			progress = false;
		}
	}, [isHovered] );

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

			}
		}
	}
}

export default useAutoCarousel;