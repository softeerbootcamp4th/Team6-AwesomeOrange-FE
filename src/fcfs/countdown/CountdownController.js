class CountdownController extends EventTarget {
  #expected;
  #isTicking = false;
  #timeout = null;
  #pauseDelta = 0;
  currentTime = 0;
  targetTime = 0;
  get isTicking() {
    return this.#isTicking;
  }
  constructor(serverTime, targetTime) {
    super();
    this.interval = 1000;
    this.currentTime = serverTime;
    this.targetTime = targetTime;
  }
  start() {
    if (this.#isTicking) return;

    this.#isTicking = true;

    let delta = (this.targetTime - this.currentTime) % 1000;
    if(delta < 0) delta += 1000;
    this.#expected = performance.now() + delta;
    this.#timeout = setTimeout(() => this.#step(delta), delta);
  }
  end() {
    if (!this.#isTicking) return;

    this.#isTicking = false;
    this.#expected = 0;
    clearTimeout(this.#timeout);
    this.#timeout = null;
  }
  #step(originDelta) {
    const errorDelta = this.#expected - performance.now();
    
    this.#expected += this.interval;
    this.currentTime += originDelta;
    this.dispatchEvent(new CustomEvent("interval", {details: this.targetTime - this.currentTime}));
    if(this.currentTime === this.targetTime) this.dispatchEvent(new Event("countover"));
    if (this.callback) this.callback();
    this.#timeout = setTimeout(
      () => this.#step(this.interval),
      Math.max(0, this.interval + errorDelta),
    );
  }
}

export default CountdownController;
