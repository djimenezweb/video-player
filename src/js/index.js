// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

/* import CatImage from '../assets/images/anubis.jpg';
import { sayHello } from './demo.js';

sayHello();

const img = document.createElement('img');
img.src = CatImage;
document.body.append(img); */

const videoElement = document.getElementById('video');
const playButton = document.getElementById('play-button');
const progressBarElement = document.getElementById('progress-bar');
const rewButton = document.getElementById('rew-button');
const fwdButton = document.getElementById('fwd-button');
const quieterButton = document.getElementById('quieter-button');
const louderButton = document.getElementById('louder-button');
const volumeInfoElement = document.getElementById('volume-info');
const slowerButton = document.getElementById('slower-button');
const fasterButton = document.getElementById('faster-button');
const speedInfoElement = document.getElementById('speed-info');
const durationInfoElement = document.getElementById('duration-info');
const rootStyles = document.documentElement.style;

const printDurationInfo = () => {
  const date = new Date(0);
  date.setSeconds(videoElement.currentTime);
  const timeString = date.toISOString().substr(11, 8);
  durationInfoElement.textContent = timeString;
};

const printVolume = () => {
  volumeInfoElement.textContent = Math.floor(videoElement.volume * 100) + '%';
};

const printSpeed = () => {
  speedInfoElement.textContent = videoElement.playbackRate + '×';
};

const playPause = () => {
  videoElement.paused ? videoElement.play() : videoElement.pause();
};

const changeTime = time => {
  videoElement.currentTime = videoElement.currentTime + time;
};

quieterButton.addEventListener('click', () => {
  if (videoElement.volume < 0.1) return;
  videoElement.volume = videoElement.volume - 0.1;
  printVolume();
});

louderButton.addEventListener('click', () => {
  if (videoElement.volume >= 1) return;
  videoElement.volume = videoElement.volume + 0.1;
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

progressBarElement.addEventListener('click', e => {
  videoElement.currentTime = (e.offsetX / e.target.clientWidth) * videoElement.duration;
  rootStyles.setProperty('--current-time', `${((e.offsetX - 8) * 100) / e.target.clientWidth}%`);
  playPause();
});

rewButton.addEventListener('click', () => changeTime(-5));
fwdButton.addEventListener('click', () => changeTime(5));

videoElement.addEventListener('timeupdate', () => {
  rootStyles.setProperty('--current-time', `${(videoElement.currentTime * 100) / videoElement.duration}%`);
  printDurationInfo();
});

videoElement.addEventListener('loadedmetadata', printDurationInfo);
