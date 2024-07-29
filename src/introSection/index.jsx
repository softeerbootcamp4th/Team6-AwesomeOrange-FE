import useScrollTransition from "@/common/useScrollTransition.js";
import vector from "./vector.svg";
import style from "./index.module.css";
import SpinningCarVideo from "./car-spin.mp4";
import { useEffect, useRef } from "react";

function IntroSection() {
  const videoRef = useRef(null);
  const titleOpacity = useScrollTransition({
    scrollStart: 0,
    scrollEnd: 500,
    valueStart: 1,
    valueEnd: 0,
  });

  const titleStyle = {
    opacity: titleOpacity,
  };

  const videoTimeline = useScrollTransition({
    scrollStart: 500,
    scrollEnd: 1300,
    valueStart: 0,
    valueEnd: 2,
  });

  useEffect(() => {
    videoRef.current.currentTime = videoTimeline;
  }, [videoTimeline]);

  return (
    <div className="h-[2160px]">
      <div className="z-50 fixed w-full flex justify-center top-[500px] -translate-y-1/2">
        <h1
          className={`${style.openTitle} ease-in text-8xl font-bold z-50`}
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

      <div className="mt-[800px] flex justify-center items-center overflow-hidden z-0">
        <video src={SpinningCarVideo} ref={videoRef} className="scale-125" />
      </div>
    </div>
  );
}

export default IntroSection;
