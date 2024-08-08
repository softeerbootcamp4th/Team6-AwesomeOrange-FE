import use from "./use.js";

const queryMap = new Map();
const CACHE_DURATION = 10 * 60 * 1000;

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

export function useQuery(key, promiseFn, dependencyArray = []) {
  return use(getQuery(key, promiseFn, dependencyArray));
}

export const getQuerySuspense = useQuery;
