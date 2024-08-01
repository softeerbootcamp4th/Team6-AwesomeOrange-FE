import { useCallback, useRef } from "react";

//출처: https://joonfluence.tistory.com/657 [인생은 속도가 아니라 방향이다:티스토리]
//이 코드를 작성해주신 Joonfluence님께 무한한 감사를 드립니다. 덕분에 저희의 코딩속도가 빨라졌어요
export default function useBodyScrollLock() {
  const scrollPosition = useRef(0);
  const lockScroll = useCallback(() => {
    // for IOS safari
    scrollPosition.current = window.pageYOffset;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition.current}px`;
    document.body.style.width = "100%";
  }, []);

  const openScroll = useCallback(() => {
    // for IOS safari
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    window.scrollTo(0, scrollPosition.current);
  }, []);

  return { lockScroll, openScroll };
}
