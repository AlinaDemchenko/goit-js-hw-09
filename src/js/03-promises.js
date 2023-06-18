import Notiflix from 'notiflix';

Notiflix.Notify.init({
  failure: {
  background: 'rgba(54, 56, 96, 0.5)'},
  success: {
    background: 'rgba(91, 196, 173, 0.8)'
    },})

const refs = {
  form: document.querySelector("form")
}

function handler(evt){
evt.preventDefault()
const arrValues = [];
  const amount = refs.form.elements.amount.value;
  const frequency = refs.form.elements.step.value;
  const delay = refs.form.elements.delay.value;
  arrValues.push(amount, frequency, delay)

  if (arrValues.every(el=>Number(el) > 0)){
    setTimeout(()=>{
      for (let i = 0; i < amount; i += 1)
      {createPromise(i, frequency).then(({i, frequency}) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i + 1} in ${frequency * i + Number(delay)}ms`);
      })
      .catch(({i, frequency }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i + 1} in ${frequency * i + Number(delay)}ms`);
      });}
     }, delay)}
  else {
    Notiflix.Notify.failure("Enter a positive value!");}}

 
function createPromise(i, frequency) {
  const promise = new Promise((resolve, reject)=>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    if (shouldResolve){
      resolve({i, frequency})
    } else{
      reject({i, frequency})
    }}, frequency * i)
  })
return promise}

refs.form.addEventListener('submit', handler)
