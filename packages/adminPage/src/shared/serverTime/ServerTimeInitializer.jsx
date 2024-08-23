import useServerTime from "./store.js";
import Suspense from "@common/components/Suspense.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";

function ServerTimeInitializerInternal() {
  const getData = useServerTime((store) => store.getData);
  getData();
  return null;
}

function ServerTimeInitializer() {
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <ServerTimeInitializerInternal />
      </Suspense>
    </ErrorBoundary>
  );
}

export default ServerTimeInitializer;
