import { useState, useRef, useEffect, useCallback } from "react";
import throttleRaf from "@common/throttleRaf.js";

function useMountDragEvent({ onDragStart: userDragStart, onDrag, onDragEnd: userDragEnd, enabled = true } = {}) {
  const [dragState, setDragState] = useState(false);
  const isDragging = useRef(false);

  useEffect(() => {
    if(!enabled) return;

    const onPointerMove = throttleRaf((e) => {
      if (e.pointerType === "touch") return;
      if (!isDragging.current) return;
      const { clientX, clientY } = e;
      onDrag({ x: clientX, y: clientY });
    });
    const onTouchMove = throttleRaf((e) => {
      const { clientX, clientY } = e.touches[0];
      if (!isDragging.current) return;
      onDrag({ x: clientX, y: clientY });
    });

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [onDrag, enabled]);

  useEffect(() => {
    if(!enabled) return;

    const onDragEnd = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setDragState(false);
      userDragEnd?.(e);
    };

    window.addEventListener("pointerup", onDragEnd);
    window.addEventListener("pointercancel", onDragEnd);
    window.addEventListener("touchend", onDragEnd);
    window.addEventListener("touchcancel", onDragEnd);
    return () => {
      window.removeEventListener("pointerup", onDragEnd);
      window.removeEventListener("pointercancel", onDragEnd);
      window.removeEventListener("touchend", onDragEnd);
      window.removeEventListener("touchcancel", onDragEnd);
    };
  }, [userDragEnd, enabled]);

  const onPointerDown = useCallback(
    (e) => {
      if(!enabled) return;
      isDragging.current = true;
      setDragState(true);
      userDragStart?.({ x: e.clientX, y: e.clientY });
    },
    [userDragStart, enabled],
  );

  return {
    onPointerDown,
    dragState,
  };
}

export default useMountDragEvent;
