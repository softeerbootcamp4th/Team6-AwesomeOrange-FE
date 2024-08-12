import { useState, useEffect } from "react";
import throttleRaf from "@common/throttleRaf.js";
import { clamp } from "@common/utils.js";

/**
 * 스크롤 트랜지션을 더 쉽게 사용할 수 있게 하는 커스텀 훅입니다.
 *
 * @param {number} scrollStart - 스크롤이 시작되는 위치입니다.
 * @param {number} scrollEnd - 스크롤이 종료되는 위치입니다.
 * @param {number} valueStart - 값의 시작 지점입니다.
 * @param {number} valueEnd - 값의 종료 지점입니다.
 *
 * @return {number} 실제로 변환된 값입니다.
 */
function useScrollTransition({ scrollStart, scrollEnd, valueStart, valueEnd }) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const scrollRenew = throttleRaf(() => setScroll(window.scrollY));
    document.addEventListener("scroll", scrollRenew);
    () => {
      document.removeEventListener("scroll", scrollRenew);
    };
  }, []);

  const ratio = clamp((scroll - scrollStart) / (scrollEnd - scrollStart), 0, 1);
  return ratio * (valueEnd - valueStart) + valueStart;
}

export default useScrollTransition;
