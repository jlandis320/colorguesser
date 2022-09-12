
/*-------------------------------- Constants --------------------------------*/
// all color arrays
import { colors } from "../data/colors.js"



/*-------------------------------- Variables --------------------------------*/
const colorOptions = []
const usedColors = []
let score, timeElapsed, correctAnswerChosen, unidentifiedColor, colorOptionsArray
// timeElapsed
// correctAnswerChosen ?
// setTimeout(() => { console.log("hello")}, 2000)

/*------------------------ Cached Element References ------------------------*/
const colorPalette = document.querySelectorAll(".color-chart")

const currentColor = document.querySelector(".paintswatch")

const colorName = document.querySelector(".color-name")

const btnA = document.querySelector("#btn-a")
const btnB = document.querySelector("#btn-b")
const btnC = document.querySelector("#btn-c")
const btnD = document.querySelector("#btn-d")

/*----------------------------- Event Listeners -----------------------------*/

colorPalette.forEach(category => category.addEventListener("click", colorPicker))


/*-------------------------------- Functions --------------------------------*/
init()


function init(){
  score = 0
  timeElapsed = 0
  correctAnswerChosen = false
  unidentifiedColor = ''
}

function render() {
  renderPaintswatch()
}
  


// function colorPicker(category, numColors)
function colorPicker(evt) {
  const categoryChoice = evt.target.id
  const colorArray = colors[categoryChoice]

  getRandomColor()

  if (usedColors.includes(unidentifiedColor)){
    return
    // can this return to getRandomColor, not colorPicker(evt)
  } else if (usedColors.length === colorArray.length) {
    console.log("no more colors")
    colorName.textContent = "no more colors in category"
    return
  } else {
    usedColors.push(unidentifiedColor)
    colorOptions.unshift(unidentifiedColor)
    console.log("color array: ", colorArray);
    console.log("used colors: ", usedColors)
    render()
  }  

  let idx = colorArray.indexOf(unidentifiedColor) 
  colorArray.slice(idx, 1)
  colorOptionsArray = getMultipleRandom(colorArray, 3)
  if (colorOptions.length === 1) {
    colorOptionsArray.forEach(color => colorOptions.push(color))
  } else if (colorOptions.length > 1 ) {
    colorOptions.length = 1
    colorOptionsArray.forEach(color => colorOptions.push(color))
  }
  renderButtons()
  
  function getRandomColor() {
    unidentifiedColor = colorArray[Math.floor(Math.random() * colorArray.length)]
  }
  console.log(unidentifiedColor)
  // console.log("color Options: ", colorOptions);
}

function renderPaintswatch() {
  currentColor.style.backgroundColor = unidentifiedColor
  colorName.textContent = unidentifiedColor
}


function renderButtons() {
  colorOptions[Math.floor(Math.random() * colorOptions.length)]
  btnA.textContent = colorOptions[0]
  btnB.textContent = colorOptions[1]
  btnC.textContent = colorOptions[2]
  btnD.textContent = colorOptions[3]
}

//  function increaseScore - += 1
function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num)
}

// function getAnswer(){
//   console.log("clicked");
// }
// function colorOptionsPicker
// handleClick for category
// handleClick for buttons
// init = set color name to ?, set the color swatch to white, set the timer to 15s, score to 0


/*-------------------------------- Pseudocode -------------------------------*/

// // Create data file with category arrays: warms, cools, grays, white
// * Render function: categories display with score display, empty paint swatch with empty button choices
//     * Need a color wheel divided into 10 quadrants — add event listener to each quadrant


// * When clicked, paint swatch changes to random color from that cateory
//     * Say for reds:
//         * Randomly pull a color from warms to color paint swatch
//         * Randomly pull 3 color names + correct name for the options & 15 second timer
//         * Randomly assign colors to 
//             * Timer length may change after testing. May add option be toggled off 
//         * If correct name is chosen
//             * Score increases by 1
//             * Option to stay in category or return to color wheel
//             * Move correct guess into another array 
                  // * have random guess checked against used color array -> if it's in there, choose a different color
//         * Else 
//             * Player loses that question. Score does not increase 
//             * That color name is removed from options for the next round

//             * Option to stay in category or return to color wheel 

// * If the player plays all the way to the end, they get a percentage score pulled from their score

