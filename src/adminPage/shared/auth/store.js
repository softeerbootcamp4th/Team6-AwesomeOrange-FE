import { create } from "zustand";
import tokenSaver from "@common/dataFetch/tokenSaver.js";
import { ADMIN_TOKEN_ID } from "@common/constants.js";

const userStore = create(() => ({
  initialized: false,
  isLogin: false,
}));

export function login(token) {
  tokenSaver.set(token);
  userStore.setState(() => ({ isLogin: true, initialized: true }));
}

export function logout() {
  tokenSaver.remove();
  userStore.setState(() => ({ isLogin: false, initialized: true }));
}

export function initLoginState() {
  tokenSaver.init(ADMIN_TOKEN_ID);
  const token = tokenSaver.get(ADMIN_TOKEN_ID);
  if (token === null)
    userStore.setState(() => ({ isLogin: false, initialized: true }));
  else userStore.setState(() => ({ isLogin: true, initialized: true }));
}

export default userStore;
