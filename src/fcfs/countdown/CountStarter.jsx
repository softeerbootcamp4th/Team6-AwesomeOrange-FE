import { useEffect, useRef } from "react";
import useFcfsStore from "../store.js";
import { OFFLINE } from "../constants.js";
import CountdownController from "./CountdownController";
import Suspense from "@/common/Suspense.jsx";
import ErrorBoundary from "@/common/ErrorBoundary.jsx";

function CountStarterDummy() {
  const controller = useRef(new CountdownController(0, 0));
  const getData = useFcfsStore((store) => store.getData);
  const currentServerTime = useFcfsStore((store) => store.currentServerTime);
  const currentEventTime = useFcfsStore((store) => store.currentEventTime);
  const eventStatus = useFcfsStore((store) => store.eventStatus);
  const handleCountdown = useFcfsStore((store) => store.handleCountdown);

  getData();

  useEffect(() => {
    if(eventStatus === OFFLINE) return;

    controller.current = new CountdownController(
      currentServerTime,
      currentEventTime,
    );
    const counter = controller.current;
    counter.addEventListener("interval", handleCountdown);
    counter.start();

    return () => {
      counter.removeEventListener("interval", handleCountdown);
      counter.end();
    };
  }, [currentServerTime, currentEventTime, handleCountdown, eventStatus]);

  return null;
}

function CountStarter() {
  return (
    <ErrorBoundary>
      <Suspense>
        <CountStarterDummy />
      </Suspense>
    </ErrorBoundary>
  );
}

export default CountStarter;
