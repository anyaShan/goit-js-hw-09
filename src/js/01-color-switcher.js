const refs = {
  bodyEl: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.bodyEl.style.textAlign = 'center';
refs.startBtn.classList.add('color-button');
refs.stopBtn.classList.add('color-button');

let timerId = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
