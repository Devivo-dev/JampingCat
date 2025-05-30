//логіка появи віскасу
export function spawnCoin() {
  const coin = document.querySelector(".game__coin");
  const cloud = document.querySelector(".game__cloud");
  const gameWindow = document.querySelector(".game");

  const coinHeight = coin.offsetHeight;
  const coinWidth = coin.offsetWidth;

  const cloudRect = cloud.getBoundingClientRect();
  const gameRect = gameWindow.getBoundingClientRect();
  const topBoundary = cloudRect.bottom - gameRect.top;
  const bottomBoundary = gameWindow.clientHeight - coinHeight;

  const rmdY = topBoundary + Math.random() * (bottomBoundary - topBoundary);
  const rmdX = Math.random() * (gameWindow.clientWidth - coinWidth);

  coin.style.left = rmdX + "px";
  coin.style.top = rmdY + "px";
  coin.style.display = "block";

  clearTimeout(coin.despawnTimer);
  coin.despawnTimer = setTimeout(() => {
    if (coin.style.display === "block") {
      coin.style.display = "none";
      spawnCoin();
    }
  }, 5000);
}
