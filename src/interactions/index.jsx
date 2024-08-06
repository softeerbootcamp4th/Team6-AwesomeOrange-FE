import { useRef, useState } from "react";
import useSectionInitialize from "../scroll/useSectionInitialize";
import IntroductionDetail from "./IntroductionDetail";
import GiftDetail from "./GiftDetail";
import JSONData from "./content.json";
import TarBar from "./TabBar";

export default function InteractionPage() {
  const SECTION_IDX = 1;
  const sectionRef = useRef(null);
  const [currentInteraction, setCurrentInteraction] = useState(0);
  useSectionInitialize(SECTION_IDX, sectionRef);

  const isJoinedList = [1, 0, 0, 1, -1];

  return (
    <section
      ref={sectionRef}
      className="bg-black py-60 flex flex-col items-center"
    >
      <TarBar
        currentInteraction={currentInteraction}
        setCurrentInteraction={setCurrentInteraction}
        isJoinedList={isJoinedList}
      />

      <div className="h-[456px] w-[500px] border border-white flex justify-center items-center text-white">
        인터랙션
      </div>

      <div className="pt-32 flex flex-col xl:flex-row gap-[140px]">
        <IntroductionDetail contentList={JSONData.howto} />
        <GiftDetail contentList={JSONData.gift} />
      </div>
    </section>
  );
}
