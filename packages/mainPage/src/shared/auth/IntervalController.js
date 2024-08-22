class IntervalController extends EventTarget {
  #expected;
  #isTicking = false;
  #timeout = null;
  #pauseDelta = 0;
  get isTicking() {
    return this.#isTicking;
  }
  constructor(interval) {
    super();
    this.interval = interval;
  }
  start() {
    if (this.#isTicking) return;

    this.#isTicking = true;
    this.#expected = performance.now() + this.interval;
    this.#timeout = setTimeout(() => this.#step(), this.interval);
  }
  end() {
    if (!this.#isTicking) return;

    this.#isTicking = false;
    this.#expected = 0;
    clearTimeout(this.#timeout);
    this.#timeout = null;
  }
  pause() {
    if (!this.#isTicking) return;

    this.#pauseDelta = this.#expected - performance.now();
    this.#isTicking = false;
    clearTimeout(this.#timeout);
    this.#timeout = null;
  }
  resume() {
    if (this.#isTicking) return;

    this.#isTicking = true;
    this.#expected = performance.now() + this.#pauseDelta;
    this.#timeout = setTimeout(() => this.#step(), this.#pauseDelta);
  }
  #step() {
    const delta = this.#expected - performance.now();
    this.#expected += this.interval;
    this.dispatchEvent(new Event("interval"));
    if (this.callback) this.callback();
    this.#timeout = setTimeout(() => this.#step(), Math.max(0, this.interval + delta));
  }
}

export default IntervalController;
