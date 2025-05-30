// ігровий цикл та колізії
import { state } from './state.js';
import { isColliding } from './utils.js';
import { spawnCoin } from './coin.js';
import { spawnRaindrop, handleLifeLoss} from './rain.js';

export function updateGame() {
  if (!state.running) return;
  
  const player = document.querySelector(".game__player");
  const gameWindow = document.querySelector(".game");
  const scoreEl = document.querySelector(".score__value--points");
  const coinEl = document.querySelector(".score__value--player");
  const coin = document.querySelector(".game__coin");

  scoreEl.textContent = state.score;

  state.velocityY += 0.5;
  state.posY += state.velocityY;
  state.posX += state.velocityX;

  const gameHeight = gameWindow.clientHeight;
  const gameWidth = gameWindow.clientWidth;

  if (state.posY < 0) {
    state.posY = 0;
    state.velocityY = 0;
  }
  if (state.posY + player.offsetHeight >= gameHeight) {
    state.posY = gameHeight - player.offsetHeight;
    state.velocityY = 0;
  }
  if (state.posX < 0) {
    state.posX = 0;
    state.velocityX = 0;
  }
  if (state.posX + player.offsetWidth >= gameWidth) {
    state.posX = gameWidth - player.offsetWidth;
    state.velocityX = 0;
  }

  player.style.top = state.posY + "px";
  player.style.left = state.posX + "px";

  if (isColliding(player, coin)) {
    state.coins++;
    coinEl.textContent = state.coins;
    coin.style.display = "none";
    clearTimeout(coin.despawnTimer);
    setTimeout(spawnCoin, 2000);
  }
  requestAnimationFrame(updateGame);
}
