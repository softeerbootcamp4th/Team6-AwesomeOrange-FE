import { useState, useRef, useCallback } from "react";
import useMountDragEvent from "@main/hooks/useMountDragEvent.js";

function usePointDrag() {
  const prevState = useRef({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const onDragStart = useCallback(
    function ({ x: mouseX, y: mouseY }) {
      Object.assign(prevState.current, { mouseX, mouseY, x, y });
    },
    [x, y],
  );
  const onDrag = useCallback(function (mouse) {
    setX(prevState.current.x + mouse.x - prevState.current.mouseX);
    setY(prevState.current.y + mouse.y - prevState.current.mouseY);
  }, []);

  const { onPointerDown, dragState } = useMountDragEvent({
    onDragStart,
    onDrag,
  });

  return {
    x,
    y,
    reset() {
      setX(0);
      setY(0);
    },
    isDragging: dragState,
    onPointerDown,
  };
}

export default usePointDrag;
