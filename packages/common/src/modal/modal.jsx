import { createContext, useCallback, useEffect, useState, useRef } from "react";
import useModalStore, { closeModal } from "./store.js";
import useFocusTrap from "./useFocusTrap.js";

export const ModalCloseContext = createContext(() => {
  console.log("모달이 닫힙니다.");
});

function Modal({ layer }) {
  const timeoutRef = useRef(null);
  const child = useModalStore(layer);
  const [opacity, setOpacity] = useState(0);
  const close = useCallback(() => {
    return new Promise((resolve) => {
      setOpacity(0);

      if (timeoutRef.current !== null) return resolve();
      timeoutRef.current = setTimeout(() => {
        closeModal(layer);
        resolve();
      }, 150);
    });
  }, [layer]);

  useEffect(() => {
    if (child !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      requestAnimationFrame(() => setOpacity(1));
    }
  }, [child]);

  useEffect(() => {
    if (child === null) return;

    function escHatch(e) {
      if (e.key !== "Escape") return;
      close();
      e.preventDefault();
    }
    document.addEventListener("keydown", escHatch);
    return () => document.removeEventListener("keydown", escHatch);
  }, [child, close]);

  const focusTrapRef = useFocusTrap(child !== null);

  return (
    <ModalCloseContext.Provider value={close}>
      {child !== null ? (
        <div
          className={`fixed z-[100] top-0 left-0 w-full h-dvh flex justify-center items-center transition-opacity ${opacity === 0 ? "opacity-0" : "opacity-100"}`}
          ref={focusTrapRef}
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
