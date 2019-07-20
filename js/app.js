var cells = document.querySelectorAll('.cell');
var playerOneObj = document.querySelector('.player-one');
var playerTwoObj = document.querySelector('.player-two');
var winningBoard = document.querySelectorAll('.winner');
var playerOneScoreSpan = document.querySelector('.player-one-score');
var playerTwoScoreSpan = document.querySelector('.player-two-score');
var winnerSection = document.querySelector('.winner-section');
var winningPlayer = document.querySelector('.winning-player');
var newGameBtn = document.querySelector('.new-game-btn');
var resetScoresBtn = document.querySelector('.reset-btn');

var playerOneMoves = [];
var playerTwoMoves = [];
var activePlayer = 1;
var playerOneScore = 0;
var playerTwoScore = 0;
var gameFinished = false;
var winner;

// 0 => unplayed
// 1 => player 1 (X)
// 2 => player 2 (O)
// 9 => disabled
var boards = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];

// 0 => unfinished
// 1 => player 1 (X)
// 2 => player 2 (O)
// 3 => draw
var masterBoard = [0,0,0,0,0,0,0,0,0];

var winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// keeps the history of moves for each player
var updatePlayerMoves = function(id) {
    if (activePlayer === 1) {
        playerOneMoves.push(id);
    } else {
        playerTwoMoves.push(id);
    };
};

// alternate the active player after each move
var changePlayer = function(){
    if (activePlayer === 1) {
        playerOneObj.classList.remove('active-player')
        activePlayer = 2;
        playerTwoObj.classList.add('active-player')
    } else {
        playerTwoObj.classList.remove('active-player')
        activePlayer = 1;
        playerOneObj.classList.add('active-player')
    }
};

// update the dom with the current state of the board
var updateBoard = function() {
    var k = 0;
    for (var j = 0; j < boards.length; j++) {
        for (var i = 0; i < boards[j].length; i++) {
            if (boards[j][i] === 1) {
                cells[k].textContent = "X";
            } else if (boards[j][i] === 2) {
                cells[k].textContent = "O";
            }
            k++;
        }
    };
    for (var l = 0; l < masterBoard.length; l++) {
        if (masterBoard[l] === 1) {
            winningBoard[l].classList.add('cross');
        } else if (masterBoard[l] === 2) {
            winningBoard[l].classList.add('nought');
        } else if (masterBoard[l] === 3) {
            winningBoard[l].classList.add('draw');
        }
    };
};

var updateScore = function() {
    playerOneScoreSpan.textContent = playerOneScore;
    playerTwoScoreSpan.textContent = playerTwoScore;
};

var checkForWin = function() {
    // inner board
    for (var j = 0; j < boards.length; j++) {
        for (var i = 0; i < winningCombos.length; i++) {
            if (boards[j][winningCombos[i][0]] === 1 && boards[j][winningCombos[i][1]] === 1 && boards[j][winningCombos[i][2]] === 1) {
                masterBoard[j] = 1;
            } else if (boards[j][winningCombos[i][0]] === 2 && boards[j][winningCombos[i][1]] === 2 && boards[j][winningCombos[i][2]] === 2) {
                masterBoard[j] = 2;
            }
        }
    };
    // master board
    for (var k = 0; k < winningCombos.length; k++) {
        if (masterBoard[winningCombos[k][0]] === 1 && masterBoard[winningCombos[k][1]] === 1 && masterBoard[winningCombos[k][2]] === 1) {
            winner = 'THE WINNER IS: PLAYER ONE';
            gameFinished = true;
            playerOneScore++;
            console.log('PLAYER ONE WINS')
        } else if (masterBoard[winningCombos[k][0]] === 2 && masterBoard[winningCombos[k][1]] === 2 && masterBoard[winningCombos[k][2]] === 2) {
            winner = 'THE WINNER IS: PLAYER TWO';
            gameFinished = true;
            playerTwoScore++;
            console.log('PLAYER TWO')
        }
    };
};

var checkForDraw = function() {
    for (var i = 0; i < boards.length; i++) {
        if (boards[i].includes(0) === false && masterBoard[i] === 0) {
            masterBoard[i] = 3;
        }
    }
    if (masterBoard.includes(0) === false && gameFinished === false) {
        winner = 'NOBODY WINS';
        gameFinished = true;
    }
};

// prevent a player from selecting an empty cell on an inner board that has finished
var disableAllCells = function() {
    for (var i = 0; i < boards.length; i++) {
        if (masterBoard[i] !== 0 && boards[i].includes(0)) {
            var board = boards[i];
            board.forEach(function(cell, index) {
                if (cell === 0) {
                    board[index] = 9;
                }
            })
        }
    }
};

// prevent a player from continuing to play once the overall game has finished
var endGame = function() {
    for (var i = 0; i < boards.length; i++) {
        if (boards[i].includes(0)) {
            var board = boards[i];
            board.forEach(function(cell, index) {
                if (cell === 0) {
                    board[index] = 9;
                }
            })
        }
    }
};

var newGame = function() {
    // reset variables
    gameFinished = false;
    winner = null;
    playerOneMoves = [];
    playerTwoMoves = [];
    boards = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ];
    masterBoard = [0,0,0,0,0,0,0,0,0];
    // remove all text content from the board
    var k = 0;
    for (var j = 0; j < boards.length; j++) {
        for (var i = 0; i < boards[j].length; i++) {
            cells[k].textContent = "";
            k++;
        }
    };
    // remove inner board formatting
    for (var l = 0; l < masterBoard.length; l++) {
        winningBoard[l].classList.remove('cross');
        winningBoard[l].classList.remove('nought');
        winningBoard[l].classList.remove('draw');
    };
    // hide winner section
    winnerSection.style.display = "none"; 
};

var resetScores = function() {
    playerOneScore = 0;
    playerTwoScore = 0;
    updateScore();
    newGame();
};

// main function which is called every time a player clicks on a cell
var makeMove = function() {
    var id = event.target.dataset.id
    var board = Number(id.split('')[0])
    var position = Number(id.split('')[1])
    // prevent click on a cell that has already been played
    if (boards[board][position] !== 0) {
        return;
    };
    console.log('Player ' + activePlayer + ' = ' + event.target.dataset.id)
    boards[board][position] = activePlayer
    updatePlayerMoves(id);
    changePlayer();
    checkForWin();
    checkForDraw();
    if (gameFinished === true) {
        endGame();
        winningPlayer.textContent = winner;
        winnerSection.style.display = "block";
    }
    updateBoard();
    updateScore();
    disableAllCells();
    updateScore();
};

// provide the score when the game first loads
updateScore();

// event listeners
cells.forEach(cell => {
    cell.addEventListener('click', makeMove)
});

newGameBtn.addEventListener('click', newGame);
resetScoresBtn.addEventListener('click', resetScores);