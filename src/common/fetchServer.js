import wrapPromise from "./wrapPromise.js";
import tokenSaver from "@/auth/tokenSaver.js";

const cacheMap = new Map();
const CACHE_DURATION = 0.2 * 1000;

class HTTPError extends Error {
  constructor(response) {
    super(response.status + " " + response.statusText);
    this.status = response.status;
    this.response = response;
    this.data = null;
  }
}

function fetchServer(url, options = {}) {
  const key = JSON.stringify({ url, options });
  if (cacheMap.has(key)) {
    const { promise, date } = cacheMap.get(key);
    if (Date.now() - date < CACHE_DURATION) return promise;
  }

  // 기본적으로 옵션을 그대로 가져오지만, body가 존재하고 header.content-type을 설정하지 않는다면
  // json으로 간주하여 option을 생성합니다.
  const fetchOptions = { ...options };
  fetchOptions.method = (options.method ?? "get").toUpperCase();
  if (
    (options.body !== undefined || options.body !== null) &&
    (options.headers?.["Content-Type"] === undefined ||
      options.headers["Content-Type"] === "application/json")
  ) {
    fetchOptions.headers = {
      ...(fetchOptions.headers ?? {}),
      "Content-Type": "application/json",
    };
    fetchOptions.body = JSON.stringify(options.body);
  }
  
  // token이 존재한다면, 토큰을 요청할 때 끼워넣습니다.
  if(tokenSaver.has()) {
    fetchOptions.headers = {
      ...(fetchOptions.headers ?? {}),
      Authorization: `Bearer ${tokenSaver.get()}`
    }
  }

  const promise = fetch(url, fetchOptions)
    .then((e) => {
      if (e.status >= 400 && e.status <= 599) throw new HTTPError(e);
      return e;
    })
    .then((e) => e.json())
    .catch(async (e) => {
      if (e instanceof HTTPError) {
        e.data = await e.response.json();
      }
      throw e;
    });
  cacheMap.set(key, { promise, date: Date.now() });

  return promise;
}

function fetchResource(url) {
  return wrapPromise(fetchServer(url));
}

export { fetchServer, fetchResource, HTTPError };
