import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDateEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  timerFaceDays: document.querySelector('span[data-days]'),
  timerFaceHours: document.querySelector('span[data-hours]'),
  timerFaceMinutes: document.querySelector('span[data-minutes]'),
  timerFaceSeconds: document.querySelector('span[data-seconds]'),
};

// const options = {
//   // Вмикає засіб вибору часу
//   enableTime: true,
//   // Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено.
//   time_24hr: true,
//   // Встановлює початкові вибрані дати.
//   // Якщо ви використовуєте режим: "кілька" або календар діапазону, надайте масив об’єктів Date або масив рядків дат, які слідують за вашим dateFormat.
//   // В іншому випадку ви можете надати один об’єкт Date або рядок дати.
//   defaultDate: new Date(),
//   //   Регулює крок для введення хвилин (включно з прокручуванням)
//   minuteIncrement: 1,
//   // Функції, які запускаються щоразу, коли календар закривається.
//   onClose(selectedDates) {
//     //   console.log(selectedDates[0]);
//     const futureTime = selectedDates[0];
//     console.log(this.defaultDate);

//     // if (futureTime < this.defaultDate) {
//     //   alert('Please choose a date in the future');
//     // }
//   },
// };

// const fp = flatpickr(refs.inputDateEl, options);

//=============================================================
flatpickr(refs.inputDateEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const futureTime = selectedDates[0].getTime();
    // console.log(futureTime);
    if (futureTime < Date.now()) {
      alert('Please choose a date in the future');
    }
    refs.startBtnEl.disabled = false;
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
    // const futureTime = new Date('August 18, 2022 21:05:00');
    // const startTime = futureTime.getTime();

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
