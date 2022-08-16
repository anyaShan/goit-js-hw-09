const refs = {
  formEl: document.querySelector('.form'),
  delayInputEl: document.querySelector('input[name="delay"]'),
  stepInputEl: document.querySelector('input[name="step"]'),
  amountInputEl: document.querySelector('input[name="amount"]'),
  submitBtnEl: document.querySelector('button[type="submit"]'),
};

refs.submitBtnEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  let firstDelay = Number(refs.delayInputEl);
  setTimeout(() => {
    let positions = Number(refs.amountInputEl);
    for (const position of positions) {
      createPromise();
    }
  }, firstDelay);
}

function createPromise(position, delay) {
  delay = Number(refs.stepInputEl);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

createPromise(position, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    fulfilled({ position, delay });
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    rejected({ position, delay });
  });

function fulfilled(position, delay) {
  const string = `<p class="fulfilled-text">✅ Fulfilled promise ${position} in ${delay}ms</p>`;
  refs.formEl.insertAdjacentHTML('beforeend', string);
}

function rejected(position, delay) {
  const string = `<p class="rejected-text">❌ Rejected promise ${position} in ${delay}ms</p>`;
  refs.formEl.insertAdjacentHTML('beforeend', string);
}
