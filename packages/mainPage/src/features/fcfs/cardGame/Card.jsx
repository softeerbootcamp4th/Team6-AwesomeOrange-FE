import { useState } from "react";
import style from "./style.module.css";
import correct1x from "./assets/correct@1x.png";
import correct2x from "./assets/correct@2x.png";
import failed1x from "./assets/failed@1x.png";
import failed2x from "./assets/failed@2x.png";
import hidden1x from "./assets/hidden@1x.png";
import hidden2x from "./assets/hidden@2x.png";

// 빠진 것: index props, setPending, setCorrect state
function Card({ index, locked, isFlipped, setFlipped, setGlobalLock, getCardAnswer }) {
  const [isPending, setPending] = useState(false);
  const [isCorrect, setCorrect] = useState(false);
  const cardFaceBaseStyle = "absolute top-0 left-0 w-full h-full";

  function flip() {
    setGlobalLock(true);
    setPending(true);
    getCardAnswer(index)
      .then((isAnswer) => {
        setCorrect(isAnswer);
        setFlipped(true);
      })
      .catch(() => {
        setFlipped(false);
      })
      .finally(() => {
        setPending(false);
        setGlobalLock(false);
      });
  }

  const answer1x = isCorrect ? correct1x : failed1x;
  const answer2x = isCorrect ? correct2x : failed2x;

  return (
    <button
      className={`w-[7.5rem] h-40 sm:w-60 sm:h-80 relative transition-transform duration-200 ease-in-out-cubic ${style.card} ${isFlipped ? style.flipped : ""}`}
      onClick={flip}
      disabled={locked || isFlipped}
    >
      <div className={`${cardFaceBaseStyle} ${isPending && !isFlipped ? style.pending : ""}`}>
        <img
          className={`${cardFaceBaseStyle} ${style.front}`}
          src={hidden1x}
          srcSet={`${hidden1x} 1x, ${hidden2x} 2x`}
          alt={isFlipped || isPending ? "" : `${index}번 카드를 뒤집으세요!`}
          draggable="false"
          loading="lazy"
        />
        <img
          className={`${cardFaceBaseStyle} ${style.back}`}
          src={answer1x}
          srcSet={`${answer1x} 1x, ${answer2x} 2x`}
          alt={
            isFlipped
              ? isCorrect
                ? "축하합니다, 당첨입니다!"
                : `${index}번 카드는 정답이 아니네요! 다른 카드를 뒤집으세요.`
              : ""
          }
          draggable="false"
          loading="lazy"
        />
      </div>
    </button>
  );
}

export default Card;
