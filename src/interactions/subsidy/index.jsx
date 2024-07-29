import { useState, useRef, useImperativeHandle } from "react";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import coinRottie from "./assets/coin.json";
import dollor from "./assets/dollor.svg";
import InteractionDescription from "../InteractionDescription.jsx";

function SubsidyInteraction({ interactCallback, $ref }) {
  const [count, setCount] = useState(0);
  const rottieRef = useRef(null);

  function onClick()
  {
  	setCount( count=>count+1 );
  	rottieRef.current.goToAndPlay(0);
  }

  useImperativeHandle($ref, () => ({ reset(){
  	setCount(0);  
  } }), []);

  return (
    <article className="relative w-full h-full overflow-hidden flex items-center flex-col">
      <InteractionDescription
        order="5"
        title="걱정 없이, 더 멀리"
        description="The new IONIQ 5는 한 번의 충전으로 얼마나 멀리 주행할 수 있을까요?"
        directive="가운데 점을 드래그하여 최대 주행거리를 예측해보세요!"
      />
      <div className="absolute z-0 w-96 h-96 top-[calc(50%-12rem)] flex justify-center items-center" >
      	<div className="absolute size-[120px] rounded-full bg-blue-400 flex justify-center items-center" onClick={onClick}>
      		<img src={dollor} className="select-none" alt="$" width="22.8" height="35.84" />
      	</div>
      	<Lottie className="absolute -z-10" animationData={coinRottie} ref={rottieRef} loop={false}/>
      </div>
      <p className="text-white absolute bottom-32 md:bottom-36 lg:bottom-[180px] text-title-s pointer-events-none">
        <span className="text-head-m md:text-head-l lg:text-[4.375rem] mr-1.5 lg:mr-2.5">
          {count * 10}
        </span>
        만원
      </p>
    </article>
  );
}

export default SubsidyInteraction;
