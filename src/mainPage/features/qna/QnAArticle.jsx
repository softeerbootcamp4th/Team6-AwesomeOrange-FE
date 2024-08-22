import { useState, useRef } from "react";
import arrow from "./assets/arrow.svg";

function QnAArticle({ question, answer }) {
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  function onClick() {
    if (!opened) {
      setVisible(true);
      clearTimeout(timeoutRef.current);
      requestAnimationFrame(() => setOpened(true));
    } else {
      setOpened(false);
      timeoutRef.current = setTimeout(() => setVisible(false), 200);
    }
  }
  const staticArticleStyle = `text-neutral-400 text-justify font-regular relative
  text-body-s md:text-body-m lg:text-body-l
	before:w-full before:h-full before-block before:absolute before:bg-white before:pointer-events-none
	before:scale-y-0 before:transition-transform before:duration-200 before:ease-linear before:origin-bottom`;
  const staticIconStyle = "size-[1.8181818em] transition-transform ease-in-out-cubic select-none";

  return (
    <article className="w-full max-w-[1200px] flex flex-col gap-4 md:gap-6 lg:gap-8 py-2 md:py-4 lg:py-6 border-b border-neutral-200">
      <button className="flex justify-between items-center cursor-pointer" onClick={onClick}>
        <h3 className="flex gap-2 lg:gap-3 font-bold text-black text-body-m lg:text-body-l">
          <span className="text-blue-400" aria-hidden="true">Q.</span>
          {question}
        </h3>
        <img
          className={`${staticIconStyle} ${opened ? "rotate-0" : "rotate-180"}`}
          src={arrow}
          alt={opened ? "닫기" : "열기"}
          draggable="false"
        />
      </button>
      <p
        className={`${staticArticleStyle} ${opened ? "before:scale-y-0" : "before:scale-y-100"} ${visible ? "block" : "hidden"}`}
      >
        {answer}
      </p>
    </article>
  );
}

export default QnAArticle;
