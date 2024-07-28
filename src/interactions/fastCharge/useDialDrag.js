import { useState, useRef, useCallback, useEffect } from "react";
import { clamp } from "@/common/utils.js";
import useMountDragEvent from "@/common/useMountDragEvent.js";

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
  const [isDrag, setIsDrag] = useState(false);
  const [angle, setAngle] = useState(0);
  const dialRef = useRef(null);
  const dialCenter = useRef({ x: 0, y: 0 });
  const prevAngle = useRef(0);
  const angleCache = useRef(0);

  const applyPointerMove = useCallback( (cursor)=>{
    const currentAngle = getAngle(cursor, dialCenter.current);
    angleCache.current += getAngleDelta(prevAngle.current, currentAngle);
    setAngle(angleCache.current);
    prevAngle.current = currentAngle;
  }, [] );
  const onPointerEnd = useCallback( ()=>{
    setIsDrag(false);
    angleCache.current = clamp(angleCache.current, -Math.PI * 2, 0);
    setAngle(angleCache.current);
  }, [] );
  useMountDragEvent(applyPointerMove, onPointerEnd, isDrag);

  function onPointerStart(e) {
    if (dialRef.current === null) return;

    const { clientX, clientY } = e;
    const boundRect = dialRef.current.getBoundingClientRect();
    dialCenter.current.x = boundRect.x + boundRect.width / 2;
    dialCenter.current.y = boundRect.y + boundRect.height / 2;
    prevAngle.current = getAngle(
      { x: clientX, y: clientY },
      dialCenter.current,
    );

    setIsDrag(true);
  }

  const resetAngle = useCallback(() => setAngle(0), []);

  const style = {
    transform: `rotate(${angle}rad)`,
    transition: isDrag ? "none" : "transform 0.5s",
  };

  return {
    angle,
    style,
    ref: dialRef,
    onPointerStart,
    resetAngle,
  };
}

export default useDialDrag;
