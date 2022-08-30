const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}

//current song

let songIndex = 0;

// on load, select first song
loadSong(songs[songIndex]);

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function updateTime(currentTime, duration) {
  if (isPlaying) {
    let currentMins = Math.floor(currentTime % 60);
    let currentSecs = Math.floor(currentTime / 60);
    let totalMins = Math.floor(duration % 60);
    let totalSecs = Math.floor(duration / 60);

    currentTimeDisplay.textContent = `${currentSecs}:${addPrefix(currentMins)}`;
    durationDisplay.textContent = `${totalSecs ? totalSecs : 0}:${
      totalMins ? addPrefix(totalMins) : '00'
    }`;
  }
}

function updateProgressBar(e) {
  const { currentTime, duration } = e.srcElement;
  updateTime(currentTime, duration);

  if (currentTime && duration) {
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
  }

  if (currentTime >= duration) {
    nextSong();
  }
}

function addPrefix(num) {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
}

function scrub(e) {
  const { x, y } = e;
  const { width, left } = progress.parentElement.getBoundingClientRect();
  const pointClicked = x - left;

  let goTo = (pointClicked / width) * 100;

  if (goTo < 0) goTo = 0;
  else if (goTo > 100) goTo = 100;

  progress.style.width = `${goTo}%`;
  music.currentTime = music.duration * (goTo / 100);
}
playSong();
// progress.addEventListener('click', (e) => console.log(e));
progressContainer.addEventListener('click', scrub);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
