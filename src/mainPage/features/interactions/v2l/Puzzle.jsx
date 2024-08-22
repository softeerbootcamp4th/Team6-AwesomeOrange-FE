import { useReducer, useEffect, useImperativeHandle } from "react";
import reducer from "./businessLogic/reducer.js";
import { generatePiece, generateAnswer, checkPuzzle } from "./businessLogic/utils.js";
import PuzzlePiece from "./PuzzlePiece.jsx";
import style from "./style.module.css";
import car1x from "./assets/car@1x.png";
import car2x from "./assets/car@2x.png";
import panContainer1x from "./assets/panContainer@1x.png";
import panContainer2x from "./assets/panContainer@2x.png";
import pan from "./assets/pan.svg";

// ─│┌┐┘└

function Puzzle({ interactCallback, $ref, disabled }) {
  const [state, dispatch] = useReducer(reducer, {
    answer: generateAnswer(`
      ─┐.
      .│.
      .└─`),
    piece: generatePiece(`
      │┘─
      ─││
      │┘│`),
    subtitle: `IONIQ 5의 브이투엘 기능을 홍보하는 길 맞추기 퍼즐 게임입니다. 스페이스바로 퍼즐 조각을 눌러서 퍼즐을 오른쪽으로 돌려보세요.
    퍼즐은 가로 3칸, 세로 3칸으로 구성되어 있으며, 왼쪽 위부터 1번입니다. 1번 퍼즐이 9번 퍼즐까지 이어지면 게임에서 이길 수 있습니다.`
  });

  const { answer, piece, subtitle } = state;
  useEffect(()=>dispatch({type: "reset", initialized: true}), []);
  useImperativeHandle($ref, () => ({ reset: ()=>dispatch({type: "reset", initialized: false}) }), []);

  const isCorrect = checkPuzzle(piece, answer);

  return (
    <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
      <span aria-live="assertive" className="assistive-text">
        {subtitle}
      </span>
      <div className="flex items-center h-28 -translate-x-16 md:translate-x-0">
        <img
          className="object-right w-72 h-28 object-scale-down"
          width="279"
          height="100"
          src={car1x}
          srcSet={`${car1x} 1x, ${car2x} 2x`}
          alt=""
          role="presentation"
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
            if(disabled) return;
            dispatch({type: "rotate", index: i});
            interactCallback?.();
          };
          const fixRotate = () => {
            dispatch({type: "reconcile-rotate", index: i});
          };
          const label = `${i+1} 번째 퍼즐입니다. ${shape.getLabel()}`;

          return (
            <PuzzlePiece
              shape={shape}
              key={`puzzle-${i}`}
              onClick={onClick}
              fixRotate={fixRotate}
              ariaLabel={label}
              disabled={disabled}
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
            alt=""
            role="presentation"
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
