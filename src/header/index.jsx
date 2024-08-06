import style from "./index.module.css";
import scrollTo from "../scroll/scrollTo";
import { useSectionStore } from "../scroll/store";
import openModal from "@/modal/openModal.js";
import AuthModal from "@/auth/AuthModal.jsx";
import WelcomeModal from "@/auth/Welcome";

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
  const welcomeModal = <WelcomeModal />;
  const authModal = (
    <AuthModal
      onComplete={(isFreshMember) => isFreshMember && openModal(welcomeModal)}
    />
  );

  function gotoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onClickScrollSection(index) {
    if (index !== currentSection) {
      scrollTo(index);
    }
  }

  function openVerifyModal() {
    openModal(authModal);
  }

  function scrollDynamicStyle() {
    if (currentSection <= 0) return;
    return {
      "--section": currentSection,
    };
  }

  return (
    <div className="sticky top-0 h-[60px] z-40 bg-white/[.36] backdrop-blur-xl flex justify-center items-center font-bold select-none">
      <span
        onClick={gotoTop}
        className="absolute left-6 lg:left-9 text-black text-body-l cursor-pointer"
      >
        The new IONIQ 5
      </span>

      <div
        className={`hidden md:flex h-full gap-4 lg:gap-8 text-body-s lg:text-body-m relative`}
      >
        {scrollSectionList.map((scrollSection, index) => (
          <div
            key={index}
            onClick={() => onClickScrollSection(index + 1)}
            className={`flex justify-center items-center w-20 lg:w-24 cursor-pointer ${currentSection - 1 === index ? "text-black" : "text-neutral-300"}`}
          >
            {scrollSection}
          </div>
        ))}

        <div
          style={scrollDynamicStyle()}
          className={`w-20 lg:w-24 h-[3px] transition-transform ease-in-out-cubic duration-200 absolute bottom-0 left-0 ${currentSection > 0 ? style.moveBar : "hidden"}`}
        />
      </div>

      <button
        onClick={openVerifyModal}
        className="hidden md:block absolute right-6 lg:right-[2.875rem] bg-blue-400 text-white text-body-s py-3 px-4"
      >
        본인인증하기
      </button>
    </div>
  );
}
