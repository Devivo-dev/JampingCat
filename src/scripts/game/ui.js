// UI (відлік часу);
export function startCountdown(onComplete) {
  const countdownText = document.querySelector('.game__start-message');
  let count = 3;
  countdownText.textContent = count;
  const interval = setInterval(() => {
    count--;
    countdownText.textContent = count > 0 ? count : 'Start!';
    if (count < 0) {
      clearInterval(interval);
      countdownText.textContent = '';
      onComplete();
    }
  }, 1000);
}