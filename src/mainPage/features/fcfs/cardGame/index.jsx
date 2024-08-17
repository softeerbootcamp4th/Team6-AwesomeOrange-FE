import { useDeferredValue } from "react";
import Suspense from "@common/components/Suspense.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";
import useFcfsStore from "@main/realtimeEvent/store.js";
import useAuthStore from "@main/auth/store.js";
import CardGame from "./CardGame.jsx";
import CardGameSkeleton from "./CardGameSkeleton.jsx";

function CardGameInitializer() {
  const getData = useFcfsStore((store) => store.getData);
  getData();
  return <CardGame />;
}

function CardGamePariticipatedInitializer() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const defferedLogin = useDeferredValue(isLogin);
  const getPariticipatedData = useFcfsStore((store) => store.getPariticipatedData);
  getPariticipatedData(defferedLogin);
  return null;
}

function CardGameSection() {
  return (
    <ErrorBoundary fallback={<CardGame offline />}>
      <Suspense fallback={<CardGameSkeleton />}>
        <CardGameInitializer />
        <CardGamePariticipatedInitializer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default CardGameSection;
