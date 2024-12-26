'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const radios = document.querySelectorAll('input[name="state"]:checked');
  const delay = Number(formRef.delay.value);
  function createPromise(delay) {
    return new Promise((resolve, rejecte) => {
      setTimeout(() => {
        for (let radio of radios) {
          if (radio.value == 'fulfilled') {
            resolve();
          } else {
            rejecte();
          }
        }
      }, delay);
    });
  }

  createPromise(delay)
    .then(delay => {
      iziToast.success({
        title: 'OK',
        titleColor: '#fff',
        theme: 'light',
        message: `Fulfilled promise in ${formRef.delay.value}ms`,
        maxWidth: '383px',
        position: 'topRight',
        messageSize: '16px',
        messageColor: '#fff',
        backgroundColor: '#59a10d',

        close: true,
      });
    })

    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${formRef.delay.value}ms`,
        maxWidth: '302px',
        position: 'topRight',
        messageSize: '16px',
        messageColor: '#fff',
        backgroundColor: ' #ef4040',
        close: true,
      });
    });
}
