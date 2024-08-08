import tokenSaver from "@/auth/tokenSaver.js";

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

function fetchServer(url, options = {}) {
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
      if (e instanceof TypeError && e.message === "Failed to fetch") {
        throw new ServerCloseError();
      }
      throw e;
    });

  return promise;
}

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
