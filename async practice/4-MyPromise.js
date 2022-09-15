const states = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  constructor(executor) {
    this._state = states.PENDING; // fulfilled/rejected
    this._value = undefined;
    this._reason = undefined;
    this._thenQueue = [];
    this._finallyQueue = [];
    if (typeof executor === 'function') {
      setTimeout(() => {
        //keeping it here ensures the executor is run asynchronously, ie, after the callstack has cleared
        try {
          executor(this._onFulfilled.bind(this), this.onRejected.bind(this));
        } catch (error) {
          console.log('->', error);
        }
      });
    }
  }

  then(cb) {
    // this._state = 'fulfilled';
    // cb(this._value);
    // return this;
  }

  catch(cb) {
    // this._state = 'rejected';
    // cb(this._value);
    // return this;
  }

  finally(cb) {
    // cb();
    // return this;
  }

  _onfulfilled(value) {
    this._value = value;
  }

  _onRejected(reason) {
    this._reason = reason;
  }

  // resolve(value) {
  //   this._value = value;
  // }

  // reject(value) {
  //   this._value = value;
  // }

  get state() {
    return this._state;
  }

  get value() {
    return this._value;
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(42);
  }, 1000);
});
