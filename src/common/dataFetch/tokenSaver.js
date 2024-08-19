class TokenSaver {
  initialized = false;
  token = null;
  tokenId = null;
  init(tokenId) {
    if (typeof window === "undefined") return;
    this.tokenId = tokenId;
    this.token = localStorage.getItem(this.tokenId) ?? null;
    this.initialized = true;
  }
  get(tokenId = this.tokenId) {
    if (this.initialized) return this.token;
    this.init(tokenId);
    return this.token;
  }
  set(token) {
    this.token = token;
    if (typeof window !== "undefined") localStorage.setItem(this.tokenId, token);
    this.initialzed = true;
  }
  has(tokenId = this.tokenId) {
    if (this.initialized) return this.token !== null;
    this.init(tokenId);
    return this.token !== null;
  }
  remove() {
    this.token = null;
    if (typeof window !== "undefined") localStorage.removeItem(this.tokenId);
    this.initialzed = true;
  }
}

const tokenSaver = new TokenSaver();

export default tokenSaver;
