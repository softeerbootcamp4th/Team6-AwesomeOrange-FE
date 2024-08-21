import { useState, useRef, useCallback } from "react";
import useMountDragEvent from "@main/hooks/useMountDragEvent.js";
import useA11yDrag from "@main/hooks/useA11yDrag.js";

const grabText = (x, y, km) =>
  `점을 잡았습니다. 현재 좌표는 (${x}, ${y})이며, 거리는 ${km}km입니다. 방향키를 눌러 점의 위치를 조정하세요. 스페이스바를 눌러 점을 놓을 수 있습니다.`;
const moveText = (x, y, km) => `현재 좌표는 (${x}, ${y})이며, 거리는 ${km}km입니다.`;
const dropText = (x, y, km) => `점이 놓였습니다. 새 좌표는 (${x}, ${y})이며, 거리는 ${km}km입니다.`;

function usePointDrag(enabled) {
  const prevState = useRef({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [subtitle, setSubtitle] = useState(() => () => "");

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

  const onKeyMove = useCallback(function (x, y) {
    setX((prev) => prev + x * 10);
    setY((prev) => prev + y * 10);
  }, []);

  const { onPointerDown, dragState } = useMountDragEvent({
    onDragStart,
    onDrag,
    enabled,
  });

  const handleRef = useA11yDrag({
    grabText,
    moveText,
    dropText,
    onKeyMove,
    enabled,
    setSubtitle,
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
    handleRef,
    subtitle,
  };
}

export default usePointDrag;
