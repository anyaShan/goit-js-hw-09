import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  timerFaceDays: document.querySelector('span[data-days]'),
  timerFaceHours: document.querySelector('span[data-hours]'),
  timerFaceMinutes: document.querySelector('span[data-minutes]'),
  timerFaceSeconds: document.querySelector('span[data-seconds]'),
};

refs.inputDateEl.classList = 'input-timer';
refs.startBtnEl.classList = 'button-timer';

refs.startBtnEl.disabled = true;

let futureTime = null;

flatpickr(refs.inputDateEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    futureTime = selectedDates[0].getTime();

    if (futureTime < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtnEl.disabled = true;
      futureTime = Date.now();
    } else {
      refs.startBtnEl.disabled = false;
    }
  },
});

refs.startBtnEl.disabled = true;

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    refs.startBtnEl.disabled = true;
    refs.inputDateEl.disabled = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const unitTime = futureTime - currentTime;

      const time = this.convertMs(unitTime);
      this.onTick(time);

      if (unitTime < 1000) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onTick: updateTimerFace,
});

refs.startBtnEl.addEventListener('click', timer.start.bind(timer));

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.timerFaceDays.textContent = `${days}`;
  refs.timerFaceHours.textContent = `${hours}`;
  refs.timerFaceMinutes.textContent = `${minutes}`;
  refs.timerFaceSeconds.textContent = `${seconds}`;
}

//=============================================================
