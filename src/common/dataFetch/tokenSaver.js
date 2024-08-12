import { TOKEN_ID } from "@common/constants.js";

class TokenSaver {
  initialized = false;
  token = null;
  init() {
    if (typeof window === "undefined") return;
    this.token = localStorage.getItem(TOKEN_ID) ?? null;
    this.initialized = true;
  }
  get() {
    if (this.initialized) return this.token;
    this.init();
    return this.token;
  }
  set(token) {
    this.token = token;
    if (typeof window !== "undefined") localStorage.setItem(TOKEN_ID, token);
    this.initialzed = true;
  }
  has() {
    if (this.initialized) return this.token !== null;
    this.init();
    return this.token !== null;
  }
  remove() {
    this.token = null;
    if (typeof window !== "undefined") localStorage.removeItem(TOKEN_ID);
    this.initialzed = true;
  }
}

const tokenSaver = new TokenSaver();

export default tokenSaver;
