import { useEffect, useRef } from "react";

const voidAssistive = () => "";

function getDir(keyCode) {
  switch (keyCode) {
    case "ArrowUp":
      return [0, -1];
    case "ArrowDown":
      return [0, 1];
    case "ArrowLeft":
      return [-1, 0];
    case "ArrowRight":
      return [1, 0];
    default:
      return [0, 0];
  }
}

function useA11yDrag({
  grabText = voidAssistive,
  moveText = voidAssistive,
  dropText = voidAssistive,
  onKeyGrab,
  onKeyMove,
  onKeyRelease,
  setSubtitle,
  enabled = true,
}) {
  const target = useRef(null);
  const grabbed = useRef(false);

  useEffect(() => {
    if (target.current === null || !enabled) return;

    function onKeyDown(e) {
      if (document.activeElement !== target.current) return;

      if (grabbed.current) {
        switch (e.code) {
          case "Tab": {
            e.preventDefault();
            break;
          }
          case "Space": {
            grabbed.current = false;
            setSubtitle(() => dropText);
            e.preventDefault();
            onKeyRelease?.();
            break;
          }
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight": {
            const [x, y] = getDir(e.code);
            onKeyMove(x, y);
            setSubtitle(() => moveText);
            e.preventDefault();
            break;
          }
        }
      } else if (e.code === "Space") {
        grabbed.current = true;
        setSubtitle(() => grabText);
        onKeyGrab?.();
        e.preventDefault();
      }
    }
    function onFocusOut() {
      grabbed.current = false;
      onKeyRelease?.();
      setSubtitle(() => voidAssistive);
    }

    const targetDom = target.current;
    document.addEventListener("keydown", onKeyDown);
    targetDom.addEventListener("blur", onFocusOut);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      targetDom.removeEventListener("blur", onFocusOut);
    };
  }, [grabText, moveText, dropText, onKeyGrab, onKeyMove, onKeyRelease, setSubtitle, enabled]);

  return target;
}

export default useA11yDrag;
