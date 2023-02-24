// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
import CatImage from '../assets/images/anubis.jpg';
import { sayHello } from './demo.js';

sayHello();

const img = document.createElement('img');
img.src = CatImage;
document.body.append(img);
