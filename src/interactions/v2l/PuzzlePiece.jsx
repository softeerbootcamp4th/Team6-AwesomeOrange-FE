import { useState } from "react";
import { LINEAR } from "./constants.js";

function PuzzlePiece({ shape, onClick, fixRotate }) {
  const [fixing, setFixing] = useState(false);
  const style = {
    transform: `rotate( ${shape.rotate * 90}deg)`,
  };

  return (
    <div
      style={style}
      className={`size-28 bg-black rounded-xl border-2 border-white transition-transform ease-out ${fixing ? "duration-0" : "duration-500"}`}
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
    >
      <svg
        className="size-full stroke-blue-300 fill-transparent"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={shape.type === LINEAR ? "M 0 54 H 108" : "M108 54 H 54 V 108"}
          strokeWidth="8"
        />
      </svg>
    </div>
  );
}

export default PuzzlePiece;
