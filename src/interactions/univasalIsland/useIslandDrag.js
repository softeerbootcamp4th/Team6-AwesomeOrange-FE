import { useState, useRef, useMemo, useCallback } from "react";
import throttleRaf from "@/common/throttleRaf.js";
import { clamp } from "@/common/utils.js";

const PHONE_INITIAL_X = 150;
const PHONE_INITIAL_Y = 100;

const voidImage = new Image();
voidImage.src =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC";

function useIslandDrag()
{
	// island state
	const islandIsDrag = useRef(false);
	const islandStartMouseYPosition = useRef(0);
	const islandStartPosition = useRef(0);
	const [islandY, setIslandY] = useState(0);

	// phone state
	const [phoneIsDrag, setPhoneIsDrag] = useState(false);
	const phoneStartMousePosition = useRef({x:0, y:0});
	const phoneStartPosition = useRef({x:PHONE_INITIAL_X, y:PHONE_INITIAL_Y});
	const [phoneIsSnapping, setPhoneIsSnapping] = useState(false);
	const [phoneX, setPhoneX] = useState(PHONE_INITIAL_X);
	const [phoneY, setPhoneY] = useState(PHONE_INITIAL_Y);

	// phone snap area
	const phoneSnapArea = useRef(null);

	const islandEventListener = (()=>{
		function onDragStart(e) {
			islandIsDrag.current = true;
			islandStartMouseYPosition.current = e.clientY;
			islandStartPosition.current = islandY;
			e.dataTransfer.setDragImage(voidImage, 0, 0);
		}
		function onDrag(e) {
			if(!islandIsDrag.current) return;

			const rawY = e.clientY - islandStartMouseYPosition.current + islandStartPosition.current;
			const y = clamp(rawY, -50, 50);

			setIslandY(y);

			if(phoneIsSnapping) {
				setPhoneX(0);
				setPhoneY(y);
			}
		}
		function onDragEnd(e) {
			islandIsDrag.current = false;
		}

		return {
			onDragStart,
			onDrag: throttleRaf(onDrag),
			onDragEnd,
		}
	})();

	const phoneEventListener = (()=>{
		function onDragStart(e) {
			setPhoneIsDrag(true);
			phoneStartMousePosition.current = { x: e.clientX, y: e.clientY };
			phoneStartPosition.current = { x: phoneX, y:phoneY };
			e.dataTransfer.setDragImage(voidImage, 0, 0);
		}
		function onDrag(e) {
			if(!phoneIsDrag) return;

			const x = e.clientX - phoneStartMousePosition.current.x + phoneStartPosition.current.x;
			const y = e.clientY - phoneStartMousePosition.current.y + phoneStartPosition.current.y;

			setPhoneX(x);
			setPhoneY(y);
		}
		function onDragEnd(e) {
			setPhoneIsDrag(false);

		}

		return {
			onDragStart,
			onDrag: throttleRaf(onDrag),
			onDragEnd,
		}
	})();


	const reset = useCallback( ()=>{
		islandIsDrag.current = false;
		islandStartMouseYPosition.current = 0;
		phoneStartMousePosition.current = {x: 0, y: 0};
		islandStartPosition.current = 0;
		phoneStartPosition.current = {x: PHONE_INITIAL_X, y: PHONE_INITIAL_Y};
		setIslandY(0);
		setPhoneIsDrag(false);
		setPhoneIsSnapping(false);
		setPhoneX(PHONE_INITIAL_X);
		setPhoneY(PHONE_INITIAL_Y);
	}, [] );

	const islandStyle = useMemo( ()=>({
		transform: `translateY(${islandY}px)`
	}), [islandY] );

	// phone style은 상당히 많은 state 종속성을 가지고 있으므로 useMemo가 의미가 없음
	const phoneStyle = {
		transform: `translate(${phoneX}px, ${phoneY}px)`,
		transition: !phoneIsDrag && phoneIsSnapping ? "none" : "transform 0.5s",
	};

	return {
		reset, islandStyle, phoneStyle, islandEventListener, phoneEventListener, phoneSnapArea
	};
}

export default useIslandDrag;