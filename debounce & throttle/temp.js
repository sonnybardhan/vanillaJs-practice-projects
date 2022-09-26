const debounceInput = document.getElementById('debounce-input');
const debounceOutput = document.getElementById('debounce-output');
const throttleInput = document.getElementById('throttle-input');
const throttleOutput = document.getElementById('throttle-output');

function debounce(fn, delay = 500) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

//limiting by time,
//try limiting by length of entries

function throttleByTime(fn, delay = 500) {
  let lastCall = 0;
  let timerId;

  return function (...args) {
    const timeElapsed = Date.now() - lastCall;
    const timeRemaining = delay - timeElapsed;

    if (timeRemaining <= 0) {
      console.log('timeRemaining:', timeRemaining);
      fn.apply(this, args);
      lastCall = Date.now();
    } else {
      clearTimeout(timerId);
      console.log('timeRemaining:', timeRemaining);
      timerId = setTimeout(() => {
        fn.apply(this, args);
        lastCall = Date.now();
      }, timeRemaining);
    }
  };
}

function handleInput(e, element) {
  element.textContent = e.target.value + '\n';
}

// const debouncedHandler = debounce(handleInput);
const debouncedHandler = debounce2(handleInput);

debounceInput.addEventListener('input', (e) =>
  debouncedHandler(e, debounceOutput)
);

// const throttledTimeHandler = throttleByTime(handleInput);
const throttledTimeHandler = throttle2(handleInput);
// const throttledTimeHandler = throttleByLength(handleInput);

// throttleInput.addEventListener('input', (e) => handleInput(e, throttleOutput));
throttleInput.addEventListener('input', (e) =>
  throttledTimeHandler(e, throttleOutput)
);

function debounce2(fn, delay = 500) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function throttle2(fn, delay = 500) {
  let timerId;
  let lastCall = 0;
  function throttle(...args) {
    const now = Date.now();
    const timeElapsed = now - lastCall;
    const timeRemaining = delay - timeElapsed;

    if (timeRemaining <= 0) {
      fn.apply(this, args);
      lastCall = now;
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn.apply(this, args);
        lastCall = Date.now();
      }, timeRemaining);
    }
  }

  throttle.cancel = function () {
    clearTimeout(timerId);
  };

  console.log(throttle.cancel);

  return throttle;
}

//not working ... fix it
function throttleByLength(fn, delay = 500) {
  let timerId;
  let lastCall = 0;
  let allArgs = [];

  return function (...args) {
    allArgs.push(...args);
    console.log(allArgs);

    const now = Date.now();
    const timeElapsed = now - lastCall;
    const timeRemaining = delay - timeElapsed;

    if (timeRemaining <= 0 && args.length >= 3) {
      console.log('calling right now, ', allArgs);
      fn.apply(this, allArgs.slice(0, 3));
      allArgs = allArgs.slice(3);
      lastCall = Date.now();
    } else if (timeRemaining > 0 && args.length >= 3) {
      console.log('calling after: ', timeRemaining);
      clearTimeout(timerId);
      setTimeout(() => {
        fn.apply(this, allArgs.slice(0, 3));
        allArgs = allArgs.slice(3);
        lastCall = Date.now();
      }, timeRemaining);
    } else {
      console.log('not enough chars ... ', allArgs.length);
    }
  };
}
