/*-------------------------------- Constants --------------------------------*/
// all color arrays
import { colors, allColors, colorValuesLUT } from "../data/colors.js";

/*-------------------------------- Variables --------------------------------*/
let colorOptions = [];
const usedColors = [];
let score,
  timeElapsed,
  timer,
  winTime, 
  min,
  sec, 
  seconds,
  correctAnswerChosen,
  unidentifiedColor,
  currentCategory,
  thisCategory,
  clickCount,
  gameStarted,
  countDownMsg,
  nightmareMode

// timeElapsed
// correctAnswerChosen ?
// setTimeout(() => { console.log("hello")}, 2000)

/*------------------------ Cached Element References ------------------------*/
const colorPalette = document.querySelectorAll(".color-chart");

const currentColor = document.querySelector(".paintswatch");

const scoreDisplay = document.querySelector(".score")

const colorName = document.querySelector(".color-name");

const countDown = document.querySelector(".timer")

const startBtn = document.querySelector("#start-button")

const bodyEl = document.querySelector('body')

const nightMareModeBtn = document.querySelector('#dont-click')

const titleH1El = document.querySelector('h1')

const msgEl = document.querySelector('#msg')

const usedColorsMsg = document.querySelector("#used-color-msg")
const clickSound = new Audio("../audio/projector_click.mp3")
const wrongAnswer = new Audio("../audio/wrong.mp3")
const rightAnswer = new Audio("../audio/chime.mp3")

const button = document.querySelectorAll(".button")
const btnA = document.querySelector("#btn-0");
const btnB = document.querySelector("#btn-1");
const btnC = document.querySelector("#btn-2");
const btnD = document.querySelector("#btn-3");

/*----------------------------- Event Listeners -----------------------------*/

colorPalette.forEach((category) => category.addEventListener("click", handleClick));

startBtn.addEventListener("click", startGame)

btnA.addEventListener("click", checkAnswer)
btnB.addEventListener("click", checkAnswer)
btnC.addEventListener("click", checkAnswer)
btnD.addEventListener("click", checkAnswer)

nightMareModeBtn.addEventListener('click', toggleNightmareMode)
// btnA.addEventListener("click", revealName)
// btnB.addEventListener("click", revealName)
// btnC.addEventListener("click", revealName)
// btnD.addEventListener("click", revealName)
/*-------------------------------- Functions --------------------------------*/
init();

function init() {
  btnA.disabled = false
  btnB.disabled = false
  btnC.disabled = false
  btnD.disabled = false
  clickCount = 0;
  score = 0;
  winTime = 0 
  min = 0
  sec = 0
  seconds = 0
  nightmareMode = false
  titleH1El.style.color = 'mediumslateblue'
  correctAnswerChosen = false
  unidentifiedColor = ""
  gameStarted = false
  console.log("on init: ", colorName.classList.value);
}

function startGame() {
  startTimer()
  gameStarted = true
}

console.log("gameStarted = ", gameStarted)

function handleClick(evt) {
  const categoryChoice = evt.target.id;
  thisCategory = evt.target
  const colorArray = colors[categoryChoice];
  currentCategory = colorArray
  if (currentCategory){
    playClick()
  }
  getNewPaintswatch()
}

// } else {
//   colorName.textContent = "Click the start button!"
// }
function render(){
  renderPaintswatch()
  renderButtons()
}

function getNewPaintswatch(){
  let trueLength = usedColors.filter(color => color.length > 0)
  if (trueLength.length === 141) {
    thisCategory.style.opacity = "25%"
    clearInterval(timer)
    disableBtns()
    return;
  } else if (currentCategory.every(color => trueLength.includes(color)) && trueLength.length < 141) {
    disableBtns()
    colorName.textContent = "Choose another category from the palette"
    thisCategory.style.opacity = "25%"
    return
  } else {
    enableBtns()
    colorName.textContent = "What color am I?"
    unidentifiedColor = getRandomColor(currentCategory);
    colorOptions.unshift(unidentifiedColor);
    colorOptions = getColorOptions(currentCategory);
    // setTimeout(() => { render() }, 500)
    render()
    console.log("unidentified color in getNewPaintswatch: ", unidentifiedColor)
  }
  if(nightmareMode) changeBackgroundAtRandom()
}

function checkAnswer(evt){
  let playerChoice = evt.target
  if (evt.target.textContent === unidentifiedColor){
    score++
    usedColors.push(unidentifiedColor);
    msgEl.innerText = `Nice, it was ${unidentifiedColor}`
    // playerChoice.style.backgroundColor = "green"
    playChime()
    renderScore()
    getNewPaintswatch()
  } else if (evt.target.textContent !== unidentifiedColor) {
    usedColors.push(unidentifiedColor);
    msgEl.innerText = `Nope, it was ${unidentifiedColor}`
    playWhoosh()
    getNewPaintswatch()
  }
  renderUCM()
}


function revealName(){
  colorName.classList.toggle('placeholder')
  colorName.textContent = unidentifiedColor
  console.log(colorName.classList.value)
//   if (score++){
//     colorName.style.color = "green"
//   } 
}

function startTimer(){
  timer = setInterval(tick, 1000)
}

function tick(){
  seconds++
  renderTime()
}

function renderTime(){
  min = Math.floor(seconds / 60)
  sec = seconds % 60
  if (sec < 10){
    countDown.textContent = `${min}:0${sec}`
    countDownMsg = countDown.textContent
  } else {
    countDown.textContent = `${min}:${sec}`
    countDownMsg = countDown.textContent
  }
}

function getColorOptions(colorArray) {
  const shuffledColorOptions = shuffle(colorArray);
  const filtered = shuffledColorOptions.filter((c) => c !== colorOptions[0]);
  const options = filtered.slice(0, 3);
  options.push(colorOptions[0]);
  return nightmareMode
    ? convertNamedToHex(options)
    : options
}

function convertNamedToHex(arr){
  return arr.map(color => colorValuesLUT.find(colorObj => color === colorObj.name.toLowerCase())?.hex ?? color)
}


function getRandomColor(colorArray) {
  let newColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  while (newColor === unidentifiedColor || usedColors.includes(newColor)) {
    newColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  return nightmareMode 
    ? convertColorToHex(newColor)
    : newColor
}

function convertColorToHex(color){
  return colorValuesLUT.find(colorObj => colorObj.name.toLowerCase() === color).hex
}

function renderPaintswatch() {
  currentColor.style.backgroundColor = unidentifiedColor;
  console.log("unidentified color in renderPaintswatch: ", unidentifiedColor);
  // colorName.classList.add('placeholder') 
}

function renderButtons() {
  const shuffledOptions = shuffle(colorOptions);
  shuffledOptions.forEach((c, idx) => {
    const btn = document.querySelector(`#btn-${idx}`);
    btn.textContent = c;
  });
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function renderScore() {
  scoreDisplay.textContent = `${score}/141`
}

function renderUCM() {
  let trueLength = usedColors.filter(color => color.length > 0)
  if (trueLength.length === 0) {
    usedColorsMsg.textContent = `You haven't guessed any colors yet!`
  } else if (trueLength !== 141 && trueLength !== 0) {
    usedColorsMsg.textContent = `You've guessed ${trueLength.length} of 141 colors`
  } else {
    usedColorsMsg.textContent = `You guessed 141 colors in ${countDownMsg}`
  }
}

function playClick(){
  clickSound.currentTime = 0
  clickSound.volume = .5
  clickSound.play()
  if(nightmareMode) changeBackgroundAtRandom()
}

function changeBackgroundAtRandom(){
  bodyEl.style.backgroundColor = allColors[Math.floor(Math.random()*allColors.length)]
}

function playWhoosh(){
  wrongAnswer.currentTime = 0 
  wrongAnswer.volume = .3
  wrongAnswer.play()
}

function playChime(){
  rightAnswer.currentTime = 0
  rightAnswer.volume = .5
  rightAnswer.play()
}

function disableBtns(){
  btnA.disabled = true
  btnA.classList.remove(".button")
  btnB.disabled = true
  btnC.disabled = true
  btnD.disabled = true
}

function enableBtns() {
  btnA.disabled = false
  btnB.disabled = false
  btnC.disabled = false
  btnD.disabled = false
}

function toggleNightmareMode(){
  nightmareMode = true
  titleH1El.style.color = 'red'
  changeBackgroundAtRandom()
}