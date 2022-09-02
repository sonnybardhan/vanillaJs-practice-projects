const startTimeInput = document.querySelector('#start-time-input');
const startTimePadding = document.querySelector('#start-time-padding');
const timesInput = document.querySelector('#times-input');
const calculateBtn = document.querySelector('#calculate-btn');
const clearBtn = document.querySelector('#clear-btn');
const outputDiv = document.querySelector('.output');
// const commaRadio = document.querySelector('#comma');
// const spaceRadio = document.querySelector('#space');
const currentTimeDisplay = document.querySelector('#current-time-display');

function getTimeString(displaySecs = false) {
  const hours = addPrefix(new Date().getHours());
  const mins = addPrefix(new Date().getMinutes());
  const secs = addPrefix(new Date().getSeconds());

  return displaySecs ? `${hours}:${mins}:${secs}` : `${hours}:${mins}`;
}

startTimePadding.addEventListener('blur', () => {
  const input = Number(startTimePadding.value);
  console.log('input: ', input);
  if (!isNaN(input) && input > 0) {
    startTimeInput.value = getPaddedStartTime();
  }
});

function getPaddedStartTime() {
  if (!startTimePadding.value) return getTimeString();

  const padValue = Number(startTimePadding.value) || 10;
  const delta =
    padValue - Math.floor(new Date().getMinutes() % padValue) + padValue;
  let str = calculateTimes(delta);
  console.log('timeToDisplay: ', str);
  return str;
}

function updateScreenTime() {
  currentTimeDisplay.innerText = getTimeString();
  setInterval(() => {
    currentTimeDisplay.innerText = getTimeString();
  }, 1000);
}

// let type = 'comma';
updateScreenTime();
startTimeInput.value = getPaddedStartTime();

// commaRadio.addEventListener('input', () => {
//   type = 'comma';
// });

// spaceRadio.addEventListener('input', () => {
//   type = 'space';
// });

clearBtn.addEventListener('click', () => {
  startTimeInput.value = '';
  timesInput.value = '';
  outputDiv.textContent = '';
});

calculateBtn.addEventListener('click', () => {
  const startStr = getPaddedStartTime();
  const timesStr = timesInput.value;
  let timesArr = cleanupInput(timesStr);
  // if (type === 'space') {
  //   timesArr = [...timesStr.split('\n')]
  //     .filter(Boolean)
  //     .map((num) => num.trim());
  // } else {
  //   timesArr = [...timesStr.split(',')]
  //     .filter(Boolean)
  //     .map((num) => num.trim());
  // }

  const result = calculateTimes(timesArr, startStr);
  printOutput(result, timesArr);
});

function cleanupInput(input) {
  return input
    .split(',')
    .map((group) => group.split(' '))
    .flat()
    .map((group) => group.split('\n'))
    .flat()
    .filter(Boolean);
}

function printOutput(elements, timesArr) {
  const outputArray = [];

  elements.forEach((element, idx) => {
    const div = document.createElement('div');
    if (timesArr[idx] > 20) {
      div.style.backgroundColor = 'pink';
    }
    div.innerText = `${element} [${timesArr[idx] ? timesArr[idx] : '-'}]`;
    outputArray.push(div);
  });
  outputDiv.innerText = '';
  outputDiv.append(...outputArray);
}
