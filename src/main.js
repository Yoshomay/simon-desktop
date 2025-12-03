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
let highScore = 0;
let moves = {};

let difficulty = 'hard';
let gameSpeed; 
let turnCount;


const scoreSpan = document.getElementById('score');
const highScoreSpan = document.getElementById('highScore');
const resetBTN = document.getElementById('restartBTN');

/*
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
}*/


//  generate turn order
function generateMoves() {
    for (let i = 0; i < turnCount; i++) {
        moves[i] = String(Math.floor(Math.random() * 4) + 1);
        }
    if (debug == true) {console.log(moves);}
}

//  clear game
function clearGame(resetScore) {
    if (resetScore == true) {
        highScore = 0; 
        document.getElementById('highScore').textContent = '0';
    }
    else if (score > highScore) {
        highScore = score;
        document.getElementById('highScore').textContent = score;
    }

    score = 0;
    document.getElementById('score').textContent = '0';

    currentMove = 0;

    localMove = 0;
    document.getElementById('localMoveSpan').textContent = '0';



    switch (difficulty) {
        case 'easy': 
            gameSpeed = 1500; 
            turnCount = 5;
            break;

        case 'medium': 
            gameSpeed = 1000; 
            turnCount = 10;
            break;

        case 'hard': 
            gameSpeed = 500; 
            turnCount = 16;
            break;

        case 'veryHard': 
            gameSpeed = 300; 
            turnCount = 25;
            break;
    }
    moves = {};
    generateMoves();
    showOrder();
}



//  code for clickin the buttons
for (let i = 1; i < 5; i++) {
    document.getElementById(i).addEventListener("click", (clickedBTN) => {

        if (clickedBTN.target.id == moves[localMove]) {
            console.log('correct');

            //playAudio(sounds2[clickedBTN.target.id]);

            if (localMove == currentMove) {  //  you finished 1 loop
                currentMove++;

                localMove = 0;
                document.getElementById('localMoveSpan').textContent = 0;

                score++; 
                document.getElementById('score').textContent = score;
            showOrder();
}
            else {localMove++; document.getElementById('localMoveSpan').textContent = localMove;}
        }
        else {
            console.log('incorrect');
            clearGame();
        }

    });
}

function showOrder() {
    document.getElementById('overlay').style.display = 'block';

    console.clear();
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

            //playAudio(sounds1[moves[i]]);

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
setTimeout(() => {document.getElementById('overlay').style.display = 'none';}, currentMove * gameSpeed + gameSpeed + gameSpeed);  
}




document.getElementById('cheat').addEventListener("click", () => {
    if (moves[1] == null) {return;}
    document.getElementById(moves[String(localMove)]).click();

})


document.getElementById('resetBTN').addEventListener("click", () => clearGame(true));

document.getElementById('restartBTN').addEventListener("click", () => {
    clearGame();
    document.getElementById('restartBTN').textContent = 'Restart';
});

