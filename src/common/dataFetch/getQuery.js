import { useSyncExternalStore, useDeferredValue } from "react";
import use from "./use.js";
import {GroupMap} from "@common/utils.js";

const queryMap = new Map();
const queryGroupMap = new GroupMap();
const queryObservers = new GroupMap();
const CACHE_DURATION = 10 * 60 * 1000;

function subscribeQuery(key) {
  const groupKey = key.split("@")[0];
  return (callback) => {
    queryObservers.set(groupKey, callback);

    return () => {
      queryObservers.delete(groupKey, callback);
    };
  };
}

function updateSubscribedQuery(key) {
  queryGroupMap.get(key).forEach((subKey)=>queryMap.delete(subKey));
  queryGroupMap.deleteKey(key);

  if (!queryObservers.has(key)) return;
  queryObservers.get(key).forEach((callback) => callback());
}

function isSame(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, i) => value === arr2[i]);
}

/**
 * 캐시에서 비동기 자원을 가져오고, 그렇지 않다면 자원을 등록합니다.
 * @param key<String> : 자원의 고유한 id입니다. @로 자원의 그루핑된 것을 판별할 수 있습니다.
 * @param promisFn<()=>Promise> : 자원을 반환하는 비동기 함수입니다.
 * @param dependencyArray<Array[Any]> : promise 함수가 의존하는 외부 객체 혹은 함수입니다.
 * 
 * @return Promise : 캐시된 비동기 Promise 객체입니다.
 */
export function getQuery(key, promiseFn, dependencyArray = []) {
  // 캐시에 key값이 저장되어 있을 경우, 해당 promise를 반환합니다.
  if (queryMap.has(key)) {
    const { promise, depArr } = queryMap.get(key);
    if (isSame(depArr, dependencyArray)) return promise;
  }

  // 캐시에 없을 경우, 새 promise를 생성하고, 캐시에 의존성 배열과 함께 등록합니다.
  const promise = promiseFn();
  queryMap.set(key, { promise, depArr: dependencyArray });
  
  // 캐시 그룹에 해당 키를 등록합니다. (useMutate로 그룹화된 캐시를 일괄적으로 삭제하기 위함)
  const groupKey = key.split("@")[0];
  queryGroupMap.set(groupKey, key);

  // 캐시의 지정된 기간이 지나면, 캐시와 캐시 그룹에서 해당 promise를 제거합니다.
  setTimeout(() => {
    queryMap.delete(key);
    queryGroupMap.delete(groupKey, key);
  }, CACHE_DURATION);
  return promise;
}


/**
 * 비동기 자원을 가져온다고 선언하는 리액트 훅입니다.
 * 비동기 자원을 suspense-최적화된 방식으로 가져오며, useMutation으로 비동기 자원이 변경되면 
 * 동일한 자원을 참조하는 useQuery를 사용한 컴포넌트를 리렌더링시킵니다.
 * 
 * @param key<String> : 자원의 고유한 id입니다. @로 자원의 그루핑된 것을 판별할 수 있습니다.
 * @param promisFn<()=>Promise> : 자원을 반환하는 비동기 함수입니다.
 * @param config<Object> : 컨피그 객체입니다. 배열을 넣으면, 해당 배열은 의존성 배열로 동작합니다.
 *   - dependencyArray<Array[Any]> : promise 함수가 의존하는 외부 객체 혹은 함수입니다.
 *   - deferred<Boolean> : deferred가 true이면, 자원을 로딩할 때 로딩 인디케이터를 띄우는 대신, 이전의 데이터를 렌더링합니다.
 * 
 * @return use<Promise> : use로 감싸진 Promise 객체입니다. 진행 중일 시 Promise를 throw 합니다.
 */
export function useQuery(key, promiseFn, config = {}) {
  // config 매개변수를 이전 API와 호환성 있게 변환합니다.
  let _config = { dependencyArray: [] };
  if (Array.isArray(config)) _config.dependencyArray = config;
  else _config = Object.assign(_config, config);

  // 외부 반응형 저장소를 구독하여, 비동기 자원이 변경이 있으면 refetch하도록 합니다.
  const query = useSyncExternalStore(subscribeQuery(key), () =>
    getQuery(key, promiseFn, _config.dependencyArray),
  );
  const deferredQuery = useDeferredValue(query);

  if (_config.deferred) return use(deferredQuery);
  return use(query);
}


/**
 * 비동기 자원을 변환한다고 선언하는 함수입니다. post, put, patch, delete 요청에 사용하세요.
 * 
 * @param key<String> : 그루핑된 자원의 고유한 id입니다.
 * @param promisFn<()=>Promise> : 자원을 변경하는 비동기 함수입니다.
 * @param config<Object> : 컨피그 객체입니다.
 *   - onSuccess<(value)=>null> : 비동기 요청이 성공했을 때 사용되는 콜백입니다.
 *   - onError<(Error)=>null> : 비동기 요청에서 에러가 나왔을 때 사용되는 콜백입니다.
 * 
 * @return Function : 호출 시, 실제로 post 요청을 발송하는 함수를 반환합니다.
 */
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
