import { createContext, useCallback, useEffect, useState, useRef } from "react";
import useBodyScrollLock from "./useBodyScrollLock.js";
import useModalStore, { closeModal } from "./store.js";

export const ModalCloseContext = createContext(() => {
  console.log("모달이 닫힙니다.");
});

function Modal({ layer }) {
  const timeoutRef = useRef(null);
  const child = useModalStore(layer);
  const [opacity, setOpacity] = useState(0);
  const { lockScroll, openScroll } = useBodyScrollLock();
  const close = useCallback(() => {
    setOpacity(0);
    openScroll();
    if (timeoutRef.current === null)
      timeoutRef.current = setTimeout(() => closeModal(layer), 150);
  }, [layer, openScroll]);

  useEffect(() => {
    if (child !== null) {
      lockScroll();
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      requestAnimationFrame(() => setOpacity(1));
    }
  }, [child, lockScroll]);

  return (
    <ModalCloseContext.Provider value={close}>
      {child !== null ? (
        <div
          className={`fixed z-[100] top-0 left-0 w-full h-dvh flex justify-center items-center transition-opacity ${opacity === 0 ? "opacity-0" : "opacity-100"}`}
        >
          {child}
          <div
            className="absolute w-full h-full top-0 left-0 bg-black/60 -z-10"
            onClick={close}
          ></div>
        </div>
      ) : null}
    </ModalCloseContext.Provider>
  );
}

export default Modal;