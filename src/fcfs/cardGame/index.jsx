import Suspense from "@/common/Suspense.jsx";
import ErrorBoundary from "@/common/ErrorBoundary.jsx";
import useFcfsStore from "../store.js";
import CardGame from "./CardGame.jsx";

function CardGameInitializer() {
  const getData = useFcfsStore((store) => store.getData);

  getData();

  return <CardGame/>;
}

function CardGameSection() {
  return (
    <ErrorBoundary fallback={<div>에러남</div>}>
      <Suspense fallback={<div>로딩중</div>}>
        <CardGameInitializer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default CardGameSection;
