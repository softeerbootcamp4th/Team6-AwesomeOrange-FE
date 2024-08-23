import { useRef } from "react";
import useSectionInitialize from "@main/scroll/useSectionInitialize.js";
import { FCFS_SECTION } from "@main/scroll/constants.js";
import CardGame from "./cardGame";
import CountStarter from "./countdown/CountStarter.jsx";
import FcfsDescription from "./description";

function FcfsSection() {
  const sectionRef = useRef(null);
  useSectionInitialize(FCFS_SECTION, sectionRef);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center bg-black py-24 lg:py-60 gap-16 lg:gap-30 px-6"
    >
      <div className="relative w-full max-w-[1200px] flex flex-col gap-3 lg:gap-9 text-center font-bold items-center">
        <p className="text-body-m text-neutral-200 w-fit py-1 lg:py-5 border-b-2 border-neutral-200">
          EVENT 2
        </p>
        <h2 className="text-head-s lg:text-head-m w-80 md:w-full text-white">
          가득찬 배터리 카드를 찾으면 경품은 나의 것!
        </h2>
      </div>
      <div className="w-full max-w-[1200px] flex flex-col justify-center items-center gap-10">
        <CardGame />
        <p className="text-body-s md:text-body-m lg:text-body-l text-neutral-200 font-medium">
          ※ 개인정보 인증 후 참여할 수 있습니다.
        </p>
        <FcfsDescription />
      </div>
      <CountStarter />
    </section>
  );
}

export default FcfsSection;
