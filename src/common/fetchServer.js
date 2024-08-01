const cacheMap = new Map();
const CACHE_DURATION = 1 * 1000;

function fetchServer(url, options={})
{
	const key = JSON.stringify({ url, options });
	if (cacheMap.has(key)) {
		const { promise, date } = cacheMap.get(key);
		if (Date.now() - date < CACHE_DURATION) return promise;
	}

	const fetchOptions = {...options};
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

export default fetchServer;