//  enable this to have debug info shown
let debug = false;

if (debug == true) {
    const debugThings = document.getElementsByClassName('debug');
    for (let i = 0; i < debugThings.length; i++) {
        debugThings[i].style.display = 'inline';
    }
}

const scoreSpan = document.getElementById('score');
const localMoveSpan = document.getElementById('localMoveSpan');
const resetBTN = document.getElementById('restartBTN');
const mainMenuContainer = document.getElementById('mainMenuContainer');
const gameplayContainer = document.getElementById('gameplayContainer');
const overlay = document.getElementById('overlay');
const customMenuContainer = document.getElementById('customMenu');
const victoryContainer = document.getElementById('victoryContainer');


let moves = {};
let currentMove = 0;
let localMove = 0;
let difficulty;
let turnCount;
let gameSpeed; 
let isCustom = false;

/*
const sounds1 = {
    1: new Audio('sounds/1_1.mp3'),
    2: new Audio('sounds/1_2.mp3'),
    3: new Audio('sounds/1_3.mp3'),
    4: new Audio('sounds/1_4.mp3')
}
const sounds2 = {
    1: new Audio('sounds/2_1.mp3'),
    2: new Audio('sounds/2_2.mp3'),
    3: new Audio('sounds/2_3.mp3'),
    4: new Audio('sounds/2_4.mp3')
}
const sounds3 = {
    1: new Audio('sounds/3_1.mp3'),
    2: new Audio('sounds/3_2.mp3'),
    3: new Audio('sounds/3_3.mp3'),
    4: new Audio('sounds/3_4.mp3')
}*/

function newDisplay(element, newValue) {
    element.style.display = newValue;}


//  generate turn order
function generateMoves() {
    for (let i = 0; i < turnCount; i++) {
        moves[i] = String(Math.floor(Math.random() * 4) + 1);
        }
    console.log(moves);
}

//  clear game
function clearGame() {
    currentMove = 0;
    scoreSpan.textContent = '0';

    localMove = 0;
    localMoveSpan.textContent = '0';



    switch (difficulty) {
        case 'easy': 
            gameSpeed = 1000; break;

        case 'medium': 
            gameSpeed = 1000; break;

        case 'hard': 
            gameSpeed = 500; break;

        case 'veryHard': 
        case 'endless':
            gameSpeed = 300; break;
    }

    if (isCustom == false) {
    switch (difficulty) {
        case 'easy': 
            turnCount = 5; break;

        case 'medium': 
            turnCount = 10; break;

        case 'hard': 
            turnCount = 16; break;

        case 'veryHard':  
            turnCount = 24; break;

        case 'endless':
            turnCount = 9999; break;
    }}
    
    newDisplay(victoryContainer, "none");
    newDisplay(overlay, "none")
    overlay.classList.remove('bgBlur');

    moves = {};
    generateMoves();
    showOrder();
}



//  code for clickin the buttons
for (let i = 1; i < 5; i++) {
    document.getElementById(i).addEventListener("click", (clickedBTN) => {
    
        //  u win
        if (clickedBTN.target.id == moves[localMove] && localMove == currentMove && currentMove == turnCount - 1) {
            
                newDisplay(overlay, "block");
                overlay.classList.add('bgBlur');
                newDisplay(victoryContainer, "grid")                 
                return;
            
        }


        if (clickedBTN.target.id == moves[localMove]) {
            //sounds1[clickedBTN.target.id].pause();
            //sounds1[clickedBTN.target.id].currentTime = 0;
            //sounds1[clickedBTN.target.id].cloneNode().play();

            if (localMove == currentMove) {  //  you finished 1 loop
                currentMove++;

                localMove = 0;
                localMoveSpan.textContent = 0;

                scoreSpan.textContent = currentMove;
            showOrder();
}
            else {localMove++; localMoveSpan.textContent = localMove;}
        }
        else {  //  clicked the wrong button
            clearGame();
        }

    });
}


function showOrder() {
    newDisplay(overlay, "block");

    console.clear();
    console.log(moves);

    setTimeout(() => {
    for (let i = 0; i < currentMove + 1; i++) {

        setTimeout(() => {
            let glowClass;
            switch (moves[i]) {
                case '1': glowClass = 'greenBTNGlow'; break;
                case '2': glowClass = 'redBTNGlow'; break;
                case '3': glowClass = 'yellowBTNGlow'; break;
                case '4': glowClass = 'blueBTNGlow'; break;
            }

            let targetBTN = document.getElementById(String(moves[i]));
            targetBTN.classList.add(glowClass);

            //sounds2[moves[i]].pause();
            //sounds2[moves[i]].currentTime = 0;
            //sounds2[moves[i]].cloneNode().play();

            setTimeout(() => {
                targetBTN.classList.remove(glowClass)
            }, 200);  //  controls how long the button glows

        console.log(moves[i]);
        }, i * gameSpeed);  //  controls how long between automatic clicks 
    }
}, gameSpeed);  //  controls how long until the buttons glow 

//  controls how long the dark overlay will last,
//  currentMove * gameSpeed to make it last the time needed, + gameSpeed to add a little bit extra before it goes away
setTimeout(() => {newDisplay(overlay, "none")}, 
currentMove * gameSpeed + gameSpeed + gameSpeed);  
}








//  in game cheat button
document.getElementById('cheat').addEventListener("click", () => {
    if (moves[1] == null) {return;}
    document.getElementById(moves[String(localMove)]).click();

})

//  back to menu button
const difficultyButtons = document.getElementsByClassName('difficultyButton');
for (let i = 0; i < difficultyButtons.length; i++) {
    difficultyButtons[i].addEventListener("click", () => {
        newDisplay(mainMenuContainer, "block");
        newDisplay(gameplayContainer, "none");
        newDisplay(customMenuContainer, "none");
        newDisplay(overlay, "none");
        newDisplay(victoryContainer, "none");
        isCustom = false;

});
}

//  title scren custom button
document.getElementById('custom').addEventListener("click", () => {
    newDisplay(mainMenuContainer, "none");
    newDisplay(customMenuContainer, "block");
})

//  start game continue difficulty button
document.getElementById('customContinueBTN').addEventListener("click", () => {
    
    if (!document.querySelector('input[name="gameSpeedInput"]:checked')) {return}
    isCustom = true;
    difficulty = document.querySelector('input[name="gameSpeedInput"]:checked').value;
    turnCount = document.getElementById('turnCountInput').value;
    
    newDisplay(customMenuContainer, "none");
    newDisplay(gameplayContainer, "block")

    setTimeout(clearGame, 400);
})



//  title screen buttons
for (let i = 0; i < 5; i++) {
    document.getElementsByClassName('col')[i].addEventListener("click", (input) => {
        mainMenuContainer.style.display = 'none';
        gameplayContainer.style.display = 'block';
        newDisplay(mainMenuContainer, "none");
        newDisplay(gameplayContainer, "block");
        difficulty = input.target.id;

        console.log(difficulty, gameSpeed, turnCount);

        setTimeout(clearGame, 400);
    })
}

//  resize gameplay buttons
function resizeBTNGrid() {
    document.getElementsByClassName('btnGrid')[0].style.width = `${window.innerWidth - 250}px`;
}

resizeBTNGrid();
window.addEventListener("resize", resizeBTNGrid);

document.getElementById("playAgain").addEventListener("click", clearGame);


//  about popup
document.getElementById('about').addEventListener("click", () => {
    newDisplay(overlay, "block");
    newDisplay(document.getElementById('aboutContainer'), "flex");
})

document.getElementById('aboutX').addEventListener("click", () => {
    newDisplay(overlay, "none");
    newDisplay(document.getElementById('aboutContainer'), "none");
})