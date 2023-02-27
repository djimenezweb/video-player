// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

/* import CatImage from '../assets/images/anubis.jpg';
import { sayHello } from './demo.js';

sayHello();

const img = document.createElement('img');
img.src = CatImage;
document.body.append(img); */

const videoElement = document.getElementById('video');
const overlayLeftElement = document.getElementById('overlay-left');
const overlayRightElement = document.getElementById('overlay-right');
const playButton = document.getElementById('play-button');
const progressContainerElement = document.getElementById('progress-container');
const rewButton = document.getElementById('rew-button');
const fwdButton = document.getElementById('fwd-button');
const volumeDownButton = document.getElementById('volume-down-button');
const volumeUpButton = document.getElementById('volume-up-button');
const volumeInfoElement = document.getElementById('volume-info');
const slowerButton = document.getElementById('slower-button');
const fasterButton = document.getElementById('faster-button');
const speedInfoElement = document.getElementById('speed-info');
const durationInfoElement = document.getElementById('duration-info');
const rootStyles = document.documentElement.style;

// FUNCIONES

const printDurationInfo = () => {
  const date = new Date(0);
  date.setSeconds(videoElement.currentTime);
  const timeString = date.toISOString().substr(11, 8);
  durationInfoElement.textContent = timeString;
};

const printVolume = () => {
  volumeInfoElement.textContent = Math.floor(videoElement.volume * 100) + '%';
  if (Math.floor(videoElement.volume * 100) === 0) {
    volumeDownButton.firstElementChild.src = 'assets/images/volume_off.svg';
  } else {
    volumeDownButton.firstElementChild.src = 'assets/images/volume_down.svg';
  }
};

const changeVolume = step => {
  videoElement.volume = videoElement.volume + step;
  printVolume();
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
  //videoElement.volume = videoElement.volume - 0.1;
});

volumeUpButton.addEventListener('click', () => {
  if (videoElement.volume >= 1) return;
  changeVolume(+0.1);
  //videoElement.volume = videoElement.volume + 0.1;
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
  rootStyles.setProperty('--current-time', `${(videoElement.currentTime * 100) / videoElement.duration}%`);
  printDurationInfo();
  localStorage.setItem('time', videoElement.currentTime);
});

videoElement.addEventListener('loadedmetadata', printDurationInfo);
