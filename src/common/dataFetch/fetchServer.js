import tokenSaver from "./tokenSaver.js";

class HTTPError extends Error {
  constructor(response) {
    super(response.status + " " + response.statusText);
    this.status = response.status;
    this.response = response;
    this.data = null;
  }
}

class ServerCloseError extends Error {
  constructor() {
    super("Server Closed");
  }
}

// fetchServer의 옵션을 생성합니다.
function createFetchOptions(options = {}) {
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
  if (tokenSaver.has()) {
    fetchOptions.headers = {
      ...(fetchOptions.headers ?? {}),
      Authorization: `Bearer ${tokenSaver.get()}`,
    };
  }

  return fetchOptions;
}

// 기본적인 fetchServer의 동작을 수행합니다.
async function fetchServerBase(url, options = {}) {
  try {
    const response = await fetch(url, createFetchOptions(options));
    if (response.status >= 400 && response.status <= 599)
      throw new HTTPError(response);
    const text = await response.text();
    if(text === "") return null;
    return JSON.parse(text);
  } catch (e) {
    if (e instanceof TypeError && e.message === "Failed to fetch") {
      throw new ServerCloseError();
    }
    throw e;
  }
}

// fetchServer의 동작을 수행한 뒤, 미들웨어를 차례대로 실행시킵니다.
async function fetchServer(url, options = {}) {
  let promise = fetchServerBase(url, options);
  if (fetchServer.middlewares.size === 0) return promise;

  let shouldProgress = false;
  const next = () => (shouldProgress = true);

  for (let middleware of fetchServer.middlewares) {
    try {
      const value = await promise;
      promise = (async () => {
        const result = await middleware({ value }, next);
        return result ?? value;
      })();
      if (!shouldProgress) return value;
    } catch (error) {
      promise = (async () => {
        const result = await middleware({ error }, next);
        if (result !== undefined && result !== null) return result;
        throw error;
      })();
      if (!shouldProgress) throw error;
    }

    shouldProgress = false;
  }

  return promise;
}

// 미들웨어를 등록시키고 제거합니다.
fetchServer.middlewares = new Set();
fetchServer.use = function (middleware) {
  fetchServer.middlewares.add(middleware);
};
fetchServer.unuse = function (middleware) {
  fetchServer.middlewares.delete(middleware);
};

function handleError(errorDescriptor) {
  return (error) => {
    if (error instanceof HTTPError) {
      throw new Error(
        errorDescriptor[error.status] ??
          errorDescriptor.http ??
          "서버와의 통신 중 오류가 발생했습니다.",
      );
    }
    if (error instanceof ServerCloseError) {
      if (errorDescriptor.offlineFallback !== undefined)
        return errorDescriptor.offlineFallback;
      throw new Error(errorDescriptor.offline ?? "서버가 닫혔습니다.");
    }
    console.error(error);
    throw new Error("알 수 없는 오류입니다. 프론트엔드 개발자에게 제보하세요.");
  };
}

export { fetchServer, handleError, HTTPError, ServerCloseError };
