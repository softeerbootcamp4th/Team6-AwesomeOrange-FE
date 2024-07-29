import { useState, useEffect, useRef } from "react";


const voidImage = new Image();
voidImage.src =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC";

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

		e.dataTransfer.dropEffect = "none";
		e.dataTransfer.effectAllowed = "none";
		e.dataTransfer.setDragImage(voidImage, 0, 0);
	}
	function onDragOver(e)
	{
		e.preventDefault();
	}
	function onDrag(e)
	{
		e.preventDefault();
		if(!isDragging.current) return;
		if(e.screenX === 0 && e.screenY === 0) return;
		setX( prevState.current.x + e.clientX - prevState.current.mouseX );
		setY( prevState.current.y + e.clientY - prevState.current.mouseY );
	}
	function onDragEnd(e)
	{
		e.preventDefault();
		if(!isDragging.current) return;
		isDragging.current = false;
	}

	return {
		x,
		y,
		reset() {
			setX(0);
			setY(0);
		},
		eventHandler: {
			onDragStart,
			onDragOver,
			onDrag,
			onDragEnd
		}
	}
}

export default usePointDrag;