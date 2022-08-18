import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(refs.inputDateEl, options);

const timer = {
  start() {
    const futureTime = new Date('August 18, 2022');
    const startTime = futureTime.getTime();

    setInterval(() => {
      const currentTime = Date.now();
      const unitTime = startTime - currentTime;

      const { days, hours, minutes, seconds } = convertMs(unitTime);
      //   console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
  },
};

timer.start();

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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
