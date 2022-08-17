const refs = {
  formEl: document.querySelector('.form'),
  submitBtnEl: document.querySelector('button[type="submit"]'),
};
console.log(refs.inputsEL);

const body = document.body;
body.classList = 'container';

const listOfPromises = document.createElement('ul');
listOfPromises.classList = 'promises-list';
refs.formEl.after(listOfPromises);

refs.formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let firstDelay = Number(delay.value);
  let stepEl = Number(step.value);
  let amountEl = Number(amount.value);

  console.log(firstDelay, stepEl, amountEl);

  for (let position = 1; position <= amountEl; position += 1) {
    createPromise(position, firstDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        fulfilled({ position, delay });
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        rejected({ position, delay });
      });
    firstDelay += stepEl;
  }
}

function fulfilled(position, delay) {
  const string = `<li class="promises-item fulfilled-text">✅ Fulfilled promise ${position} in ${delay}ms</li>`;
  listOfPromises.insertAdjacentHTML('beforeend', string);
}

function rejected(position, delay) {
  const string = `<li class="promises-item rejected-text">❌ Rejected promise ${position} in ${delay}ms</li>`;
  listOfPromises.insertAdjacentHTML('beforeend', string);
}
