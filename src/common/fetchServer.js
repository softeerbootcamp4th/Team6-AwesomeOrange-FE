import wrapPromise from "./wrapPromise.js";

const cacheMap = new Map();
const CACHE_DURATION = 0.2 * 1000;

function fetchServer(url, options={})
{
	const key = JSON.stringify({ url, options });
	if (cacheMap.has(key)) {
		const { promise, date } = cacheMap.get(key);
		if (Date.now() - date < CACHE_DURATION) return promise;
	}

	// 기본적으로 옵션을 그대로 가져오지만, body가 존재하고 header.content-type을 설정하지 않는다면 
	// json으로 간주하여 option을 생성합니다.
	const fetchOptions = {...options};
	fetchOptions.method = (options.method ?? "get").toUpperCase();
	if((options.body !== undefined || options.body !== null) && 
		(options.headers?.["Content-Type"] === undefined || 
		options.headers["Content-Type"] === "application/json")) {
		fetchOptions.headers = {...(fetchOptions?.headers ?? {}), "Content-Type": "application/json"};
		fetchOptions.body = JSON.stringify(options.body);
	}

	const promise = fetch(url, fetchOptions).then( e=>e.json() );
	cacheMap.set(key, { promise, date: Date.now() });

	return promise;
}

function fetchResource(url)
{
	return wrapPromise( fetchServer(url) );
}

export {fetchServer, fetchResource};