import { useDeferredValue } from "react";
import Suspense from "@/common/Suspense.jsx";
import ErrorBoundary from "@/common/ErrorBoundary.jsx";
import useFcfsStore from "../store.js";
import useAuthStore from "@/auth/store.js";
import CardGame from "./CardGame.jsx";

function CardGameInitializer() {
  const getData = useFcfsStore((store) => store.getData);
  getData();
  return <CardGame />;
}

function CardGamePariticipatedInitializer() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const defferedLogin = useDeferredValue(isLogin);
  const getPariticipatedData = useFcfsStore(
    (store) => store.getPariticipatedData,
  );
  getPariticipatedData(defferedLogin);
  return null;
}

function CardGameSection() {
  return (
    <ErrorBoundary fallback={<div>에러남</div>}>
      <Suspense fallback={<div>로딩중</div>}>
        <CardGameInitializer />
        <CardGamePariticipatedInitializer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default CardGameSection;
