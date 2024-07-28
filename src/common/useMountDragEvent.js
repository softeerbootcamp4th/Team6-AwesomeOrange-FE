import { useEffect } from "react";
import throttleRaf from "@/common/throttleRaf.js";

function useMountDragEvent( dragging, dragEnd, isDrag )
{
	useEffect(() => {
		const onPointerMove = throttleRaf((e) => {
			if (!isDrag) return;
			const { clientX, clientY } = e;
			dragging({ x: clientX, y: clientY });
		});
		const onTouchMove = throttleRaf((e) => {
			if (!isDrag) return;
			const { clientX, clientY } = e.touches[0];
			dragging({ x: clientX, y: clientY });
		});

		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", dragEnd);
		window.addEventListener("pointercancel", dragEnd);
		window.addEventListener("touchmove", onTouchMove);
		window.addEventListener("touchend", dragEnd);
		window.addEventListener("touchcancel", dragEnd);
		return () => {
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", dragEnd);
			window.removeEventListener("pointercancel", dragEnd);
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("touchend", dragEnd);
			window.removeEventListener("touchcancel", dragEnd);
		};
	}, [isDrag, dragging, dragEnd]);
}

export default useMountDragEvent;