
/*-------------------------------- Constants --------------------------------*/
// all color arrays
import { colors } from "../data/colors.js"



/*-------------------------------- Variables --------------------------------*/
const colorOptions = []
const usedColors = []
let score, timeElapsed, correctAnswerChosen, unidentifiedColor 
// timeElapsed
// correctAnswerChosen ?
// setTimeout(() => { console.log("hello")}, 2000)

/*------------------------ Cached Element References ------------------------*/
const colorPalette = document.querySelectorAll(".color-chart")

const currentColor = document.querySelector(".paintswatch")




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
  currentColor.style.backgroundColor = unidentifiedColor
  console.log("used colors: ", usedColors)
}

// function colorPicker(category, numColors)
function colorPicker(evt) {
  const categoryChoice = evt.target.id
  const colorArray = colors[categoryChoice]
  console.log(colorArray)
  unidentifiedColor = (colorArray[Math.floor(Math.random() * colorArray.length)]) 
  console.log("name this color: ", unidentifiedColor)
  
  usedColors.push(unidentifiedColor)
  console.log(usedColors)
  render()
}


//  function increaseScore - += 1
// function colorOptionsPicker
// handleClick for category
// handleClick for buttons
// renderFunction = set color name to ?, set the color swatch to white, set the timer to 15s, score to 0


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

