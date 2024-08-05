const gameBoard = document.querySelector("#gameBoard");
const results = document.querySelector("#results");

const playerOne = "Pumpkin";
const playerTwo = "Ghost";
const draw = "Friendship";

let turn = playerOne;
let turnCount = 0;

let winner;

let resetButton;

function createBoard() {
    const gridCells = [
        "", "", "", "", "", "", "", "", ""
    ]

    gridCells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addTurn);
        gameBoard.append(cellElement);
    })

    results.innerHTML = `${turn} goes first.`;
}

createBoard();

function addTurn(e) {
    const showTurn = document.createElement("div");
    showTurn.classList.add("player", turn);
    e.target.append(showTurn);

    e.target.removeEventListener("click", addTurn);

    turnCount++;
    checkResults();

    if (winner) {
        announceWinner(winner);
        setGameOver();
    } else {
        turn = (turn === playerOne) ? playerTwo : playerOne;
        results.textContent = `It's now ${turn}'s turn.`;
    }
}

function announceWinner(winner) {
    results.textContent = `${winner} wins!`;
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

    const allSquares = document.querySelectorAll(".square");

    winningCombos.forEach(combo => {
        const playerOneWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains(playerOne));
        const playerTwoWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains(playerTwo));

        if (playerOneWins) {
            winner = playerOne;
        } else if (playerTwoWins) {
            winner = playerTwo;
        }
    });

    if (!winner && turnCount === 9) {
        winner = draw;
    }
}

function setGameOver() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));

    resetButton = document.createElement("button");
    resetButton.textContent = "Play Again";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    turnCount = 0;

    if (winner === playerOne || winner === playerTwo) {
        turn = winner;
    } else {
        turn = playerOne;
    }
    winner = null;
    results.innerHTML = `${turn} goes first.`;

    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => {
        square.innerHTML = "";
        square.addEventListener("click", addTurn);
    });

    resetButton.remove();
}
