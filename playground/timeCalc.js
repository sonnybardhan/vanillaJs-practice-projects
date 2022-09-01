function calculateTime(changeMins, time = Date.now()) {
  let currentHours = new Date().getHours();
  let currentMins = new Date().getMinutes();

  let deltaDays = 0;
  let deltaHours = Math.round(changeMins / 60);
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
  console.log(`${addPrefix(newHours)}:${addPrefix(newMins)}`);
}

const addPrefix = (num) => (num < 10 ? `0${num}` : num);
// function addPrefix(num) num < 10 ? `0${num}` : num;

calculateTime(-25);
