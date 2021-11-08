const body = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

let timerId = null;
let isActive = false;

buttonStart.addEventListener('click', changeBackgroundColor);
buttonStop.addEventListener('click', stopChangeBackgroundColor);

function changeBackgroundColor() {
  if (isActive === false) {
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
      console.log(timerId);
    }, 1000);
    isActive = true;
  }
}

function stopChangeBackgroundColor() {
  if (isActive === true) {
    clearInterval(timerId);
    isActive = false;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
