import { useState, useEffect, useImperativeHandle } from "react";
import generateRandomPuzzle from "./generateRandom.js";
import { generatePiece, generateAnswer, checkPuzzle } from "./utils.js";
import PuzzlePiece from "./PuzzlePiece.jsx";
import style from "./style.module.css";
import car1x from "./assets/car@1x.png";
import car2x from "./assets/car@2x.png";
import panContainer1x from "./assets/panContainer@1x.png";
import panContainer2x from "./assets/panContainer@1x.png";
import pan from "./assets/pan.svg";

// ─│┌┐┘└

function Puzzle({ interactCallback, $ref }) {
  const [answer, setAnswer] = useState(
    generateAnswer(`
			─┐.
			.│.
			.└─`),
  );
  const [piece, setPiece] = useState(
    generatePiece(`
			│┘─
			─││
			│┘│`),
  );

  function reset() {
    const [randAnswer, randPiece] = generateRandomPuzzle();
    setAnswer(randAnswer);
    setPiece(randPiece);
  }

  useEffect(reset, []);
  useImperativeHandle($ref, () => ({ reset }), []);

  const isCorrect = checkPuzzle(piece, answer);

  return (
    <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
      <div className="flex items-center h-28 -translate-x-16 md:translate-x-0">
        <img
          className="object-right w-72 h-28 object-scale-down"
          width="279"
          height="100"
          src={car1x}
          srcSet={`${car1x} 1x, ${car2x} 2x`}
          alt="시작 지점은 (0,0)입니다."
          draggable="false"
        />
        <div className="w-8 h-2 bg-blue-300"></div>
        <svg className="block md:hidden stroke-blue-300 w-12 h-28 absolute right-px overflow-visible fill-none">
          <path
            d="M 0 56 C 50 56 50 120 0 120 H -270 C -290 120 -300 130 -300 150 V 170 C -300 190 -290 200 -270 200 H -255"
            strokeWidth="8"
          />
        </svg>
      </div>
      <div className="grid grid-rows-3 grid-cols-3 gap-4 z-10 w-[23rem] flex-shrink-0">
        {piece.map((shape, i) => {
          const onClick = () => {
            setPiece((board) => {
              const newBoard = [...board];
              newBoard[i] = board[i].rotated();
              return newBoard;
            });
            interactCallback?.();
          };
          const fixRotate = () => {
            setPiece((board) => {
              const newBoard = [...board];
              newBoard[i] = board[i].fixedRotated();
              return newBoard;
            });
          };
          const label = `퍼즐 조각 (${i % 3}, ${Math.floor(i / 3)}). ${shape.getLabel()}`;

          return (
            <PuzzlePiece
              shape={shape}
              key={`puzzle-${i}`}
              onClick={onClick}
              fixRotate={fixRotate}
              ariaLabel={label}
            />
          );
        })}
      </div>
      <div className="flex items-end absolute bottom-0 -right-28 md:relative md:bottom-auto md:right-auto select-none">
        <div className="w-28 h-28 flex items-center relative">
          <svg className="stroke-blue-300 w-12 h-28 overflow-visible fill-none">
            <path
              d="M 0 56 H 32 C 44 56 44 76 32 76 H 24 C 12 76 12 96 24 96 H 56"
              strokeWidth="8"
            />
          </svg>
          <img
            className="object-left w-16 h-28 object-contain"
            width="80"
            height="130"
            src={panContainer1x}
            srcSet={`${panContainer1x} 1x, ${panContainer2x} 2x`}
            alt="도착 지점은 (2,2)입니다."
            draggable="false"
          />
          <img
            className={`absolute right-2 top-3 ${isCorrect ? style.rotate : ""}`}
            src={pan}
            draggable="false"
            alt=""
            role="presentation"
          />
        </div>
      </div>
    </div>
  );
}

export default Puzzle;
