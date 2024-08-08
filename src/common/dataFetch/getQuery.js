import use from "./use.js";

const queryMap = new Map();
const CACHE_DURATION = 10 * 60 * 1000;

export function getQuery(key, promiseFn) {
	if(queryMap.has(key)) return queryMap.get(key);
	const promise = promiseFn();
	queryMap.set(key, promise);
	setTimeout(()=>queryMap.delete(key), CACHE_DURATION);
	return promise;
}

export function useQuery(key, promiseFn) {
	return use(getQuery(key, promiseFn));
}

export const getQuerySuspense = useQuery;