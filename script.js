const gameBoard = document.querySelector("#gameBoard");
const results = document.querySelector("#results");

const playerOne = "Pumpkin";
const playerTwo = "Ghost";

let turn = playerOne;
let turnCount = 0;

let winner;

let resetButton;

function createBoard() {
    const startCells = [
        "", "", "", "", "", "", "", "", ""
    ]

    startCells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addTurn);
        gameBoard.append(cellElement);
    })

    results.innerHTML = `${turn} goes first!`;
}

createBoard();

function addTurn(e) {
    const showTurn = document.createElement("div");
    showTurn.classList.add("player", turn);
    e.target.append(showTurn);

    if (turn === playerOne) {
        turn = playerTwo;
    } else {
        turn = playerOne;
    }

    turnCount++;
    results.textContent = `It's now ${turn}'s turn.`
    e.target.removeEventListener("click", addTurn);

    checkResults();
}

function checkResults() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let gameOver = new Boolean(false);

    winningCombos.forEach(combo => {
        const allSquares = document.querySelectorAll(".square");
        const playerOneWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains(playerOne));
        const playerTwoWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains(playerTwo));

        if (playerOneWins) {
            winner = playerOne;
            results.textContent = `${winner} wins!`;
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            gameOver = true;
            return;
        } else if (playerTwoWins) {
            winner = playerTwo;
            results.textContent = `${winner} wins!`;
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            gameOver = true;
            return;
        } else if ((!playerOneWins || !playerTwoWins) && turnCount === 9) {
            winner = "Friendship";
            results.textContent = `${winner} wins!`;
            gameOver = true;
        }
    })

    if (gameOver === true) {
        setGameOver();
    }
}

function setGameOver() {
    resetButton = document.createElement("button");
    resetButton.textContent = "Play Again?";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    turnCount = 0;
    turn = winner;

    const allSquares = document.querySelectorAll(".square");
    for (const square of allSquares) {
        square.textContent = "";
        square.addEventListener("click", addTurn);
    }

    results.innerHTML = `${winner} goes first!`;

    resetButton.parentNode.removeChild(resetButton);
}