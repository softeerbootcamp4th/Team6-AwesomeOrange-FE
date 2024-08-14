import { useSyncExternalStore, useDeferredValue } from "react";
import use from "./use.js";

const queryMap = new Map();
const queryObservers = new Map();
const CACHE_DURATION = 10 * 60 * 1000;

function subscribeQuery(key) {
  return (callback) => {
    if (!queryObservers.has(key)) queryObservers.set(key, new Set());
    const set = queryObservers.get(key);
    set.add(callback);

    return () => {
      const set = queryObservers.get(key);
      set.delete(callback);
      if (set.size === 0) queryObservers.delete(key);
    };
  };
}

function updateSubscribedQuery(key) {
  queryMap.delete(key);
  if (!queryObservers.has(key)) return;
  queryObservers.get(key).forEach((callback) => callback());
}

function isSame(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, i) => value === arr2[i]);
}

export function getQuery(key, promiseFn, dependencyArray = []) {
  if (queryMap.has(key)) {
    const { promise, depArr } = queryMap.get(key);
    if (isSame(depArr, dependencyArray)) return promise;
  }
  const promise = promiseFn();
  queryMap.set(key, { promise, depArr: dependencyArray });
  setTimeout(() => queryMap.delete(key), CACHE_DURATION);
  return promise;
}

export function useQuery(key, promiseFn, config = {}) {
  let _config = { dependencyArray: [] };
  if (Array.isArray(config)) _config.dependencyArray = config;
  else _config = Object.assign(_config, config);

  const query = useSyncExternalStore(subscribeQuery(key), () =>
    getQuery(key, promiseFn, _config.dependencyArray),
  );
  const deferredQuery = useDeferredValue(query);

  if (_config.deferred) return use(deferredQuery);
  return use(query);
}

export function useMutation(key, promiseFn, { onSuccess, onError } = {}) {
  return async () => {
    try {
      const value = await promiseFn();
      updateSubscribedQuery(key);
      onSuccess?.(value);
    } catch (e) {
      onError?.(e);
      if (onError === undefined) throw e;
    }
  };
}

export function getQuerySuspense(key, promiseFn, dependencyArray = []) {
  return use(getQuery(key, promiseFn, dependencyArray));
}
