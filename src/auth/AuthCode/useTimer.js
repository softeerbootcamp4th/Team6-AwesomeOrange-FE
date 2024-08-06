import { useState, useRef, useEffect, useCallback } from "react";
import IntervalController from "@/common/IntervalController.js";

function useTimer(remainTime) {
  const [timer, setTimer] = useState(remainTime);
  const intervalController = useRef(new IntervalController(1000));

  useEffect(() => {
    const ticker = intervalController.current;

    function decreaseTime() {
      setTimer((timer) => (timer > 0 ? timer - 1 : 0));
    }
    ticker.addEventListener("interval", decreaseTime);
    ticker.start();

    return () => {
      ticker.end();
      ticker.removeEventListener("interval", decreaseTime);
    };
  }, []);

  const resetTimer = useCallback(() => {
    setTimer(remainTime);
    intervalController.current.end();
    intervalController.current.start();
  }, [remainTime]);

  return [timer, resetTimer];
}

export default useTimer;
