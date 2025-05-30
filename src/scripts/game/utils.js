// утиліти (наприклад, isColliding)
export function isColliding(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(aRect.right < bRect.left ||
           aRect.left > bRect.right ||
           aRect.bottom < bRect.top ||
           aRect.top > bRect.bottom);
}
