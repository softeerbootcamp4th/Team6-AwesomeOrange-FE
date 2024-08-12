import scrollTo from "@main/scroll/scrollTo";
import { useSectionStore } from "@main/scroll/store";
import AuthButtonSection from "./AuthButtonSection.jsx";

import style from "./index.module.css";

export default function Header() {
  const currentSection = useSectionStore((state) => {
    return state.isVisibleList.findIndex((value) => value === true);
  });
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
    if (index !== currentSection) {
      scrollTo(index);
    }
  }

  function scrollDynamicStyle() {
    if (currentSection <= 0) return;
    return {
      "--section": currentSection,
    };
  }

  return (
    <nav className="sticky top-0 h-[60px] z-40 bg-white/[.36] backdrop-blur-xl flex justify-between px-6 lg:px-9 items-center font-bold select-none">
      <span onClick={gotoTop} className="text-black text-body-l cursor-pointer">
        The new IONIQ 5
      </span>

      <ul className="hidden md:flex h-full gap-4 lg:gap-8 text-body-s lg:text-body-m relative">
        {scrollSectionList.map((scrollSection, index) => (
          <li
            key={index}
            onClick={() => onClickScrollSection(index + 1)}
            className={`flex justify-center items-center w-20 lg:w-24 cursor-pointer ${currentSection - 1 === index ? "text-black" : "text-neutral-300"}`}
          >
            {scrollSection}
          </li>
        ))}

        <div
          style={scrollDynamicStyle()}
          className={`w-20 lg:w-24 h-[3px] transition-transform ease-in-out-cubic duration-200 absolute bottom-0 left-0 ${currentSection > 0 ? style.moveBar : "hidden"}`}
        />
      </ul>
      <div className="hidden md:flex">
        <AuthButtonSection />
      </div>
    </nav>
  );
}
