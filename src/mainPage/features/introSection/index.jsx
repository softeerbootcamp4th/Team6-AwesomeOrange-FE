import { useEffect, useRef, useState } from "react";
import LineHighlight from "./LineHighlight.jsx";
import FcfsNotifier from "./notifier";

import useScrollTransition from "@common/hooks/useScrollTransition.js";
import style from "./index.module.css";
import SpinningCarVideo from "./car-spin.webm";
import Pointer from "./pointer.svg";


function IntroSection() {
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const titleOpacity = useScrollTransition({
    scrollStart: 0,
    scrollEnd: 500,
    valueStart: 1,
    valueEnd: 0,
  });

  const videoTimeline = useScrollTransition({
    scrollStart: 400,
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

  return (
    <>
      <section ref={introRef} className="flex flex-col items-center">
        <div className="z-50 sticky w-full flex justify-center top-[50vh] -translate-y-1/2 pointer-events-none">
          <h1
            className={`${style.openTitle} ease-in text-head-l md:text-7xl lg:text-8xl font-bold text-black z-50 text-center`}
            style={titleStyle}
          >
            The new <br className="inline min-[500px]:hidden" />
            <span className="max-[500px]:sketch-line">IONIQ 5</span>
          </h1>

          <div
            className="absolute hidden min-[500px]:block top-10 md:top-11 lg:top-[66px] z-0 overflow-hidden scale-[60%] md:scale-75 lg:scale-100"
            style={titleStyle}
          >
            <LineHighlight />
          </div>
        </div>

        <div
          className="relative mt-[800px] flex flex-col items-center"
          style={videoStyle}
        >
          <div className="overflow-hidden">
            <video
              src={SpinningCarVideo}
              ref={videoRef}
              className="w-full scale-[2.0] lg:scale-110 z-0 pointer-events-none select-none"
            />
          </div>

          <div className="font-bold flex flex-col items-center text-black absolute bottom-10 z-40">
            <span className="text-title-s">
              더뉴 아이오닉5 신차 출시 이벤트
            </span>
            <span className="text-head-s">09/09 (mon) - 09/13 (fri)</span>
          </div>

          <div className="absolute -bottom-2 w-full h-4 bg-white" />
        </div>

        <img
          src={Pointer}
          alt="다음으로 넘어가기"
          className="pt-32 pb-32 animate-bounce"
        />
      </section>

      <FcfsNotifier visible={isTimerVisible} />
    </>
  );
}

export default IntroSection;
