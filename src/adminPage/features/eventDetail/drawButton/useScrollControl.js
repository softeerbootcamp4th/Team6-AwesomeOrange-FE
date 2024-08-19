import { useState, useRef, useCallback, useEffect } from "react";
import { KVMap } from "@common/utils.js";

function useScrollControl() {
  const [intersectState, setIntersectState] = useState(1);
  const hullRef = useRef(null);
  const itemRef = useRef(null);
  const observedTargetRef = useRef([]);
  const observerRef = useRef(null);
  function getMap() {
    if (itemRef.current === null) itemRef.current = new KVMap();
    return itemRef.current;
  }

  const mountMap = useCallback((ref, key) => {
    const map = getMap();
    if (ref) {
      map.set(key, ref);
      observerRef.current?.observe(ref);
    } else {
      const prevRef = map.getWithKey(key);
      if (prevRef instanceof Element) observerRef.current?.unobserve(prevRef);
      map.deleteWithKey(key);
    }
  }, []);

  const scrollTo = useCallback((key) => {
    const map = getMap();
    if (!map.hasKey(key)) return;
    map.getWithKey(key).scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const map = getMap();
        entries.forEach((entry) => {
          const key = map.getWithValue(entry.target);
          observedTargetRef.current[key] = entry.isIntersecting;
        });
        const nextState = observedTargetRef.current.findIndex(
          (isIntersect) => isIntersect === true,
        );
        setIntersectState(nextState);
      },
      { root: hullRef.current ?? null, threshold: 0.01 },
    );
    for (let [, elem] of itemRef.current) {
      observerRef.current.observe(elem);
    }

    return () => {
      observerRef.current.disconnect();
    };
  }, []);

  return {
    hullRef,
    mountMap,
    scrollTo,
    intersectState,
  };
}

export default useScrollControl;
