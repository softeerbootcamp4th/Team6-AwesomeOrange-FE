import { useEffect, useRef } from "react";

function getEndPointChild(element) {
  const focusableElements = [
    ...element.querySelectorAll(
      "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",
    ),
  ].filter((elem) => elem.tabIndex >= 0);
  if (focusableElements.length === 0) return [null, null];
  return [focusableElements[0], focusableElements[focusableElements.length - 1]];
}

function useFocusTrap(active) {
  const prevRef = useRef(null);
  const ref = useRef(null);
  const endPointChild = useRef([null, null]);
  useEffect(() => {
    if (!active || ref.current === null) return;

    function renewEndPointChild() {
      if (ref.current === null) return;
      endPointChild.current = getEndPointChild(ref.current);
    }

    function handleTabKey(e) {
      if (e.key !== "Tab") return;

      const [first, last] = endPointChild.current;

      if (document.activeElement === prevRef.current) {
        if (e.shiftKey) last?.focus();
        else first?.focus();
        e.preventDefault();
        return;
      }

      if (first === null || last === null) return;
      if (document.activeElement === last && !e.shiftKey) {
        first.focus();
        e.preventDefault();
      } else if (document.activeElement === first && e.shiftKey) {
        last.focus();
        e.preventDefault();
      }
    }

    renewEndPointChild();
    prevRef.current = document.activeElement;
    document.addEventListener("keydown", handleTabKey);
    const config = { subtree: true, childList: true, attributeFilter: ["disabled", "tabindex"] };
    const observer = new MutationObserver(renewEndPointChild);
    observer.observe(ref.current, config);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
      observer.disconnect();
      prevRef.current.focus();
    };
  }, [active]);

  return ref;
}

export default useFocusTrap;
