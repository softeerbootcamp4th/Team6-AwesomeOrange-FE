import { useState } from "react";
import { LINEAR } from "./businessLogic/constants.js";

function PuzzlePiece({ shape, onClick, fixRotate, ariaLabel, disabled, $ref, glow }) {
  const [fixing, setFixing] = useState(false);
  const style = {
    transform: `rotate( ${shape.rotate * 90}deg)`,
  };
  const staticStyle = `size-28 bg-black rounded-xl border-2 border-white outline-yellow-400
  transition-transform ease-out ${fixing ? "duration-0" : "duration-500"}
  ${glow ? "shadow-[0_0px_8px_2px_#97E0FF]" : ""}`;

  return (
    <button
      style={style}
      className={staticStyle}
      onClick={() => {
        onClick();
        setFixing(false);
      }}
      onTransitionEnd={() => {
        if (shape.rotate < 4) return;
        setFixing(true);
        fixRotate();
        setTimeout(() => setFixing(false), 60);
      }}
      aria-label={ariaLabel}
      disabled={disabled}
      ref={$ref}
    >
      <svg
        className={`size-full fill-transparent ${glow ? "stroke-blue-300" : "stroke-neutral-500"}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={shape.type === LINEAR ? "M 0 54 H 108" : "M108 54 H 54 V 108"} strokeWidth="8" />
      </svg>
    </button>
  );
}

export default PuzzlePiece;
