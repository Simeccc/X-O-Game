// VARIABLE SELECTION 
// START GAME VARIABLES
let totalRounds = document.querySelector('.enter-total-rounds');
let enterFirstName = document.querySelector('.enter-first-name');
let enterSecondName = document.querySelector('.enter-second-name');
let startGameButton = document.querySelector('.start-game-button');
let startGameDesign = document.querySelector('.start-game-design');
let gameDesign = document.querySelector('.game-design');

//CREATED VARIABLES
let totalRoundsNum;
let totalRoundsStatus = false;
let playerOneName = "";
let playerTwoName = "";
let firstNameStatus = false;
let secondNameStatus = false;

//START GAME CALL FUNCTIONS
enterTotalRounds();
enterPlayersNames();
startGame();

//START GAME FUNCTIONS
function enterTotalRounds(){
    totalRounds.addEventListener('click', function() {
        totalRoundsNum = parseInt(prompt("Enter total rounds"));
        if(totalRoundsNum > 0 && totalRoundsNum < 100){
            totalRounds.innerHTML = `Total rounds : ${totalRoundsNum}`;
            totalRoundsStatus = true;
        }
        else {
            alert("Total rounds must be between 1 and 99!");
        }
    })
}

function enterPlayersNames() {
    enterFirstName.addEventListener('click', function() {
        enterFirstName.innerHTML = prompt("Enter Player One name");
        if(enterFirstName !== "Player 1 Name"){
            firstNameStatus = true;
        }
        else {
            alert("Please enter both names!");
            firstNameStatus = false;
        }
        playerOneName = enterFirstName.innerHTML;
    });
    enterSecondName.addEventListener('click', function() {
        enterSecondName.innerHTML = prompt("Enter Player Two name");
        if(enterSecondName !== "Player 1 Name"){
            secondNameStatus = true;
        }
        else {
            alert("Please enter both names!");
            secondNameStatus = false;
        }
        playerTwoName = enterSecondName.innerHTML;
    });
}

function startGame() {
    startGameButton.addEventListener('click', function() {
        if((firstNameStatus === true) && (secondNameStatus === true) && (totalRoundsStatus === true)) {
            startGameDesign.style.display = "none";
            gameDesign.style.display = "block";
            createTable();
        }
        else {
            alert("Please fill all fields!");
        }
    });
}

// GAME 
// GAME VARIABLES
let totalRoundsGame = document.querySelector('.total-rounds');
let playerOneScore = document.querySelector('.player-one-score');
let playerTwoScore = document.querySelector('.player-two-score');
let gameContainer = document.querySelector('.game-container')

// CREATED VARIABLES 
let boxes;
let symbol = "O";
let scoreX = 0;
let scoreO = 0;
let clicks = -1;
//GAME CALL FUNCTIONS

// GAME FUNCTIONS 
function createTable() {
    totalRoundsGame.innerHTML = `Total rounds : ${totalRoundsNum}`;
    
    playerOneScore.innerHTML = `${playerOneName} : 0`;
    playerTwoScore.innerHTML = `${playerTwoName} : 0`;

    let text = "";
    
    for (let i = 0; i < 9; i++) {
        text += "<div class='box'></div>";
    }

    gameContainer.innerHTML = text;
    
    boxes = document.querySelectorAll('.box');

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', addSymbols);
    }
}

function addSymbols() {
    if (symbol === "X") {
        symbol = "O"
    } else {
        symbol = "X"
    }

    this.innerHTML = symbol;
    this.removeEventListener('click', addSymbols);

    checkWinner();
}

function checkWinner() {
    let lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

    lines.forEach(function(line) {
        let box1 = boxes[line[0]];
        let box2 = boxes[line[1]];
        let box3 = boxes[line[2]];

        if(box1.innerHTML === box2.innerHTML &&
            box1.innerHTML === box3.innerHTML &&
            box1.innerHTML !== "") {
            setTimeout(function() {
                box1.style.background = "#64b4eb";
                box2.style.background = "#64b4eb";
                box3.style.background = "#64b4eb";
            }, 1000);   
            nextRounds(box1, box2, box3);
        } 
    });

    clicks++;
    if(clicks === boxes.length -1 && boxes[clicks] !== "") {
        restartGame();

        gameDesign.style.display = "none";
        displayWinnerDesign.style.display = "block";

        winnerStatus.innerHTML = `&#11088; RESULT &#11088;`;
        winner.innerHTML = `NO WINNER`;
    }
}

function nextRounds(box1, box2, box3) {
    setTimeout(function() {
        box1.style.background = "transparent"
        box2.style.background = "transparent"
        box3.style.background = "transparent"
            
        createTable();
        updatePlayerScore();
        updateRounds();
    },3000);
}

function updatePlayerScore() {
    if(symbol === "X") {
        scoreX++;
    }
    else {
        scoreO++;
    }
    playerOneScore.innerHTML = `${playerOneName} : ${scoreX}`
    playerTwoScore.innerHTML = `${playerTwoName} : ${scoreO}`
}

function updateRounds(){
    totalRoundsNum--;
    totalRoundsGame.innerHTML = `Total rounds : ${totalRoundsNum}`;
    
    if(totalRoundsNum < 1) {
        displayWinner();
    }
}

//DISPLAY WINNER DESIGN
// DISPLAY WINNER VARIABLES
let displayWinnerDesign = document.querySelector('.display-winner-design');
let winnerStatus = document.querySelector('.winner-status');
let winner = document.querySelector('.winner');
let playAgain = document.querySelector('.play-again-btn');

// CREATED VARIABLES 

//DISPLAY WINNER CALL FUNCTIONS

// DISPLAY WINNER FUNCTIONS 
function displayWinner() {
    if(scoreX > scoreO) {
        winner.innerHTML = `${playerOneName}`;
    }
    if(scoreO > scoreX) {
        winner.innerHTML = `${playerTwoName}`;
    }
    if(scoreX === scoreO) {
        winnerStatus.innerHTML = `&#11088; RESULT &#11088;`;
        winner.innerHTML = `DRAW`;
    }
    gameDesign.style.display = "none";
    displayWinnerDesign.style.display = "block";

    restartGame();
}

//RESTART GAME - NEW GAME
function restartGame() {
    playAgain.addEventListener('click', function() {
        newGame();
    });
}

function newGame() {
    location.reload();
}

