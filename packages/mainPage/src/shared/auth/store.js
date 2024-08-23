import { useSyncExternalStore } from "react";
import { jwtDecode } from "jwt-decode";
import tokenSaver from "@common/dataFetch/tokenSaver.js";
import { SERVICE_TOKEN_ID } from "@common/constants.js";

const defaultUserState = {
  isLogin: false,
  userName: "",
};

class UserStore {
  state;
  observers = new Set();
  constructor() {
    this.state = createUserStore();
  }
  getState(getter) {
    return getter(this.state);
  }
  subscribe(callback) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }
  setState(mutateFunc) {
    const oldState = this.state;
    const newState = typeof mutateFunc === "function" ? mutateFunc(oldState) : mutateFunc;
    if (oldState === newState) return;
    this.state = newState;
    this.observers.forEach((callback) => callback());
  }
}

function createUserStore() {
  if (typeof window === "undefined") return defaultUserState;
  tokenSaver.init(SERVICE_TOKEN_ID);
  const token = tokenSaver.get(SERVICE_TOKEN_ID);
  const { userName, userId } = parseTokenAndGetData(token);
  if (token === null) return { isLogin: false, userName: "", userId: "" };
  else return { isLogin: true, userName, userId };
}

function parseTokenAndGetData(token) {
  if (token === null) return "";
  try {
    const { userName, userId } = jwtDecode(token);
    return { userName, userId };
  } catch {
    return { userName: "사용자", userId: "1nvalidU5er" };
  }
}

const userStore = new UserStore();

export function login(token) {
  tokenSaver.set(token);
  const { userName, userId } = parseTokenAndGetData(token);
  userStore.setState(() => ({ isLogin: true, userName, userId }));
}

export function logout() {
  tokenSaver.remove();
  userStore.setState(() => ({ isLogin: false, userName: "", userId: "" }));
}

function useAuthStore(func, defaultValue = defaultUserState) {
  return useSyncExternalStore(
    userStore.subscribe.bind(userStore),
    () => userStore.getState(func),
    () => func(defaultValue),
  );
}

export function isLogined() {
  return userStore.state.isLogin;
}

export default useAuthStore;
