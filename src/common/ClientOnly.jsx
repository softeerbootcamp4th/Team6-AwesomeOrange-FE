import { useSyncExternalStore, useEffect } from "react";

const mountedStore = {
  mounted: false,
  listeners: new Set(),
  mount() {
    mountedStore.mounted = true;
    mountedStore.listeners.forEach( listener=>listener() );
  },
  subscribe(listener) {
    mountedStore.listeners.add(listener);
    return ()=>mountedStore.listeners.delete(listener);
  },
  getSnapshot() {
    return mountedStore.mounted;
  }
}

/**
 * react 클라이언트 only 래퍼 입니다.
 * 이 래퍼 컴포넌트는 클라이언트에서만 필요한 동작이 필요할 때, SSR시와 하이드레이션시 반환한 함수가 
 * 동일한 폴백 엘리먼트를 렌더링하도록 보장합니다.
 */
export default function ClientOnly({ children, fallback }) {
  const mounted = useSyncExternalStore(mountedStore.subscribe, mountedStore.getSnapshot, ()=>false);
  useEffect(() => {
    mountedStore.mount();
  }, []);

  if (!mounted) return fallback;
  return children;
}
