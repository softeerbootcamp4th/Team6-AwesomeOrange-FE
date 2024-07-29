import useScrollTransition from "@/common/useScrollTransition.js";
import vector from "./vector.svg";
import style from "./index.module.css";

function IntroSection() {
  const titleOpacity = useScrollTransition({
    scrollStart: 0,
    scrollEnd: 500,
    valueStart: 1,
    valueEnd: 0,
  });

  const titleStyle = {
    opacity: titleOpacity,
  };

  return (
    <div className="h-[2160px]">
      <div className="pointer-events-none fixed w-full flex justify-center top-[500px] -translate-y-1/2">
        <h1
          className={`${style.openTitle} ease-in text-8xl z-50`}
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
          ></div>
        </div>
      </div>
    </div>
  );
}

export default IntroSection;
