import { useEffect, useRef, useState } from "react";
import style from "./contentSection.module.css";

export default function ContentSection({ content }) {
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const contentDOM = contentRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // 애니메이션 실행 후 옵저버 중지
          }
        });
      },
      {
        threshold: 0.8, // 80%가 보일 때 실행
      },
    );

    if (contentDOM) {
      observer.observe(contentDOM);
    }

    // 클린업 함수
    return () => {
      if (contentDOM) {
        observer.unobserve(contentDOM);
      }
    };
  }, []);

  const highlightDynamicStyle = {
    "--progress": isHighlighted ? "100%" : "0%",
  };

  return (
    <div
      ref={contentRef}
      onAnimationEnd={() => setIsHighlighted(true)}
      className={`${isVisible ? style.fadeIn : "opacity-0"} z-0 flex flex-col font-bold`}
    >
      <img src={content.src} className="w-full" />

      <span className="pt-10 text-body-l text-neutral-800">
        {content.title}
      </span>

      <div className="pt-3 flex justify-between items-end">
        <div>
          {content.desc.map((str, index) => (
            <span
              key={index}
              style={highlightDynamicStyle}
              className={`${index % 2 ? style.highlightAnim : "text-neutral-800"} text-title-m whitespace-pre-wrap`}>
              {str}
            </span>))}
        </div>

        <span className="absoulte top-0 right-0 text-body-s text-neutral-300">
          {content.sub}
        </span>
      </div>
    </div>
  );
}
