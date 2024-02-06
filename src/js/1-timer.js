import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePickerRef = document.querySelector("#datetime-picker");
const btnStartRef = document.querySelector("[data-start]");
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate < Date.now()) {
        iziToast.error({
          message: 'Please choose a date in the future',
          position: 'topRight',
        });
        btnStartRef.disabled = true;
      } else {
        btnStartRef.disabled = false;
      };
    },
  };

  flatpickr(datetimePickerRef, options);

  btnStartRef.addEventListener("click", btnStartClick);
  btnStartRef.disabled = true;

  function btnStartClick() {
    btnStartRef.disabled = true;
    datetimePickerRef.disabled = true;
    const intervalId = setInterval(() => {
        if (userSelectedDate - new Date() >= 0) {
            const timerDate = convertMs(userSelectedDate - new Date());
            daysRef.textContent = addLeadingZero(timerDate.days);
            hoursRef.textContent = addLeadingZero(timerDate.hours);
            minutesRef.textContent = addLeadingZero(timerDate.minutes);
            secondsRef.textContent = addLeadingZero(timerDate.seconds);
        } else {
            clearInterval(intervalId);
            datetimePickerRef.disabled = false;
        }
    }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }