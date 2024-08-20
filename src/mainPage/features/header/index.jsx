import scrollTo from "@main/scroll/scrollTo";
import { useSectionStore } from "@main/scroll/store";
import AuthButton from "@main/auth/AuthButton.jsx";
import HamburgerButton from "./Hamburger/Button.jsx";

import style from "./index.module.css";

export default function Header() {
  const currentSection = useSectionStore((state) => {
    return state.isVisibleList.findIndex((value) => value === true);
  });
  const scrollSectionList = ["추첨 이벤트", "차량 상세정보", "기대평", "선착순 이벤트"];

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

  const navItems = scrollSectionList.map((scrollSection, index) => (
    <li
      key={index}
      className={`w-20 lg:w-24 h-ful cursor-pointer ${currentSection - 1 === index ? "text-black" : "text-neutral-300"}`}
    >
      <button onClick={() => onClickScrollSection(index + 1)} className="flex justify-center items-center w-full h-full">{scrollSection}</button>
    </li>
  ))

  return (
    <nav className="sticky top-0 h-[60px] z-40 bg-white/[.36] backdrop-blur-xl flex justify-between px-6 lg:px-9 items-center font-bold select-none">
      <button onClick={gotoTop} className="text-black text-body-l cursor-pointer">
        The new IONIQ 5
      </button>

      <ul className="hidden md:flex h-full gap-4 lg:gap-8 text-body-s lg:text-body-m relative">
        {navItems}
        <div
          style={scrollDynamicStyle()}
          className={`w-20 lg:w-24 h-[3px] transition-transform ease-in-out-cubic duration-200 absolute bottom-0 left-0 ${currentSection > 0 ? style.moveBar : "hidden"}`}
        />
      </ul>
      <div className="hidden md:flex">
        <AuthButton />
      </div>
      <HamburgerButton>
        <div className="w-full px-6 py-2 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <ul className="flex flex-col sm:flex-row gap-4 lg:gap-8 text-body-s lg:text-body-m relative">
            {navItems}
          </ul>
          <AuthButton />
        </div>
      </HamburgerButton>
    </nav>
  );
}
