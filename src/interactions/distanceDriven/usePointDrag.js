import { useState, useRef, useCallback } from "react";
import useMountDragEvent from "@/common/useMountDragEvent.js";

function usePointDrag() {
  const isDragging = useRef(false);
  const [dragState, setDragState] = useState(false);
  const prevState = useRef({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function onDragStart({clientX: mouseX, clientY: mouseY}) {
    isDragging.current = true;
    Object.assign(prevState.current, {mouseX, mouseY, x, y});
    setDragState(true);
  }
  const onDrag = useCallback(function (mouse) {
    if (!isDragging.current) return;
    setX(prevState.current.x + mouse.x - prevState.current.mouseX);
    setY(prevState.current.y + mouse.y - prevState.current.mouseY);
  }, []);
  const onDragEnd = useCallback(function () {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragState(false);
  }, []);

  useMountDragEvent(onDrag, onDragEnd);

  return {
    x,
    y,
    reset() {
      setX(0);
      setY(0);
    },
    isDragging: dragState,
    onPointerDown: onDragStart,
  };
}

export default usePointDrag;
