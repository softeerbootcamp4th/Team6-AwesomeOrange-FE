import DetailSwiper from "./DetailSwiper.jsx";
import content from "./content.json";
import decoration from "./assets/decoration.svg";
import { useRef } from "react";
import useSectionInitialize from "@main/scroll/useSectionInitialize.js";

function DetailInformation() {
  const SECTION_IDX = 2;
  const sectionRef = useRef(null);
  useSectionInitialize(SECTION_IDX, sectionRef);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center py-24 lg:py-60 gap-16 lg:gap-40"
    >
      <div className="relative flex flex-col gap-3 lg:gap-9 text-center font-bold items-center">
        <p className="text-body-m text-neutral-600 w-fit py-3 lg:py-5">차량 상세 정보</p>
        <h2 className="text-head-s lg:text-head-m text-black">
          The new IONIQ 5<br />
          전기차의 <span className="sketch-line">ICON</span>이 되다.
        </h2>
        <img
          src={decoration}
          alt="glitter"
          className="size-10 lg:size-14 absolute top-8 lg:top-16 right-0 min-[360px]:-right-3 lg:-right-4"
        />
      </div>
      <DetailSwiper content={content} />
    </section>
  );
}

export default DetailInformation;
