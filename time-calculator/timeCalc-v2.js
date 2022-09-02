// arr = [...newNums.split(',')].filter(Boolean).map(num => num.trim())

function calculateTime(changeMins, time = '') {
  if (time) {
    if (!time.includes(':')) return console.error('Invalid format');
    time = new Date(...Array(3).fill(null), ...time.split(':'));
  } else {
    time = new Date();
  }

  let currentHours = time.getHours();
  let currentMins = time.getMinutes();

  let deltaDays = 0;

  let deltaHours = Math.floor(Math.abs(changeMins / 60));

  let deltaMins = changeMins % 60;

  let newMins = deltaMins + currentMins;

  if (newMins < 0) {
    deltaHours--;
    newMins = 60 + (newMins % 60);
  } else if (newMins > 59) {
    deltaHours++;
    newMins = newMins % 60;
  }

  let newHours = currentHours + deltaHours;

  if (newHours < 0) {
    deltaDays = Math.floor(newHours / 24);
    newHours = 24 - (newHours % 24);
  } else if (newHours > 23) {
    deltaDays = Math.floor(newHours / 24);
    newHours = newHours % 24;
  }
  return `${addPrefix(newHours)}:${addPrefix(newMins)}`;
}

function calculateTimes(times, start = '') {
  if (!Array.isArray(times)) {
    // return console.log(calculateTime(times, start));
    return calculateTime(times, start);
  }

  const timeList = [];

  if (start) {
    timeList.push(start);
  } else {
    const hours = addPrefix(new Date().getHours());
    const mins = addPrefix(new Date().getMinutes());
    const currentTimeString = `${hours}:${mins}`;
    timeList.push(currentTimeString);
  }

  times.forEach((mins, idx) => {
    const previousTime = timeList[idx];
    timeList.push(calculateTime(mins, previousTime));
  });

  // console.log('timeList: ', timeList);
  // console.log('timeList: ', timeList);
  return timeList;
}

const addPrefix = (num) => (num < 10 ? `0${num}` : num);

// calculateTimes([180], '9:15');
// calculateTimes(
//   [180, 30, 90, 60, 30, 60, 10, 60, 10, 30, 10, 60, 10, 60, 60, 15, 30, 10, 30],
//   '9:15'
// );

// module.exports = {
//   calculateTimes,
// };
