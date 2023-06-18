import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

require("flatpickr/dist/themes/material_green.css");

const refs = {
    startButton: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds"),
    input: document.querySelector("input"),
}

Notiflix.Notify.init({failure: {
    background: 'rgba(192, 255, 238, 0.7)',
    textColor: 'rgb(73, 73, 73)',}});

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const endMs = selectedDates[0].getTime();
        const currentMs = Date.now();
        if (endMs <= currentMs){
            Notiflix.Notify.failure('Please choose a date in future');
        } else {
            refs.startButton.removeAttribute("disabled")
        }}
  };
  
const fpicker = document.querySelector("#datetime-picker")
const fp = flatpickr(fpicker, options);

refs.startButton.setAttribute("disabled", true)

function handlerTimer(){
    refs.input.setAttribute("disabled", true)
    refs.startButton.setAttribute("disabled", true)
    const timerId = setInterval(()=>{
    const endMs = fp.selectedDates[0].getTime();
    const currentMs = Date.now();
    const ms = endMs - currentMs;
    const counterValuesObj = convertMs(ms);
    if(ms > 0){
    refs.days.textContent = addLeadingZero(counterValuesObj.days);
    refs.minutes.textContent = addLeadingZero(counterValuesObj.minutes);
    refs.hours.textContent = addLeadingZero(counterValuesObj.hours);
    refs.seconds.textContent = addLeadingZero(counterValuesObj.seconds);}
    else {
        clearInterval(timerId)
        refs.input.removeAttribute("disabled")
        refs.startButton.removeAttribute("disabled")
    }
    // console.log(counterValuesObj);
    }, 1000)
}

function addLeadingZero(value){
return value = value.toString().padStart(2, "0")
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

refs.startButton.addEventListener("click", handlerTimer)