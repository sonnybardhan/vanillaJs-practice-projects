const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  #state = STATE.PENDING;
  #value;
  #thenCbs = [];
  #catchCbs = [];
  #onSuccessBind = this.#onSuccess.bind(this);
  #onFailBind = this.#onFail.bind(this);

  constructor(executor) {
    try {
      executor(this.#onSuccess, this.#onFail);
    } catch (error) {
      this.#onFail(error);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((cb) => cb(this.#value));
      this.#thenCbs = [];
    } else if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((cb) => cb(this.#value));
      this.#catchCbs = [];
    }
  }

  #onSuccess(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#value = value;
    this.#state = STATE.FULFILLED;
    this.#runCallbacks();
  }

  #onFail(value) {
    if (this.#state !== STATE.PENDING) return;
    this.#value = value;
    this.#state = STATE.REJECTED;
    this.#runCallbacks();
  }

  then(thenCb, catchCb) {
    if (thenCb != null) {
      this.#thenCbs.push(thenCb);
    }

    if (catchCb != null) {
      this.#catchCbs.push(catchCb);
    }

    this.#runCallbacks();
  }

  catch(cb) {
    this.then(undefined, cb);
  }

  finally() {}
}

const myPromise = new MyPromise((resolve, reject) => {
  //code
  resolve('passed');
  // .
  // .
  // .
  reject('failed');
});

// myPromise.then(() => {}).catch(() => {});

module.exports = MyPromise;
