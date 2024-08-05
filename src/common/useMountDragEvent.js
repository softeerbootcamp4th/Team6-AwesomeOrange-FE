import { useEffect } from "react";
import throttleRaf from "@/common/throttleRaf.js";

function useMountDragEvent(dragging, dragEnd) {
  useEffect(() => {
    const onPointerMove = throttleRaf((e) => {
      if (e.pointerType === "touch") return;
      const { clientX, clientY } = e;
      dragging({ x: clientX, y: clientY });
    });
    const onTouchMove = throttleRaf((e) => {
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
  }, [dragging, dragEnd]);
}

export default useMountDragEvent;
