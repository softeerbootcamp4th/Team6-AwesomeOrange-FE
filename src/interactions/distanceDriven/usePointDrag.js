import { useState, useRef, useCallback } from "react";
import useMountDragEvent from "@/common/useMountDragEvent.js";

function usePointDrag()
{
	const isDragging = useRef(false);
	const prevState = useRef({x: 0, y: 0, mouseX: 0, mouseY: 0});
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	function onDragStart(e)
	{
		isDragging.current = true;
		prevState.current.mouseX = e.clientX;
		prevState.current.mouseY = e.clientY;
		prevState.current.x = x;
		prevState.current.y = y;
	}
	function onDragOver(e)
	{
		e.preventDefault();
	}
	const onDrag = useCallback(function(mouse) {
		if(!isDragging.current) return;
		setX( prevState.current.x + mouse.x - prevState.current.mouseX );
		setY( prevState.current.y + mouse.y - prevState.current.mouseY );
	}, []);
	const onDragEnd = useCallback(function(e) {
		if(!isDragging.current) return;
		isDragging.current = false;
	});

	useMountDragEvent(onDrag, onDragEnd);

	return {
		x,
		y,
		reset() {
			setX(0);
			setY(0);
		},
		onPointerDown: onDragStart
	}
}

export default usePointDrag;