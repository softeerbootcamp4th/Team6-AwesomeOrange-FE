import { useSyncExternalStore } from "react";
import { jwtDecode } from "jwt-decode";
import tokenSaver from "@common/dataFetch/tokenSaver.js";
import { SERVICE_TOKEN_ID } from "@common/constants.js";

const defaultUserState = {
  isLogin: false,
  userName: "",
}

class UserStore
{
  state;
  observers = new Set();
  constructor()
  {
    this.state = createUserStore();
  }
  getState(getter)
  {
    return getter(this.state);
  }
  subscribe(callback)
  {
    this.observers.add(callback);
    return ()=>this.observers.delete(callback);
  }
  setState(mutateFunc)
  {
    const oldState = this.state;
    const newState = typeof mutateFunc === "function" ? mutateFunc(oldState) : mutateFunc;
    if(oldState === newState) return;
    observers.forEach( callback=>callback() );
  }
}

function createUserStore()
{
  if(typeof window === "undefined") return defaultUserState;
  tokenSaver.init(SERVICE_TOKEN_ID);
  const token = tokenSaver.get(SERVICE_TOKEN_ID);
  const userName = parseTokenToUserName(token);
  if (token === null) return { isLogin: false, userName: "" };
  else return { isLogin: true, userName };
}

function parseTokenToUserName(token) {
  if (token === null) return "";
  try {
    const { userName } = jwtDecode(token);
    return userName;
  }
  catch {
    return "사용자";
  }
}

const userStore = new UserStore();

export function login(token) {
  tokenSaver.set(token);
  const userName = parseTokenToUserName(token);
  userStore.setState(() => ({ isLogin: true, userName }));
}

export function logout() {
  tokenSaver.remove();
  userStore.setState(() => ({ isLogin: false, userName: "" }));
}

function useUserStore(func, defaultValue=defaultUserState)
{
  return useSyncExternalStore(userStore.subscribe.bind(userStore), ()=>userStore.getState(func), ()=>func(defaultValue));
}

export default useUserStore;
