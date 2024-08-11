import { useState, useRef, useMemo, useCallback } from "react";
import { clamp } from "@/common/utils.js";
import useMountDragEvent from "@/common/useMountDragEvent.js";

const PHONE_INITIAL_X = 150;
const PHONE_INITIAL_Y = 100;

function aabbCheck(bound1, bound2) {
  if (bound1.right < bound2.left) return false;
  if (bound1.left > bound2.right) return false;
  if (bound1.top > bound2.bottom) return false;
  if (bound1.bottom < bound2.top) return false;
  return true;
}

function useIslandDrag() {
  // island state
  const islandStartMouseYPosition = useRef(0);
  const islandStartPosition = useRef(0);
  const [islandY, setIslandY] = useState(0);

  // phone state
  const phoneStartMousePosition = useRef({ x: 0, y: 0 });
  const phoneStartPosition = useRef({ x: PHONE_INITIAL_X, y: PHONE_INITIAL_Y });
  const [phoneIsSnapping, setPhoneIsSnapping] = useState(false);
  const [phoneShouldSnapped, setPhoneShouldSnapped] = useState(false);
  const [phoneX, setPhoneX] = useState(PHONE_INITIAL_X);
  const [phoneY, setPhoneY] = useState(PHONE_INITIAL_Y);

  // phone snap area
  const phoneSnapArea = useRef(null);

  // mount island drag event
  const islandOnDragStart = useCallback(
    ({ y }) => {
      setPhoneShouldSnapped(false);
      islandStartMouseYPosition.current = y;
      islandStartPosition.current = islandY;
    },
    [islandY],
  );
  const islandOnDragging = useCallback(
    function ({ y: mouseY }) {
      const rawY =
        mouseY -
        islandStartMouseYPosition.current +
        islandStartPosition.current;
      const y = clamp(rawY, -50, 50);

      setIslandY(y);

      if (phoneIsSnapping) {
        setPhoneX(0);
        setPhoneY(y);
      }
    },
    [phoneIsSnapping],
  );
  const { onPointerDown: islandOnPointerDown, dragState: islandIsDrag } =
    useMountDragEvent({
      onDragStart: islandOnDragStart,
      onDrag: islandOnDragging,
    });

  // mount phone drag event
  const phoneOnDragStart = useCallback(
    (position) => {
      setPhoneShouldSnapped(false);
      phoneStartMousePosition.current = position;
      phoneStartPosition.current = { x: phoneX, y: phoneY };
    },
    [phoneX, phoneY],
  );
  const phoneOnDragging = useCallback(function ({ x: mouseX, y: mouseY }) {
    const x =
      mouseX - phoneStartMousePosition.current.x + phoneStartPosition.current.x;
    const y =
      mouseY - phoneStartMousePosition.current.y + phoneStartPosition.current.y;

    setPhoneX(x);
    setPhoneY(y);
  }, []);
  const phoneOnDragEnd = useCallback(
    (e) => {
      const isSnapped = aabbCheck(
        e.target.getBoundingClientRect(),
        phoneSnapArea.current.getBoundingClientRect(),
      );
      setPhoneIsSnapping(isSnapped);
      if (isSnapped) {
        setPhoneX(0);
        setPhoneY(islandY);
        setPhoneShouldSnapped(true);
      }
    },
    [islandY],
  );
  const { onPointerDown: phoneOnPointerDown, dragState: phoneIsDrag } =
    useMountDragEvent({
      onDragStart: phoneOnDragStart,
      onDrag: phoneOnDragging,
      onDragEnd: phoneOnDragEnd,
    });

  // reset function interface
  const reset = useCallback(() => {
    islandStartMouseYPosition.current = 0;
    phoneStartMousePosition.current = { x: 0, y: 0 };
    islandStartPosition.current = 0;
    phoneStartPosition.current = { x: PHONE_INITIAL_X, y: PHONE_INITIAL_Y };
    setIslandY(0);
    setPhoneIsSnapping(false);
    setPhoneShouldSnapped(false);
    setPhoneX(PHONE_INITIAL_X);
    setPhoneY(PHONE_INITIAL_Y);
  }, []);

  // island style
  const islandStyle = useMemo(
    () => ({
      transform: `translateY(${islandY}px)`,
      transition: !islandIsDrag ? "transform 0.2s" : "none",
    }),
    [islandY, islandIsDrag],
  );

  // phone style은 상당히 많은 state 종속성을 가지고 있으므로 useMemo가 의미가 없음
  const phoneStyle = {
    transform: `translate(${phoneX}px, ${phoneY}px)`,
    transition: phoneShouldSnapped
      ? "transform 0.5s"
      : !phoneIsSnapping && !phoneIsDrag
        ? "transform 0.2s"
        : "none",
  };

  return {
    reset,
    islandStyle,
    phoneStyle,
    phoneIsSnapping,
    islandEventListener: { onPointerDown: islandOnPointerDown },
    phoneEventListener: { onPointerDown: phoneOnPointerDown },
    phoneSnapArea,
    isDragging: islandIsDrag || phoneIsDrag,
  };
}

export default useIslandDrag;
