import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    checkPastDates(selectedDates);
  },
};
let selectedTime;
let isActive = false;
btnStart.addEventListener('click', onStartClick);

flatpickr(input, options);

function checkPastDates(selectedDates) {
  selectedTime = selectedDates[0];
  if (selectedTime < Date.now()) {
    alert('Please choose a date in the future');
    btnStart.disabled = true;
    return;
  }
  btnStart.disabled = false;
  return;
}

function onStartClick() {
  if (isActive === false) {
    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const timeTimer = convertMs(deltaTime);
      console.log(timeTimer);
      updateTimer(timeTimer);
      addLeadingZero(updateTimer);
    }, 1000);

    isActive = true;
  }
}

function updateTimer({ days, hours, minutes, seconds }) {
  spanDays.textContent = days;
  spanHours.textContent = hours;
  spanMinutes.textContent = minutes;
  spanSeconds.textContent = seconds;

  return;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
