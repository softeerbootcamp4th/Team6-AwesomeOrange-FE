import style from "./index.module.css";
import scrollTo from "../scroll/scrollTo";
import { useSectionStore } from "../scroll/store";
import { useEffect, useState } from "react";

export default function Header() {
  const ITEM_WIDTH = 96; // w-24
  const ITEM_GAP = 32; // gap-8
  const isVisibleList = useSectionStore((state) => state.isVisibleList);
  const [currentSection, setCurrentSection] = useState(0);
  const scrollSectionList = [
    "추첨 이벤트",
    "차량 상세정보",
    "기대평",
    "선착순 이벤트",
  ];

  useEffect(() => {
    const idx = isVisibleList.findIndex((value) => value === true);
    setCurrentSection(idx);
  }, [isVisibleList]);

  function gotoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onClickScrollSection(index) {
    if (index !== currentSection) {
      scrollTo(index);
    }
  }

  function openVerifyModal() {
    /*
     *  본인인증 모달 여는 코드 미작성
     */
  }

  function scrollDynamicStyle() {
    if (currentSection > 0) {
      const position = Math.floor(
        ITEM_WIDTH / 4 + (currentSection - 1) * (ITEM_WIDTH + ITEM_GAP),
      );
      return {
        "--pos": position,
      };
    }
  }

  return (
    <div className="sticky top-0 h-[60px] z-40 bg-white/[.36] backdrop-blur-xl flex justify-center items-center font-bold select-none">
      <span
        onClick={gotoTop}
        className="absolute left-9 text-black text-body-l cursor-pointer"
      >
        The new IONIQ 5
      </span>

      <div className={`flex h-full gap-8 text-body-m relative`}>
        {scrollSectionList.map((scrollSection, index) => (
          <div
            key={index}
            onClick={() => onClickScrollSection(index + 1)}
            className={`flex justify-center items-center w-24 cursor-pointer ${currentSection - 1 === index ? "text-black" : "text-neutral-300"}`}
          >
            {scrollSection}
          </div>
        ))}

        <div
          style={scrollDynamicStyle()}
          className={`w-[50px] h-[3px] bg-black transition ease-in-out duration-200 absolute bottom-0 left-0 ${currentSection > 0 ? style.moveBar : "hidden"}`}
        />
      </div>

      <button
        onClick={openVerifyModal}
        className="absolute right-[46px] bg-blue-400 text-white text-body-s py-3 px-4"
      >
        본인인증하기
      </button>
    </div>
  );
}
