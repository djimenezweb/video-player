import volumeOffSvg from '../assets/images/volume_off.svg';
import volumeDownSvg from '../assets/images/volume_down.svg';

const videoElement = document.getElementById('video');
const volumeDownButton = document.getElementById('volume-down-button');
const volumeInfoElement = document.getElementById('volume-info');

const printVolume = () => {
  volumeInfoElement.textContent = Math.floor(videoElement.volume * 100) + '%';
  if (Math.floor(videoElement.volume * 100) === 0) {
    volumeDownButton.firstElementChild.src = volumeOffSvg;
  } else {
    volumeDownButton.firstElementChild.src = volumeDownSvg;
  }
};

const changeVolume = step => {
  videoElement.volume = videoElement.volume + step;
};

export { printVolume, changeVolume };
