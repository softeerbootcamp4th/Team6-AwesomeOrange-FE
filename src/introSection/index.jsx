import useScrollTransition from "@/common/useScrollTransition.js";
import LineHighlight from "./LineHighlight.jsx";
import style from "./index.module.css";
import SpinningCarVideo from "./car-spin.mp4";
import Pointer from "./pointer.svg";
import { useEffect, useRef, useState } from "react";

function IntroSection() {
  const videoRef = useRef(null);
  const introRef = useRef(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  function onClickTimer() {
    /*
     *  타이머 클릭시 선착순 이벤트 섹션으로 이동하는 코드 미구현
     */
  }

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
      <div
        ref={introRef}
        className="h-[2160px] flex flex-col items-center"
      >
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
              className={`${style.video} scale-110 z-0 pointer-events-none select-none`}
            />
          </div>

          <div className="font-bold flex flex-col items-center text-black absolute bottom-10 z-40">
            <span className="text-title-s">
              더뉴 아이오닉5 신차 출시 이벤트
            </span>
            <span className="text-head-s">09/09 (mon) - 09/13 (fri)</span>
          </div>

          <div className="absolute -bottom-2 bg-white w-full h-4" />
        </div>

        <img
          src={Pointer}
          alt="다음으로 넘어가기"
          className="pt-[100px] animate-bounce"
        />
      </div>

      <div
        onClick={onClickTimer}
        className={`${isTimerVisible ? "-translate-y-24" : ""} -bottom-20 transition duration-150 ease-in-out fixed left-1/2 -translate-x-1/2 graphic-gradient rounded-full p-px shadow-[0_4px_12px_0px_rgba(0,0,0,0.25)] z-40 select-none`}
      >
        <div className=" bg-black flex items-center gap-[10px] px-10 py-4 rounded-full">
          <span className="text-body-m font-bold text-white">
            선착순 이벤트까지
          </span>
          <span className="font-ds-digital text-transparent text-[20px] bg-clip-text graphic-gradient font-bold">
            01 : 23 : 45
          </span>
        </div>
      </div>
    </>
  );
}

export default IntroSection;
