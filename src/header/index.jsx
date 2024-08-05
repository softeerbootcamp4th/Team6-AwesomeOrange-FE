import { useState } from "react";
import style from "./index.module.css";
import scrollTo from "../scroll/scrollTo";

export default function Header() {
  const ITEM_WIDTH = 96; // w-24
  const ITEM_GAP = 32; // gap-8
  const [scrollState, setScrollState] = useState(-1);
  const scrollSectionList = [
    "추첨 이벤트",
    "차량 상세정보",
    "기대평",
    "선착순 이벤트",
  ];

  function gotoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onClickScrollSection(index) {
    scrollTo(index);
    if (index !== scrollState) {
      setScrollState(index);
    }
  }

  function openVerifyModal() {
    /*
     *  본인인증 모달 여는 코드 미작성
     */
  }

  function scrollDynamicStyle() {
    if (scrollState < 0) return;

    const position = Math.floor(
      ITEM_WIDTH / 4 + scrollState * (ITEM_WIDTH + ITEM_GAP),
    );
    return {
      "--pos": position,
    };
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
            onClick={() => onClickScrollSection(index)}
            className={`flex justify-center items-center w-24 cursor-pointer ${scrollState === index ? "text-black" : "text-neutral-300"}`}
          >
            {scrollSection}
          </div>
        ))}

        <div
          style={scrollDynamicStyle()}
          className={`w-[50px] h-[3px] bg-black transition ease-in-out duration-200 absolute bottom-0 left-0 ${scrollState < 0 ? "hidden" : style.moveBar}`}
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
