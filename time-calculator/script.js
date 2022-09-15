const startTimeInput = document.querySelector('#start-time-input');
const startTimePadding = document.querySelector('#start-time-padding');
const timesInput = document.querySelector('#times-input');
const calculateBtn = document.querySelector('#calculate-btn');
const clearBtn = document.querySelector('#clear-btn');
const outputDiv = document.querySelector('.output');
const currentTimeDisplay = document.querySelector('#current-time-display');

function getTimeString(displaySecs = false) {
  const hours = addPrefix(new Date().getHours());
  const mins = addPrefix(new Date().getMinutes());
  const secs = addPrefix(new Date().getSeconds());

  return displaySecs ? `${hours}:${mins}:${secs}` : `${hours}:${mins}`;
}

startTimePadding.addEventListener('blur', () => {
  const input = Number(startTimePadding.value);
  if (!isNaN(input) && input > 0) {
    startTimeInput.value = getPaddedStartTime();
  }
});

function getPaddedStartTime() {
  if (!startTimePadding.value && startTimeInput.value) {
    return startTimeInput.value;
  }

  if (!startTimePadding.value && !startTimeInput.value) {
    console.log('no start or padding padded time');
    return getTimeString();
  } else if (!startTimePadding) {
    console.log('start time');
    return startTimeInput.value;
  }

  console.log('start time', startTimeInput.value);
  console.log('padded time');
  const padValue = Number(startTimePadding.value) || 10;
  const minValue = 15;
  const delta =
    padValue - Math.floor(new Date().getMinutes() % minValue) + padValue;
  let str = calculateTimes(delta);
  return str;
}

function updateScreenTime() {
  currentTimeDisplay.innerText = getTimeString();
  setInterval(() => {
    currentTimeDisplay.innerText = getTimeString();
  }, 1000);
}

updateScreenTime();
startTimePadding.value = 5;
startTimeInput.value = getPaddedStartTime();

clearBtn.addEventListener('click', () => {
  // startTimeInput.value = '';
  startTimeInput.value = getPaddedStartTime();
  timesInput.value = '';
  outputDiv.textContent = '';
});

calculateBtn.addEventListener('click', () => {
  const startStr = getPaddedStartTime();
  console.log('startStr:', startStr);
  const timesStr = timesInput.value;
  let timesArr = cleanupInput(timesStr);
  console.log(timesArr);
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
    .map((group) => group.split('\t'))
    .flat()
    .filter(Boolean);
}

function printOutput(elements, timesArr) {
  const outputArray = [];

  elements.forEach((element, idx) => {
    const div = document.createElement('div');
    if (timesArr[idx] > 20) {
      div.style.backgroundColor = 'pink';
      div.style.borderRadius = '.25em';
    }
    div.innerText = `${element} [${timesArr[idx] ? timesArr[idx] : '-'}]`;
    div.style.padding = '.10em .25em';
    div.style.margin = '.10em 0';
    outputArray.push(div);
  });
  outputDiv.innerText = '';
  outputDiv.append(...outputArray);
}
