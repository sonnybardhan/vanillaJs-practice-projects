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

function inputHandler(e, outputElement) {
  outputElement.textContent = e.target.value;
}

const debouncedInputHandler = debounce(inputHandler);

debounceInput.addEventListener('input', (e) =>
  debouncedInputHandler(e, debounceOutput)
);

function throttle(fn, delay = 500) {
  let lastCall = 0;
  let timerId;

  return function (...args) {
    let now = Date.now();
    let timeSinceLastCall = now - lastCall;
    let timeRemaining = delay - timeSinceLastCall;

    if (timeRemaining <= 0) {
      fn.apply(this, args);
      lastCall = now;
      return;
    }

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn.apply(this, args);
      lastCall = Date.now();
    }, timeRemaining);
  };
}

const throttledInputHandler = throttle(inputHandler);

throttleInput.addEventListener('input', (e) =>
  throttledInputHandler(e, throttleOutput)
);
