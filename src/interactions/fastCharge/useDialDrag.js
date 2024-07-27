import { useState, useRef, useCallback, useEffect } from "react";
import { clamp } from "@/common/utils.js";
import throttleRaf from "@/common/throttleRaf.js";

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

  useEffect(() => {
    const onPointerMove = throttleRaf((e) => {
      if (!isDrag) return;

      const { clientX, clientY } = e;
      const currentAngle = getAngle(
        { x: clientX, y: clientY },
        dialCenter.current,
      );
      angleCache.current += getAngleDelta(prevAngle.current, currentAngle);
      setAngle(angleCache.current);
      prevAngle.current = currentAngle;
    });
    function onPointerEnd() {
      setIsDrag(false);
      angleCache.current = clamp(angleCache.current, -Math.PI * 2, 0);
      setAngle(angleCache.current);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("poinercancel", onPointerEnd);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("poinercancel", onPointerEnd);
    };
  }, [isDrag]);

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
