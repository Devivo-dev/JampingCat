const jumpToLeft = document.querySelector(".left");
const jumpToRight = document.querySelector(".right");
const player = document.querySelector(".player");
const gameWindow = document.querySelector(".game-window");
const score = document.querySelector(".score-amount");

const coinValue = document.querySelector(".score-player");
const coin = document.querySelector(".score-player_icon-coin");

const cloud = document.querySelector(".cloud");

const firstLife = document.querySelector('.firstLife');
const secondLife = document.querySelector('.secondLife');
const thirdLife = document.querySelector('.thirdLife');

let scoreAmount = 0;
let lives = 3;
let coinAmount = 0;
let fallSpeed = 2;

let gameRunning = true;
let animationFrameId;

const playerHeight = player.offsetHeight;
const playerWidth = player.offsetWidth;

const gameHeight = gameWindow.clientHeight;
const gameWidth = gameWindow.clientWidth;

let posX = 0;
let velocityX = 0;
let posY = 0;
let velocityY = 0;

function spawnCoin() {
  const coinHeight = coin.offsetHeight;
  const coinWidth = coin.offsetWidth;

  const cloudRect = cloud.getBoundingClientRect();
  const gameRect = gameWindow.getBoundingClientRect();

  const topBoundary = cloudRect.bottom - gameRect.top;
  const bottomBoundary = gameHeight - coinHeight;

  const rmdY = topBoundary + Math.random() * (bottomBoundary - topBoundary);
  const rmdX = Math.random() * (gameWidth - coinWidth);

  coin.style.left = rmdX + "px";
  coin.style.top = rmdY + "px";
  coin.style.display = "block";

  // 🟠 Автозникнення через 5 секунд
  clearTimeout(coin.despawnTimer); // скасовуємо попередній, якщо ще не спрацював
  coin.despawnTimer = setTimeout(() => {
    if (coin.style.display === "block") {
      coin.style.display = "none";
      spawnCoin(); // Респавн у новому місці
    }
  }, 5000);
}

const countdownText = document.querySelector('.game-star');

function startCountdown() {
  let count = 3;
  countdownText.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;
    if (count === 0) {
      countdownText.textContent = "Start!";
    } else {
      countdownText.textContent = count;
    }

    if (count < 0) {
      clearInterval(countdownInterval);
      countdownText.textContent = "";
      update(); // Починаємо гру
    }
  }, 1000);
}

// Замість просто update()
startCountdown();

function spawnRaindrop() {
  const drop = document.createElement('div');
  drop.classList.add('drop');

  // Динамічна швидкість падіння
  drop.style.setProperty('--fallSpeed', `${fallSpeed}s`);

  const cloudRect = cloud.getBoundingClientRect();
  const gameRect = gameWindow.getBoundingClientRect();
  const offsetX = Math.random() * cloud.offsetWidth;
  const x = cloudRect.left - gameRect.left + offsetX;
  const y = cloudRect.bottom - gameRect.top;

  drop.style.left = `${x}px`;
  drop.style.top = `${y}px`;

  gameWindow.appendChild(drop);

  // Колізія з гравцем
  let frameId;
  function checkCollision() {
    const dropRect = drop.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const isHit = !(
      dropRect.right < playerRect.left ||
      dropRect.left > playerRect.right ||
      dropRect.bottom < playerRect.top ||
      dropRect.top > playerRect.bottom
    );

    if (isHit) {
      handleLifeLoss();
      drop.remove();
    } else {
      frameId = requestAnimationFrame(checkCollision);
    }
  }

  frameId = requestAnimationFrame(checkCollision);

  setTimeout(() => {
    drop.remove();
    cancelAnimationFrame(frameId);
  }, fallSpeed * 1000);
}

function isColliding(player, coin){
  const playerCol = player.getBoundingClientRect();
  const coinCol = coin.getBoundingClientRect();

  return !(
    playerCol.right < coinCol.left ||   // гравець лівіше
    playerCol.left > coinCol.right ||   // гравець правіше
    playerCol.bottom < coinCol.top ||   // гравець вище
    playerCol.top > coinCol.bottom      // гравець нижче
  );
}

function handleLifeLoss() {
  lives--;

  if (lives === 2) {
    thirdLife.style.opacity = 0.3;
  } else if (lives === 1) {
    secondLife.style.opacity = 0.3;
  } else if (lives === 0) {
    firstLife.style.opacity = 0.3;

    document.querySelector(".modal").classList.remove("hidden");

    // Зробити кнопки неактивними
    jumpToLeft.classList.add("disabled");
    jumpToRight.classList.add("disabled");
  }
}

function update(){

  if (!gameRunning) return;

  score.textContent = scoreAmount;
  velocityY += 0.5;
  posY += velocityY;
  posX += velocityX;
  

  if (posY < 0){
    posY = 0;
    velocityY = 0;
  }
  if(posY + playerHeight >= gameHeight)
  {
    posY = gameHeight - playerHeight;
    velocityY = 0;
  }
  if (posX < 0){
    posX = 0;
    velocityX = 0;
  }
  if(posX + playerWidth >= gameWidth)
  {
    posX = gameWidth - playerWidth;
    velocityX = 0;
  }
  player.style.top = posY + "px";
  player.style.left = posX + "px";


if (isColliding(player, coin)) {
  coinAmount += 1;
  coinValue.textContent = coinAmount;
  coin.style.display = "none";

  clearTimeout(coin.despawnTimer); // Зупиняємо зникнення, бо монета вже зібрана
  setTimeout(spawnCoin, 2000);     // Новий спавн через 2 сек
}
  

  
  requestAnimationFrame(update)
}
setInterval(() => {
  if (fallSpeed > 0.5) fallSpeed -= 0.1;
}, 10000);
let rainInterval = 2000;// старт: 2 сек
let rainTimer; 
let difficultyIncrease = setInterval(() => {
  if (rainInterval > 500) {
    rainInterval -= 200; // кожні 10 сек −200мс
    clearInterval(rainTimer);
    rainTimer = setInterval(spawnRaindrop, rainInterval);
  }
}, 10000); // кожні 10 секунд
setTimeout(() => {
  rainTimer = setInterval(spawnRaindrop, rainInterval);
}, 2000);
spawnCoin();
update();
jumpToLeft.addEventListener("click" ,() => {
    scoreAmount += 1;

  velocityY = -10;
  velocityX = -3;
jumpToLeft.classList.add("active");
setTimeout(() => {
  jumpToLeft.classList.remove("active");
}, 150);
  player.style.transform = "scaleX(-1)";
});
jumpToRight.addEventListener("click" ,()=>
{
    scoreAmount += 1;

  velocityY = -10;
  velocityX = 3;
  
jumpToRight.classList.add("active");
setTimeout(() => {
  jumpToRight.classList.remove("active");
}, 150);
  player.style.transform = "scaleX(1)";
});
const retryBtn = document.querySelector(".retry");

retryBtn.addEventListener("click", () => {
  retryBtn.classList.add("active");

  setTimeout(() => {
    retryBtn.classList.remove("active");
    document.querySelector(".modal").classList.add("hidden");
    location.reload();
  }, 150);
});
// const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
// if (!isMobile) {
//     window.location.href = "/not-supported.html";
// }
console.log('Rain timer: ', rainInterval)