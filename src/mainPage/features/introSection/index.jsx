import { useEffect, useRef, useState } from "react";
import LineHighlight from "./LineHighlight.jsx";
import FcfsNotifier from "./notifier";

import useScrollTransition from "@main/hooks/useScrollTransition.js";
import style from "./index.module.css";
import SpinningCarVideo from "./car-spin.webm";
import Pointer from "./pointer.svg";

function IntroSection() {
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const carYPosition = useRef({ top: 0, bottom: 10 });
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const titleOpacity = useScrollTransition({
    scrollStart: 0,
    scrollEnd: 500,
    valueStart: 1,
    valueEnd: 0,
  });

  const videoTimeline = useScrollTransition({
    scrollStart: carYPosition.current.top,
    scrollEnd: carYPosition.current.bottom,
    valueStart: 0,
    valueEnd: 2,
  });

  useEffect(() => {
    const introDOM = introRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsTimerVisible(false);
        } else {
          setIsTimerVisible(true);
        }
      });
    });

    if (introDOM) {
      observer.observe(introDOM);
    }

    return () => {
      if (introDOM) {
        observer.unobserve(introDOM);
      }
    };
  }, []);

  useEffect(() => {
    const videoDOM = videoRef.current;
    if (videoDOM) {
      const rect = videoDOM.getBoundingClientRect();
      carYPosition.current = {
        top: rect.top + rect.height * 0.5 - window.innerHeight,
        bottom: rect.top + rect.height * 0.5,
      };
    }
  }, []);

  useEffect(() => {
    videoRef.current.currentTime = videoTimeline;
  }, [videoTimeline]);

  return (
    <>
      <section ref={introRef} className="flex flex-col items-center">
        <div
          style={{ opacity: titleOpacity }}
          className="z-50 sticky w-full flex justify-center top-[50vh] -translate-y-1/2 pointer-events-none"
        >
          <h1
            className={`${style.openTitle} ease-in text-head-l md:text-7xl lg:text-8xl font-bold text-black z-50 text-center`}
          >
            The new <br className="inline min-[500px]:hidden" />
            <span className="max-[500px]:sketch-line">IONIQ 5</span>
          </h1>

          <div className="absolute hidden min-[500px]:block top-10 md:top-11 lg:top-[66px] z-0 overflow-hidden scale-[60%] md:scale-75 lg:scale-100">
            <LineHighlight />
          </div>
        </div>

        <div className="relative mt-[800px] flex flex-col items-center">
          <div className="overflow-hidden">
            <video
              src={SpinningCarVideo}
              ref={videoRef}
              className="w-full scale-[2.0] lg:scale-125 z-0 pointer-events-none select-none"
            />
          </div>

          <div className="font-bold flex flex-col items-center text-black absolute -bottom-20 lg:bottom-10 z-40">
            <span className="text-body-l sm:text-title-s">더뉴 아이오닉5 신차 출시 이벤트</span>

            <span className="text-center text-title-l sm:text-head-s">
              09/09 (mon) - 09/13 (fri)
            </span>
          </div>

          <div className="absolute -bottom-2 w-full h-4 bg-white" />
        </div>

        <img
          src={Pointer}
          alt="다음으로 넘어가기"
          className="pt-60 pb-40 animate-bounce"
          draggable="false"
        />
      </section>

      <FcfsNotifier visible={isTimerVisible} />
    </>
  );
}

export default IntroSection;
