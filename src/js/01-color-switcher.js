const refs ={
    body: document.querySelector("body"),
    buttonStart: document.querySelector("button[data-start]"),
    buttonStop: document.querySelector("button[data-stop]")
}
let timerId;

refs.buttonStart.addEventListener('click', handlerColorChange)
refs.buttonStop.addEventListener("click", handlerColorStop);

function handlerColorStop(){
    refs.buttonStart.removeAttribute("disabled")
    clearInterval(timerId)
  }

function handlerColorChange (evt){
    evt.currentTarget.setAttribute("disabled", true)
  timerId = setInterval(()=>
    refs.body.style.backgroundColor = getRandomHexColor(),
     1000)}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }