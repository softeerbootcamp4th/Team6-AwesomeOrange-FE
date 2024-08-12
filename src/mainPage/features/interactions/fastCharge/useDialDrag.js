import { useState, useRef, useCallback } from "react";
import useMountDragEvent from "@main/hooks/useMountDragEvent.js";
import { clamp } from "@common/utils.js";

function getAngle(pointer, center) {
  const vx = pointer.x - center.x;
  const vy = pointer.y - center.y;
  return Math.atan2(vx, -vy);
}

function getAngleDelta(prev, current) {
  if (prev > Math.PI * 0.5 && current < -Math.PI * 0.5)
    return current + Math.PI * 2 - prev;
  if (prev < -Math.PI * 0.5 && current > Math.PI * 0.5)
    return current - Math.PI * 2 - prev;
  return current - prev;
}

function useDialDrag() {
  const [angle, setAngle] = useState(0);
  const dialRef = useRef(null);
  const dialCenter = useRef({ x: 0, y: 0 });
  const prevAngle = useRef(0);
  const angleCache = useRef(0);

  const onDragStart = useCallback((cursor) => {
    if (dialRef.current === null) return;

    const boundRect = dialRef.current.getBoundingClientRect();
    dialCenter.current.x = boundRect.x + boundRect.width / 2;
    dialCenter.current.y = boundRect.y + boundRect.height / 2;
    prevAngle.current = getAngle(cursor, dialCenter.current);
  }, []);
  const onDrag = useCallback((cursor) => {
    const currentAngle = getAngle(cursor, dialCenter.current);
    angleCache.current += getAngleDelta(prevAngle.current, currentAngle);
    setAngle(angleCache.current);
    prevAngle.current = currentAngle;
  }, []);
  const onDragEnd = useCallback(() => {
    angleCache.current = clamp(angleCache.current, -Math.PI * 2, 0);
    setAngle(angleCache.current);
  }, []);

  const { onPointerDown, dragState } = useMountDragEvent({
    onDragStart,
    onDrag,
    onDragEnd,
  });

  const resetAngle = useCallback(() => {
    setAngle(0);
    angleCache.current = 0;
    prevAngle.current = 0;
  }, []);

  const style = {
    transform: `rotate(${angle}rad)`,
    transition: dragState ? "none" : "transform 0.5s",
  };

  return {
    angle,
    style,
    ref: dialRef,
    onPointerDown,
    resetAngle,
    isDragging: dragState,
  };
}

export default useDialDrag;
