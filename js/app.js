/*-------------------------------- Constants --------------------------------*/
import { colors } from "../data/colors.js";

/*-------------------------------- Variables --------------------------------*/
let colorOptions = [];
const usedColors = [];

let score,
  timer,
  min,
  sec, 
  seconds,
  unidentifiedColor,
  currentCategory,
  thisCategory,
  countDownMsg

/*------------------------ Cached Element References ------------------------*/
const colorPalette = document.querySelectorAll(".color-chart");

const currentColor = document.querySelector(".paintswatch");

const scoreDisplay = document.querySelector(".score")

const colorName = document.querySelector(".color-name");

const countDown = document.querySelector(".timer")

const startBtn = document.querySelector("#start-button")

const usedColorsMsg = document.querySelector("#used-color-msg")

const clickSound = new Audio("../audio/projector_click.mp3")
const wrongAnswer = new Audio("../audio/wrong.mp3")
const rightAnswer = new Audio("../audio/chime.mp3")
const winSong = new Audio("../audio/level_up.mp3")

const btnA = document.querySelector("#btn-0");
const btnB = document.querySelector("#btn-1");
const btnC = document.querySelector("#btn-2");
const btnD = document.querySelector("#btn-3");

/*----------------------------- Event Listeners -----------------------------*/

colorPalette.forEach((category) => category.addEventListener("click", handleClick));

startBtn.addEventListener("click", startTimer)

btnA.addEventListener("click", checkAnswer)
btnB.addEventListener("click", checkAnswer)
btnC.addEventListener("click", checkAnswer)
btnD.addEventListener("click", checkAnswer)
/*-------------------------------- Functions --------------------------------*/
init();

function init() {
  enableBtns()
  score = 0;
  min = 0
  sec = 0
  seconds = 0
  correctAnswerChosen = false;
  unidentifiedColor = "";
}


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


function render(){
  renderPaintswatch()
  renderButtons()
}

// https://www.designcise.com/web/tutorial/how-to-check-if-an-array-contains-all-elements-of-another-array-in-javascript
function getNewPaintswatch(){
  let trueLength = usedColors.filter(color => color.length > 0)
  if (trueLength.length === 141) {
    thisCategory.style.opacity = "25%"
    clearInterval(timer)
    disableBtns()
    renderWinMsg()
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
    render()
    console.log("unidentified color in getNewPaintswatch: ", unidentifiedColor)
  }
}

function checkAnswer(evt){
  if (evt.target.textContent === unidentifiedColor){
    score++
    usedColors.push(unidentifiedColor);
    playChime()
    renderScore()
    getNewPaintswatch()
  } else if (evt.target.textContent !== unidentifiedColor) {
    usedColors.push(unidentifiedColor);
    playBuzzer()
    getNewPaintswatch()
  }
  renderUCM()
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
  return options;
}


function getRandomColor(colorArray) {
  let newColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  while (newColor === unidentifiedColor || usedColors.includes(newColor)) {
    newColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  return newColor;
}

function renderPaintswatch() {
  currentColor.style.backgroundColor = unidentifiedColor;
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
  } else {
    usedColorsMsg.textContent = `You've guessed ${trueLength.length} of 141 colors`
  }
}

function renderWinMsg() {
  playWin()
  if (countDownMsg === undefined) {
    currentColor.textContent = `Congratulations! You named ${score} colors.`
    currentColor.style.backgroundColor = "gold"
  } else {
    currentColor.textContent = `Congratulations! You named ${score} colors in ${countDownMsg}.`
    currentColor.style.backgroundColor = "gold"
  }
}


function playClick(){
  clickSound.currentTime = 0
  clickSound.volume = .5
  clickSound.play()
}

function playBuzzer(){
  wrongAnswer.currentTime = 0 
  wrongAnswer.volume = .3
  wrongAnswer.play()
}

function playChime(){
  rightAnswer.currentTime = 0
  rightAnswer.volume = .5
  rightAnswer.play()
}

function playWin() {
  winSong.currentTime = 0
  winSong.volume = .5
  winSong.play()
}

function disableBtns(){
  btnA.disabled = true
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
