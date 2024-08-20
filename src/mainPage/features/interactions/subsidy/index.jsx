import { useState, useRef, useImperativeHandle } from "react";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import coinLottie from "./assets/coin.json";
import dollor from "./assets/dollor.svg";
import InteractionDescription from "../InteractionDescription.jsx";

function SubsidyInteraction({ interactCallback, $ref }) {
  const [count, setCount] = useState(0);
  const [lotties, setLotties] = useState(new Set());
  const coinRef = useRef(null);

  function onClick() {
    setCount((count) => count + 1);
    coinRef.current?.animate([{ transform: "rotateY(0)" }, { transform: "rotateY(360deg)" }], {
      duration: 500,
      iteractions: 1,
      easing: "cubic-bezier(0.215, 0.610, 0.355, 1.000)", // ease-out-cubic
    });
    setLotties((lotties) => {
      const newLotties = new Set(lotties);
      newLotties.add(Math.floor(Math.random() * 10000000));
      return newLotties;
    });
    interactCallback?.();
  }

  function deleteLottie(id) {
    setLotties((lotties) => {
      const newLotties = new Set(lotties);
      newLotties.delete(id);
      return newLotties;
    });
  }

  useImperativeHandle(
    $ref,
    () => ({
      reset() {
        setCount(0);
      },
    }),
    [],
  );

  return (
    <article className="relative w-full h-full overflow-hidden flex items-center flex-col">
      <InteractionDescription
        order="5"
        title="누구보다 경제적으로"
        description="The new IONIQ 5 구매 시, 최대 얼마의 보조금 혜택을 받을 수 있을까요?"
        directive="동전을 클릭하여 예상 금액을 입력해보세요!"
      />
      <div className="absolute z-0 w-96 h-96 top-[calc(50%-12rem)] flex justify-center items-center">
        <button
          className="absolute size-[120px] active:scale-90 transition-transform"
          aria-label="Space바를 눌러서 동전을 클릭하고, 예상 금액을 올려보세요!"
          onClick={onClick}
        >
          <div
            className="w-full h-full flex justify-center items-center rounded-full bg-blue-400 "
            ref={coinRef}
          >
            <img
              src={dollor}
              className="select-none"
              alt="$"
              width="22.8"
              height="35.84"
              draggable="false"
            />
          </div>
        </button>
        <div className="absolute -z-10 w-full h-full">
          {[...lotties].map((id) => (
            <Lottie
              key={id}
              className={`absolute top-0 left-0 ${id % 2 ? "-scale-x-100" : ""}`}
              animationData={coinLottie}
              onComplete={() => deleteLottie(id)}
              play={true}
              loop={false}
            />
          ))}
        </div>
      </div>
      <p className="text-white absolute bottom-32 md:bottom-36 lg:bottom-[180px] text-title-s font-bold pointer-events-none select-none">
        <span className="text-head-m md:text-head-l lg:text-17.5 mr-1.5 lg:mr-2.5">
          {count * 10}
        </span>
        만원
      </p>
    </article>
  );
}

export default SubsidyInteraction;
