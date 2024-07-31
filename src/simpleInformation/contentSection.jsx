import { useEffect, useRef, useState } from "react";
import style from "./contentSection.module.css";

export default function ContentSection({ content }) {
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    // 클린업 함수
    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className={`${isVisible ? style.fadeIn : "opacity-0"} flex flex-col font-bold`}
    >
      <img src={content.src} className="w-full" />

      <span className="pt-10 text-body-l text-neutral-800">
        {content.title}
      </span>

      <div className="pt-3 flex justify-between items-end">
        <span className="whitespace-pre-wrap text-title-m text-neutral-800">
          {content.desc}
        </span>

        <span className="absoulte top-0 right-0 text-body-s text-neutral-300">
          {content.sub}
        </span>
      </div>
    </div>
  );
}
