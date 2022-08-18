const refs = {
  formEl: document.querySelector('.form'),
  submitBtnEl: document.querySelector('button[type="submit"]'),
};

const body = document.body;
body.classList = 'container';

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

creatListOfPromises();

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let firstDelay = Number(delay.value);
  let stepEl = Number(step.value);
  let amountEl = Number(amount.value);

  if (firstDelay < 0 || stepEl < 0 || amountEl < 0) {
    alert('Enter a number greater than 0');
    return;
  }

  console.log(firstDelay, stepEl, amountEl);

  cleanListOfPromises();

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

function creatListOfPromises() {
  const listOfPromises = document.createElement('ul');
  listOfPromises.classList = 'promises-list';
  refs.formEl.after(listOfPromises);
  return (refs.listOfPromises = document.querySelector('.promises-list'));
}

function cleanListOfPromises() {
  return (refs.listOfPromises.innerHTML = '');
}

function fulfilled({ position, delay }) {
  const string = `<li class="promises-item fulfilled-text">✅ Fulfilled promise ${position} in ${delay}ms</li>`;
  refs.listOfPromises.insertAdjacentHTML('beforeend', string);
}

function rejected({ position, delay }) {
  const string = `<li class="promises-item rejected-text">❌ Rejected promise ${position} in ${delay}ms</li>`;
  refs.listOfPromises.insertAdjacentHTML('beforeend', string);
}

// =================================VERSION 2==================================================

// import Notiflix from 'notiflix';

// const refs = {
//   formEl: document.querySelector('.form'),
//   submitBtnEl: document.querySelector('button[type="submit"]'),
// };

// refs.formEl.addEventListener('submit', onFormSubmit);

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;

//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function onFormSubmit(event) {
//   event.preventDefault();
//   const {
//     elements: { delay, step, amount },
//   } = event.currentTarget;

//   let firstDelay = Number(delay.value);
//   let stepEl = Number(step.value);
//   let amountEl = Number(amount.value);

//   if (firstDelay < 0 || stepEl < 0 || amountEl < 0) {
//     alert('Enter a number greater than 0');
//     return;
//   }

//   console.log(firstDelay, stepEl, amountEl);

//   for (let position = 1; position <= amountEl; position += 1) {
//     createPromise(position, firstDelay)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
//       });
//     firstDelay += stepEl;
//   }
// }
