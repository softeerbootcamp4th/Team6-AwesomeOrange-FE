import { useRef } from "react";
import CommentCarousel from "./commentCarousel";
import CommentForm from "./commentForm";
import useSectionInitialize from "@main/scroll/useSectionInitialize";
import decoration from "./assets/decoration.svg";

function CommentSection() {
  const SECTION_IDX = 3;
  const sectionRef = useRef(null);
  useSectionInitialize(SECTION_IDX, sectionRef);

  return (
    <section ref={sectionRef} className="w-full flex flex-col items-center py-24 lg:py-60 gap-40">
      <div className="w-full flex flex-col items-center">
        <div className="relative flex flex-col gap-3 lg:gap-9 text-center font-bold items-center">
          <p className="text-body-m text-neutral-600 w-fit py-3 lg:py-5">기대평 작성하기</p>
          <h2 className="text-head-s lg:text-head-m text-black">
            UNIQUE한 <br className="hidden sm:inline" />
            IONIQ 5의 <br className="inline sm:hidden" />
            <span className="sketch-line">기대평</span>을 남겨주세요
          </h2>
          <img
            src={decoration}
            alt=""
            role="presentation"
            className="size-20 lg:size-28 absolute -top-2 sm:top-4 lg:top-10 -left-2 sm:left-12"
          />
        </div>
        <p className="text-body-m sm:text-title-s text-neutral-800 font-medium mt-10">
          기대평을 등록하면 추첨 이벤트의 당첨 확률이 올라갑니다.
        </p>
        <CommentCarousel />
      </div>
      <CommentForm />
    </section>
  );
}

export default CommentSection;
