import '../scss/styles.scss';
import pauseSvg from '../assets/images/pause.svg';
import playSvg from '../assets/images/play.svg';
import { changeVolume, printVolume } from './volume';

const videoElement = document.getElementById('video');
const overlayLeftElement = document.getElementById('overlay-left');
const overlayRightElement = document.getElementById('overlay-right');
const overlayPauseElement = document.getElementById('overlay-pause');
const playButton = document.getElementById('play-button');
const progressContainerElement = document.getElementById('progress-container');
const rewButton = document.getElementById('rew-button');
const fwdButton = document.getElementById('fwd-button');
const volumeDownButton = document.getElementById('volume-down-button');
const volumeUpButton = document.getElementById('volume-up-button');
const slowerButton = document.getElementById('slower-button');
const fasterButton = document.getElementById('faster-button');
const speedInfoElement = document.getElementById('speed-info');
const durationInfoElement = document.getElementById('duration-info');
const rootStyles = document.documentElement.style;

let savedTime = localStorage.getItem('time');

// FUNCIONES

const printDurationInfo = () => {
  const date = new Date(0);
  date.setSeconds(videoElement.currentTime);
  const timeString = date.toISOString().substr(11, 8);
  durationInfoElement.textContent = timeString;
};

const printSpeed = () => {
  speedInfoElement.textContent = videoElement.playbackRate + '×';
};

const playPause = () => {
  if (videoElement.paused) {
    playButton.firstElementChild.src = pauseSvg;
    overlayPauseElement.classList.remove('overlay--show');
    videoElement.play();
  } else {
    playButton.firstElementChild.src = playSvg;
    overlayPauseElement.classList.add('overlay--show');
    videoElement.pause();
  }
  //videoElement.paused ? videoElement.play() : videoElement.pause();
};

const changeTime = time => {
  videoElement.currentTime = videoElement.currentTime + time;
};

const animate = element => {
  element.firstElementChild.classList.add('overlay__info--show');
  const setTimeoutID = setTimeout(() => {
    element.firstElementChild.classList.remove('overlay__info--show');
    clearTimeout(setTimeoutID);
  }, 1000);
};

// EVENTOS

volumeDownButton.addEventListener('click', () => {
  if (videoElement.volume < 0.1) return;
  changeVolume(-0.1);
  printVolume();
});

volumeUpButton.addEventListener('click', () => {
  if (videoElement.volume >= 1) return;
  changeVolume(+0.1);
  printVolume();
});

fasterButton.addEventListener('click', () => {
  videoElement.playbackRate = videoElement.playbackRate * 2;
  printSpeed();
});

slowerButton.addEventListener('click', () => {
  videoElement.playbackRate = videoElement.playbackRate / 2;
  printSpeed();
});

videoElement.addEventListener('click', () => {
  playPause();
});

playButton.addEventListener('click', () => {
  playPause();
});

progressContainerElement.addEventListener('click', e => {
  videoElement.currentTime = (e.offsetX / e.target.clientWidth) * videoElement.duration;
  rootStyles.setProperty('--current-time', `${(e.offsetX * 100) / e.target.clientWidth}%`);
});

rewButton.addEventListener('click', () => changeTime(-5));
fwdButton.addEventListener('click', () => changeTime(5));

overlayLeftElement.addEventListener('click', () => {
  changeTime(-10);
  animate(overlayLeftElement);
});

overlayRightElement.addEventListener('click', () => {
  changeTime(10);
  animate(overlayRightElement);
});

videoElement.addEventListener('timeupdate', () => {
  if ((videoElement.currentTime * 100) / videoElement.duration > 2) {
    rootStyles.setProperty('--current-time', `${(videoElement.currentTime * 100) / videoElement.duration}%`);
  }
  printDurationInfo();
  localStorage.setItem('time', videoElement.currentTime);
});

videoElement.addEventListener('loadedmetadata', printDurationInfo);

if (savedTime) videoElement.currentTime = savedTime;
