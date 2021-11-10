import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.js';

const form = document.querySelector('.form');
const inputDelay = document.querySelector("input[name='delay']");
const inputStep = document.querySelector("input[name='step']");
const inputAmount = document.querySelector("input[name='amount']");
// btn.addEventListener('submit');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const firstDelay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);
  let delay = firstDelay;

  for (let i = 1; i <= amount; i += 1) {
    setTimeout(() => {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          return Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          return Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, (delay += step));
    });
  }
});

// function createPromise(/* параметры */) {
//   new Promise((resolve, reject) => {
//     const shoudResolve = Math.random > 0.3;

//     setTimeout(() => {
//       if (shoudResolve) {
//         resolve(/* ... */);
//       } else {
//         reject(/* ... */);
//       }
//     }, задержка);
//   });
// }
