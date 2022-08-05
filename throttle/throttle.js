function throttle(callback, delay) {
  let lastCall = 0;
  let timerId;

  const throttledFunction = function (...args) {
    let now = Date.now();
    let timeElapsed = now - lastCall;
    let timeRemaininig = delay - timeElapsed;

    if (timeRemaininig <= 0) {
      lastCall = now;
      callback.call(this, ...args);
    }

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      lastCall = Date.now();
      callback.call(this, ...args);
    }, timeRemaining);
  };

  throttledFunction.cancel = function () {
    clearTimeout(timerId);
  };

  return throttledFunction;
}
