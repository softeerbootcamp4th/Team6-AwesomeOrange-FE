import { useState, useEffect, useRef } from "react";

function useSwiperState() {
  const [swiperState, setSwiperState] = useState(0);
  const swiperElRef = useRef(null);
  useEffect(() => {
    if (swiperElRef.current === null) return;

    const swiperEl = swiperElRef.current;
    function onSlideChange(e) {
      setSwiperState(e.detail[0].realIndex);
    }
    swiperEl.addEventListener("swiperslidechange", onSlideChange);

    return () =>
      swiperEl.removeEventListener("swiperslidechange", onSlideChange);
  }, []);

  return [swiperState, swiperElRef];
}

export default useSwiperState;
