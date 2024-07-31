import useScrollTransition from "@/common/useScrollTransition.js";
import vector from "./vector.svg";
import style from "./index.module.css";
import SpinningCarVideo from "./car-spin.mp4";
import Pointer from "./pointer.svg";
import { useEffect, useRef } from "react";

function IntroSection() {
  const videoRef = useRef(null);
  const titleOpacity = useScrollTransition({
    scrollStart: 0,
    scrollEnd: 500,
    valueStart: 1,
    valueEnd: 0,
  });

  const videoTimeline = useScrollTransition({
    scrollStart: 300,
    scrollEnd: 1000,
    valueStart: 0,
    valueEnd: 2,
  });

  const videoScroll = useScrollTransition({
    scrollStart: 0,
    scrollEnd: 2160,
    valueStart: 0, // 명세서의 Y값은 절대값이지만 넘겨줘야 하는 값은 상대값
    valueEnd: -400,
  });

  const titleStyle = {
    opacity: titleOpacity,
  };

  const videoStyle = {
    transform: `translateY(${videoScroll}px)`,
  };

  useEffect(() => {
    videoRef.current.currentTime = videoTimeline;
  }, [videoTimeline]);

  return (
    <div className="h-[2160px]">
      <div className="z-50 fixed w-full flex justify-center top-[500px] -translate-y-1/2 pointer-events-none">
        <h1
          className={`${style.openTitle} ease-in text-8xl font-bold text-black  z-50`}
          style={titleStyle}
        >
          The new IONIQ 5
        </h1>

        <div
          className="absolute top-[66px] z-0 overflow-hidden"
          style={titleStyle}
        >
          <img src={vector} />

          <div
            className={`${style.openVector} w-full h-full bg-white absolute top-0`}
          />
        </div>
      </div>

      <div
        className="relative pt-[800px] h-[1880px] flex justify-center items-center overflow-hidden"
        style={videoStyle}
      >
        <video
          src={SpinningCarVideo}
          ref={videoRef}
          className="scale-125 z-0 pointer-events-none select-none"
        />

        <div className="font-bold flex flex-col items-center text-black absolute bottom-[36px] z-50">
          <span className="text-[24px]">더뉴 아이오닉5 신차 출시 이벤트</span>
          <span className="text-[36px]">09/09 (mon) - 09/13 (fri)</span>
        </div>
      </div>

      <div className="flex justify-center pt-[100px] animate-bounce">
        <img src={Pointer} alt="다음으로 넘어가기"/>
      </div>
    </div>
  );
}

export default IntroSection;
