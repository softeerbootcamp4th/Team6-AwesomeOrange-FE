import { useState, useRef, useMemo, useCallback } from "react";
import throttleRaf from "@/common/throttleRaf.js";
import { clamp } from "@/common/utils.js";
import useMountDragEvent from "@/common/useMountDragEvent.js";

const PHONE_INITIAL_X = 150;
const PHONE_INITIAL_Y = 100;

function useIslandDrag()
{
	// island state
	const [islandIsDrag, setIslandIsDrag] = useState(false);
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

	// mount island drag event
	const islandOnDragStart = function(e)
	{
		setIslandIsDrag(true);
		islandStartMouseYPosition.current = e.clientY;
		islandStartPosition.current = islandY;
	}
	const islandOnDragging = useCallback(function({y: mouseY})
	{
		const rawY = mouseY - islandStartMouseYPosition.current + islandStartPosition.current;
		const y = clamp(rawY, -50, 50);

		setIslandY(y);

		if(phoneIsSnapping) {
			setPhoneX(0);
			setPhoneY(y);
		}
	}, [phoneIsSnapping]);
	const islandOnDragEnd = useCallback(()=>{
		setIslandIsDrag(false);
	}, []);
	useMountDragEvent(islandOnDragging, islandOnDragEnd, islandIsDrag);

	// mount phone drag event
	const phoneOnDragStart = function(e) {
		setPhoneIsDrag(true);
		phoneStartMousePosition.current = { x: e.clientX, y: e.clientY };
		phoneStartPosition.current = { x: phoneX, y:phoneY };
	}
	const phoneOnDragging = useCallback(function({x: mouseX, y: mouseY})
	{
		const x = mouseX - phoneStartMousePosition.current.x + phoneStartPosition.current.x;
		const y = mouseY - phoneStartMousePosition.current.y + phoneStartPosition.current.y;

		setPhoneX(x);
		setPhoneY(y);
	}, []);
	const phoneOnDragEnd = useCallback(()=>{
		setPhoneIsDrag(false);
	}, []);
	useMountDragEvent(phoneOnDragging, phoneOnDragEnd, phoneIsDrag);

	// reset function interface
	const reset = useCallback( ()=>{
		islandStartMouseYPosition.current = 0;
		phoneStartMousePosition.current = {x: 0, y: 0};
		islandStartPosition.current = 0;
		phoneStartPosition.current = {x: PHONE_INITIAL_X, y: PHONE_INITIAL_Y};
		setIslandIsDrag(false);
		setIslandY(0);
		setPhoneIsDrag(false);
		setPhoneIsSnapping(false);
		setPhoneX(PHONE_INITIAL_X);
		setPhoneY(PHONE_INITIAL_Y);
	}, [] );

	// island style
	const islandStyle = useMemo( ()=>({
		transform: `translateY(${islandY}px)`
	}), [islandY] );

	// phone style은 상당히 많은 state 종속성을 가지고 있으므로 useMemo가 의미가 없음
	const phoneStyle = {
		transform: `translate(${phoneX}px, ${phoneY}px)`,
		transition: !phoneIsDrag && phoneIsSnapping ? "transform 0.5s" : "none",
	};

	return {
		reset, islandStyle, phoneStyle, 
		islandEventListener: {onPointerDown: islandOnDragStart}, 
		phoneEventListener: {onPointerDown: phoneOnDragStart}, 
		phoneSnapArea
	};
}

export default useIslandDrag;