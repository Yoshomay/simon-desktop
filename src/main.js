//  enable this to have debug info shown
const debug = true;

if (debug == true) {
    const debugThings = document.getElementsByClassName('debug');
    for (let i = 0; i < debugThings.length; i++) {
        debugThings[i].style.display = 'inline';
    }
}

let currentMove = 0;
let localMove = 0;
let score = 0;
let moves = {};

let difficulty = 'hard';
let gameSpeed; 
let turnCount;


const scoreSpan = document.getElementById('score');
const localMoveSpan = document.getElementById('localMoveSpan');
const resetBTN = document.getElementById('restartBTN');
const mainMenuContainer = document.getElementById('mainMenuContainer');
const gameplayContainer = document.getElementById('gameplayContainer');
const overlay = document.getElementById('overlay');
const customMenuContainer = document.getElementById('customMenu');


const sounds1 = {
    1: 'sounds/1_1.mp3',
    2: 'sounds/1_2.mp3',
    3: 'sounds/1_3.mp3',
    4: 'sounds/1_4.mp3'
}
const sounds2 = {
    1: 'sounds/2_1.mp3',
    2: 'sounds/2_2.mp3',
    3: 'sounds/2_3.mp3',
    4: 'sounds/2_4.mp3'
}
const sounds3 = {
    1: 'sounds/3_1.mp3',
    2: 'sounds/3_2.mp3',
    3: 'sounds/3_3.mp3',
    4: 'sounds/3_4.mp3'
}

function playAudio(file) {
    new Audio(file).play();
}


//  generate turn order
function generateMoves() {
    for (let i = 0; i < turnCount; i++) {
        moves[i] = String(Math.floor(Math.random() * 4) + 1);
        }
    if (debug == true) {console.log(moves);}
}

//  clear game
function clearGame(input) {
    score = 0;
    scoreSpan.textContent = '0';

    currentMove = 0;

    localMove = 0;
    localMoveSpan.textContent = '0';



    switch (difficulty) {
        case 'easy': 
            gameSpeed = 1500; 
            break;

        case 'medium': 
            gameSpeed = 1000; 
            break;

        case 'hard': 
            gameSpeed = 500; 
            break;

        case 'veryHard': 
            gameSpeed = 300; 
            break;

        case 'endless':
            gameSpeed = 300;
            break;
    }

    if (input != 'custom') {
    switch (difficulty) {
        case 'easy': 
            turnCount = 5;
            break;

        case 'medium': 
            turnCount = 10;
            break;

        case 'hard': 
            turnCount = 16;
            break;

        case 'veryHard': 
            gameSpeed = 300; 
            turnCount = 9999;
            break;

        case 'endless':
            turnCount = 999;
            break;
    }}


    
    moves = {};
    generateMoves();
    showOrder();
}



//  code for clickin the buttons
for (let i = 1; i < 5; i++) {
    document.getElementById(i).addEventListener("click", (clickedBTN) => {

        if (clickedBTN.target.id == moves[localMove]) {
            console.log('correct');

            playAudio(sounds2[clickedBTN.target.id]);

            if (localMove == currentMove) {  //  you finished 1 loop
                currentMove++;

                localMove = 0;
                localMoveSpan.textContent = 0;

                score++; 
                scoreSpan.textContent = score;
            showOrder();
}
            else {localMove++; localMoveSpan.textContent = localMove;}
        }
        else {
            console.log('incorrect');
            clearGame();
        }

    });
}

function showOrder() {
    overlay.style.display = 'block';

    //console.clear();
    console.log(moves);

    setTimeout(() => {
    for (let i = 0; i < currentMove + 1; i++) {
        //console.log(`showOrder(${i});`)

        setTimeout(() => {
            let glowClass;
            switch (moves[i]) {
                case '1': glowClass = 'greenBTNGlow'; break;
                case '2': glowClass = 'redBTNGlow'; break;
                case '3': glowClass = 'yellowBTNGlow'; break;
                case '4': glowClass = 'blueBTNGlow'; break;
            }

            playAudio(sounds1[moves[i]]);

            let targetBTN = document.getElementById(String(moves[i]));
            targetBTN.classList.add(glowClass);

            setTimeout(() => {
                targetBTN.classList.remove(glowClass)
            }, 200);  //  controls how long the button glows

        console.log(moves[i]);
        }, i * gameSpeed);  //  controls how long between automatic clicks 
    }
}, gameSpeed);  //  controls how long until the buttons glow 

//  controls how long the dark overlay will last,
//  currentMove * gameSpeed to make it last the time needed, + gameSpeed to add a little bit extra before it goes away
setTimeout(() => {overlay.style.display = 'none';}, currentMove * gameSpeed + gameSpeed + gameSpeed);  
}




document.getElementById('cheat').addEventListener("click", () => {
    if (moves[1] == null) {return;}
    document.getElementById(moves[String(localMove)]).click();

})

const difficultyButtons = document.getElementsByClassName('difficultyButton');
for (let i = 0; i < difficultyButtons.length; i++) {
    difficultyButtons[i].addEventListener("click", () => {
        mainMenuContainer.style.display = 'block';
        gameplayContainer.style.display = 'none';
        customMenuContainer.style.display = 'none';
        overlay.style.display = 'none';

});
}

document.getElementById('custom').addEventListener("click", () => {
    mainMenuContainer.style.display = 'none';
    customMenuContainer.style.display = 'block';
})

document.getElementById('customContinueBTN').addEventListener("click", () => {
    
    if (!document.querySelector('input[name="gameSpeedInput"]:checked')) {return}
    difficulty = document.querySelector('input[name="gameSpeedInput"]:checked').value;
    console.log(difficulty); 
    turnCount = document.getElementById('turnCountInput').value;
    
    customMenuContainer.style.display = 'none';
    gameplayContainer.style.display = 'block';

    setTimeout(clearGame('custom'), 400);

})



//  title screen buttons
for (let i = 0; i < 5; i++) {
    document.getElementsByClassName('col')[i].addEventListener("click", (input) => {
        mainMenuContainer.style.display = 'none';
        gameplayContainer.style.display = 'block';
        difficulty = input.target.id;

        console.log(difficulty, gameSpeed, turnCount);

        setTimeout(clearGame(), 400);
    })
}

//  resize gameplay buttons
function resizeBTNGrid() {
    document.getElementsByClassName('btnGrid')[0].style.width = `${window.innerWidth - 250}px`;
}

resizeBTNGrid();
window.addEventListener("resize", resizeBTNGrid);