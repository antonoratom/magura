//------ CALCULATE WIDTH OF BAR, SET PERCENTS --------//
// Select elements by their attributes
let collectedCurrentElement = document.querySelector("[collected-current]");
let collectedGoalElement = document.querySelector("[collected-goal]");
let collectedPercentsElement = document.querySelector("[collected-percents]");
let collectedBarElement = document.querySelector("[collected-bar]");

let collectedCurrent = parseFloat(collectedCurrentElement.innerText);
let collectedGoal = parseFloat(collectedGoalElement.innerText);

let collectedPercents = (collectedCurrent * 100) / collectedGoal;

collectedPercentsElement.innerText = collectedPercents.toFixed(0);

collectedBarElement.style.width = collectedPercents + "%";
//------ END OF CALCULATE WIDTH OF BAR, SET PERCENTS --------//
