import '@scss/main.scss';
import { initGame } from './scripts/game/game.js';
initGame();
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});
document.addEventListener('gesturechange', function (e) {
  e.preventDefault();
});
document.addEventListener('gestureend', function (e) {
  e.preventDefault();
});