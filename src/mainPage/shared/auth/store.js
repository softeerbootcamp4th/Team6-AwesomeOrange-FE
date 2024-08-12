import { create } from "zustand";
import tokenSaver from "@common/dataFetch/tokenSaver.js";
import { SERVICE_TOKEN_ID } from "@common/constants.js";

const userStore = create(() => ({
  isLogin: false,
  userName: "",
}));

function parseTokenToUserName(token) {
  if (token === null) return "";
  return "사용자";
}

export function login(token) {
  tokenSaver.set(token);
  const userName = parseTokenToUserName(token);
  userStore.setState(() => ({ isLogin: true, userName }));
}

export function logout() {
  tokenSaver.remove();
  userStore.setState(() => ({ isLogin: false, userName: "" }));
}

export function initLoginState() {
  tokenSaver.init(SERVICE_TOKEN_ID);
  const token = tokenSaver.get(SERVICE_TOKEN_ID);
  const userName = parseTokenToUserName(token);
  if (token === null)
    userStore.setState(() => ({ isLogin: false, userName: "" }));
  else userStore.setState(() => ({ isLogin: true, userName }));
}

export default userStore;
