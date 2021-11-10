import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.js';

const form = document.querySelector('.form');
const inputDelay = document.querySelector("input[name='delay']");
const inputStep = document.querySelector("input[name='step']");
const inputAmount = document.querySelector("input[name='amount']");
// btn.addEventListener('submit');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    return setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject(position, delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const firstDelay = parseInt(inputDelay.value);
  const step = parseInt(inputStep.value);
  const amount = parseInt(inputAmount.value);
  let delay = firstDelay;

  for (let i = 0; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          return Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, (delay += step));
      })
      .catch(({ position, delay }) =>
        setTimeout(() => {
          return Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, (delay += step)),
      );
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
