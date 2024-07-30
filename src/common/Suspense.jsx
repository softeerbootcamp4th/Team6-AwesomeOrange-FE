import { Suspense as ReactSuspense } from "react";
import ClientOnly from "./ClientOnly.jsx";

/**
 * react <Suspense />의 래퍼 컴포넌트입니다.
 * renderToString은 react suspense를 지원하지 않으므로, 빌드 시에는 폴백 컴포넌트가 렌더링되도 래퍼 컴포넌트를 이용했습니다.
 * 사용 방법은 리액트의 Suspense와 동일합니다.
 *
 * 출처 : https://toss.tech/article/faster-initial-rendering
 */
export default function Suspense({ children, fallback }) {
  return <ClientOnly fallback={fallback}>
    <ReactSuspense fallback={fallback}>{children}</ReactSuspense>
  </ClientOnly>;
}
