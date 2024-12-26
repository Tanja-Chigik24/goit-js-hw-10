'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// ++++++++++ Styles ++++++++++++++++

const timerRef = document.querySelector('.timer');
const fieldsRef = document.querySelectorAll('.field');
const valuesRef = document.querySelectorAll('.value');
const labelsRef = document.querySelectorAll('.label');

// ++++++++++++ Timer ++++++++++++++++

const startBtnRef = document.querySelector('[data-start]');
const inputRef = document.getElementById('datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtnRef.disabled = true;

// ++++++++++++ Calendar creation ++++++++++++++++

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (startBtnRef.dataset.start === 'active') {
      startBtnRef.disabled = true;
      return;
    }
    const date = Date.now();
    const deltaTime = selectedDates[0].getTime() - date;
    if (deltaTime <= 0) {
      iziToast.show({
        message: 'Please choose a date in the future',
        maxWidth: '302px',
        position: 'topRight',
        messageSize: '16px',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        iconColor: '#fafafb',
        close: true,
      });

      return;
    }

    startBtnRef.disabled = false;
  },
};
flatpickr(inputRef, options);

startBtnRef.addEventListener('click', onClickStart);

function onClickStart() {
  startBtnRef.disabled = true;
  startBtnRef.dataset.start = 'active';
  inputRef.disabled = true;
  const selectedDate = new Date(inputRef.value);

  const timerId = setInterval(() => {
    let currentDate = new Date();
    let deltaTime = selectedDate.getTime() - currentDate.getTime();

    if (deltaTime <= 0) {
      clearInterval(timerId);
      startBtnRef.dataset.start = 'not-active';
      inputRef.disabled = false;
      iziToast.show({
        message: 'Time is up!',
        maxWidth: '302px',
        position: 'topRight',
        color: 'green',
        close: true,
      });
      return;
    }
    setTheTimer(deltaTime);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function setTheTimer(deltaTime) {
  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  daysRef.textContent = `${addLeadingZero(days)}`;
  hoursRef.textContent = `${addLeadingZero(hours)}`;
  minutesRef.textContent = `${addLeadingZero(minutes)}`;
  secondsRef.textContent = `${addLeadingZero(seconds)}`;
}
