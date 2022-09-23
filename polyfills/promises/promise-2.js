const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  #thenCbs = [];
  #catchCbs = [];
  #state = STATE.PENDING;
  #value;
  #onSuccessBind = this.#onSuccess.bind(this);
  #onFailBind = this.#onFail.bind(this);

  constructor(cb) {
    try {
      cb(this.#onSuccessBind, this.#onFailBind);
    } catch (error) {
      this.#onFailBind(error);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((cb) => {
        cb(this.#value);
      });
      this.#thenCbs = [];
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((cb) => {
        cb(this.#value);
      });
      this.#catchCbs = [];
    }
  }

  #onSuccess(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      this.#value = value;
      this.#state = STATE.FULFILLED;

      //run thenCbs
      this.#runCallbacks();
    });
  }

  #onFail(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      if (!this.#catchCbs.length) {
        throw new UncaughtPromiseError(value);
      }

      this.#value = value;
      this.#state = STATE.REJECTED;
      //run catchCbs
      this.#runCallbacks();
    });
  }

  then(thenCb, catchCb) {
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        if (thenCb == null) {
          resolve(result);
          return;
        }

        try {
          resolve(thenCb(result));
        } catch (error) {
          reject(error);
        }
      });

      this.#catchCbs.push((result) => {
        if (catchCb == null) {
          reject(result);
          return;
        }

        try {
          resolve(catchCb(result));
        } catch (error) {
          reject(error);
        }
      });
      this.#runCallbacks();
    });
  }

  catch(cb) {
    return this.then(undefined, cb);
  }

  finally(cb) {
    return this.then(
      (result) => {
        cb();
        return result;
      },
      (result) => {
        cb();
        throw result;
      }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }

  static all(array) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let resolvedCount = 0;

      array.forEach((promise, idx) => {
        promise
          .then((result) => {
            results[idx] = result;
            resolvedCount++;

            if (resolvedCount === array.length) {
              resolve(results);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  // static allSettled(array) {
  //   return new MyPromise((resolve) => {
  //     const results = [];
  //     let resolvedCount = 0;

  //     array.forEach((promise, idx) => {
  //       promise
  //         .then((result) => {
  //           results[idx] = result;
  //           resolvedCount++;
  //           if (resolvedCount === array.length) {
  //             resolve(results);
  //           }
  //         })
  //         .catch((err) => {
  //           results[idx] = err;
  //           if (resolvedCount === array.length) {
  //             resolve(results);
  //           }
  //         });
  //     });
  //   });
  // }

  static race(array) {
    return new MyPromise((resolve, reject) => {
      array.forEach((promise) => {
        promise
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  static any(array) {
    return new MyPromise((resolve, reject) => {
      let failedPromiseCount = 0;

      array.forEach((promise) => {
        promise
          .then((result) => {
            resolve(result);
            return;
          })
          .catch((err) => {
            failedPromiseCount++;

            if (failedPromiseCount === array.length) {
              reject('all failed');
            }
          });
      });
    });
  }
}

class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error);

    this.stack = `(in promise) ${error.stack}`;
  }
}

//============
//============
//============

module.exports = MyPromise;
