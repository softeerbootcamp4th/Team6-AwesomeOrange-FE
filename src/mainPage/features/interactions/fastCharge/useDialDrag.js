import { useState, useRef, useCallback } from "react";
import useMountDragEvent from "@main/hooks/useMountDragEvent.js";
import useA11yDrag from "@main/hooks/useA11yDrag.js";
import { clamp } from "@common/utils.js";

const MAX_MINUTE = 30;

function getAngle(pointer, center) {
  const vx = pointer.x - center.x;
  const vy = pointer.y - center.y;
  return Math.atan2(vx, -vy);
}

function getAngleDelta(prev, current) {
  if (prev > Math.PI * 0.5 && current < -Math.PI * 0.5) return current + Math.PI * 2 - prev;
  if (prev < -Math.PI * 0.5 && current > Math.PI * 0.5) return current - Math.PI * 2 - prev;
  return current - prev;
}

const grabText = (value) =>
  `다이얼 조작을 시작합니다. 현재 당신이 선택한 충전 시간은 ${value}분입니다. 왼쪽 방향키를 눌러서 충전 시간을 줄이고, 오른쪽 방향키를 눌러서 충전 시간을 늘려보세요. 최대 30분까지만 늘릴 수 있습니다.`;
const moveText = (value, angle) => {
  if (angle > 0) return `다이얼을 0도 이하로 조작할 수 없습니다.`;
  if (angle < -Math.PI * 2) return `다이얼을 360도 이상으로 조작할 수 없습니다.`;
  return `다이얼을 돌렸습니다. 당신이 선택한 충전 시간은 ${value}분입니다.`;
};
const dropText = (value) =>
  `다이얼 조작을 해제했습니다. 당신이 선택한 충전 시간은 ${value}분입니다.`;

function useDialDrag(enabled = true) {
  const [angle, setAngle] = useState(0);
  const dialRef = useRef(null);
  const dialCenter = useRef({ x: 0, y: 0 });
  const prevAngle = useRef(0);
  const angleCache = useRef(0);
  const [subtitle, setSubtitle] = useState(() => () => "");

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
    enabled,
  });

  const resetAngle = useCallback(() => {
    setAngle(0);
    angleCache.current = 0;
    prevAngle.current = 0;
  }, []);

  const onKeyMove = useCallback((x, y) => {
    const UNIT = (Math.PI * 2) / MAX_MINUTE;

    const delta = x !== 0 ? x : -y;
    function getNewAngle(angle) {
      const rounded = Math.round(angle / UNIT);
      if (rounded - delta > 0) return UNIT;
      else if (rounded - delta < -MAX_MINUTE) return -Math.PI * 2 - UNIT;
      return (rounded - delta) * UNIT;
    }

    angleCache.current = getNewAngle(angleCache.current);
    setAngle(angleCache.current);
  }, []);

  const keyRef = useA11yDrag({
    grabText,
    moveText,
    dropText,
    onKeyMove,
    enabled,
    setSubtitle,
  });

  const style = {
    transform: `rotate(${angle}rad)`,
    transition: dragState ? "none" : "transform 0.5s",
  };

  return {
    angle,
    style,
    ref: dialRef,
    keyRef,
    onPointerDown,
    resetAngle,
    isDragging: dragState,
    subtitle,
  };
}

export default useDialDrag;
