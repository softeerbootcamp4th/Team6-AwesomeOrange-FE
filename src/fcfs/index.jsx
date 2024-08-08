import { useRef } from "react";
import useSectionInitialize from "@/scroll/useSectionInitialize.js";
import { FCFS_SECTION } from "@/common/constants.js";
import CardGame from "./cardGame";

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
      <div>
      	<CardGame />
      </div>
    </section>
  );
}

export default FcfsSection;