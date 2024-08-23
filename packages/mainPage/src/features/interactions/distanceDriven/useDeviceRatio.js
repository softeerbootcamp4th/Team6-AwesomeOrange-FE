import { useState, useEffect } from "react";
import throttleRaf from "@common/throttleRaf.js";

function useDeviceRatio() {
  const [ratio, setRatio] = useState(1);
  useEffect(() => {
    setRatio(Math.hypot(window.innerWidth, window.innerHeight) / 2);
    const onResize = throttleRaf(() => {
      setRatio(Math.hypot(window.innerWidth, window.innerHeight) / 2);
    });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return ratio;
}

export default useDeviceRatio;
