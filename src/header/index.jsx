import { useEffect, useRef, useState } from "react";
import style from "./index.module.css";

export default function Header() {
  const [scrollState, setScrollState] = useState(null);
  const [positionList, setPositionList] = useState([]);
  const scrollSectionList = [
    "추첨 이벤트",
    "차량 상세정보",
    "기대평",
    "선착순 이벤트",
  ];

  useEffect(() => {
    const browserHalfWidth = window.innerWidth / 2;
    const newPositionList = [browserHalfWidth - 224, browserHalfWidth - 96, browserHalfWidth + 32, browserHalfWidth + 160];

    setPositionList(newPositionList);
  }, [scrollState]);

  function gotoTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onClickScrollSection(index) {
    /*
     *  클릭시 하단의 다양한 영역으로 스크롤되는 코드 미작성
     */

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
    if (scrollState === null) return;
    const position = Math.floor(positionList[scrollState]);
    return {
      "--pos": position,
    };
  }

  return (
    <div className="sticky top-0 h-[60px] backdrop-blur-xl flex justify-center items-center font-bold select-none">
      <span onClick={gotoTop} className="absolute left-9 text-black text-body-l cursor-pointer">
        The new IONIQ 5
      </span>

      <div className="flex h-full gap-8 text-body-m">
        {scrollSectionList.map((scrollSection, index) => (
          <div
            key={index}
            onClick={() => onClickScrollSection(index)}
            className={`flex justify-center items-center w-24 cursor-pointer border border-red-500 ${scrollState === index ? "text-black" : "text-neutral-300"}`}
          >
            {scrollSection}
          </div>
        ))}

        <div
          style={scrollDynamicStyle()}
          className={`w-[50px] h-[3px] bg-black transition ease-in-out duration-200 absolute bottom-0 left-0 ${scrollState === null ? "hidden" : style.moveBar}`}
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
