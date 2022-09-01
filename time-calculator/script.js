// calculateTimes(
//   180, 30, 90, 60, 30, 60, 10, 60, 10, 30, 10, 60, 10, 60, 60, 15, 30, 10, 30
//   9:15
// );
const startTimeInput = document.querySelector('#start-time-input');
const timesInput = document.querySelector('#times-input');
const calculateBtn = document.querySelector('#calculate-btn');
const clearBtn = document.querySelector('#clear-btn');
const outputDiv = document.querySelector('.output');
const commaRadio = document.querySelector('#comma');
const spaceRadio = document.querySelector('#space');

let type = 'comma';

commaRadio.addEventListener('input', (e) => {
  type = 'comma';
});

spaceRadio.addEventListener('input', (e) => {
  type = 'space';
});

clearBtn.addEventListener('click', () => {
  startTimeInput.value = '';
  timesInput.value = '';
  outputDiv.textContent = '';
});

calculateBtn.addEventListener('click', () => {
  const startStr = startTimeInput.value;
  const timesStr = timesInput.value;
  let timesArr;

  // timesArr = [...timesStr.split(',')].filter(Boolean).map((num) => num.trim());

  if (type === 'space') {
    console.log('using spaces');
    timesArr = [...timesStr.split('\n')]
      .filter(Boolean)
      .map((num) => num.trim());
    console.log('\n found', timesArr);
  } else {
    console.log('using commas');
    timesArr = [...timesStr.split(',')]
      .filter(Boolean)
      .map((num) => num.trim());
    console.log(', found', timesArr);
  }
  const result = calculateTimes(timesArr, startStr);
  printOutput(result);
});

function printOutput(elements) {
  // DocumentFragment
  const outputArray = [];

  elements.forEach((element) => {
    const div = document.createElement('div');
    div.innerText = element;
    outputArray.push(div);
  });
  outputDiv.innerText = '';
  outputDiv.append(...outputArray);
}
