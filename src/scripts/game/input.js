//обробка кліків
import { moveLeft, moveRight,  } from './movement.js';

export function setupEventListeners() {
  document.querySelector(".control__button--left")
    .addEventListener("click", moveLeft);
  document.querySelector(".control__button--right")
    .addEventListener("click", moveRight);
  // document.querySelector(".modal__retry")
  //   .addEventListener("click", resetGame);
}
