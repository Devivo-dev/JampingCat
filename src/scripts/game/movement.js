//логіка руху персонажа
import { state } from './state.js';

export function moveLeft() {
  if (!state.running) return;
  state.velocityY = -10;
  state.velocityX = -3;
  state.score++;
  document.querySelector(".control__button--left").classList.add("active");
  setTimeout(() => {
    document.querySelector(".control__button--left").classList.remove("active");
  }, 150);
  document.querySelector(".game__player").style.transform = "scaleX(-1)";
}

export function moveRight() {
  if (!state.running) return;
  state.velocityY = -10;
  state.velocityX = 3;
  state.score++;
  document.querySelector(".control__button--right").classList.add("active");
  setTimeout(() => {
    document.querySelector(".control__button--right").classList.remove("active");
  }, 150);
  document.querySelector(".game__player").style.transform = "scaleX(1)";
}

const retryBtn = document.querySelector(".modal__retry");
retryBtn.addEventListener("click", () => {
  retryBtn.classList.add("active");

  setTimeout(() => {
    retryBtn.classList.remove("active");
    document.querySelector(".modal").classList.add("hidden");
    location.reload();
  }, 250);
});
