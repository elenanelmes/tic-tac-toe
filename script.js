const gameBoard = document.querySelector("#gameboard");
const results = document.querySelector("#results");

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
}

createBoard();

let turn = "Pumpkin";
let turnCount = 0;

function addTurn(e) {
    const showTurn = document.createElement("div");
    showTurn.classList.add(turn);
    e.target.append(showTurn);

    if (turn === "Pumpkin") {
        turn = "Ghost";
    } else {
        turn = "Pumpkin";
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

    winningCombos.forEach(combo => {
        const allSquares = document.querySelectorAll(".square");
        const pumpkinWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains("Pumpkin"));
        const ghostWins = combo.every(cell => allSquares[cell].firstChild?.classList.contains("Ghost"));

        if (pumpkinWins) {
            results.textContent = "Pumpkin wins!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        } else if (ghostWins) {
            results.textContent = "Ghost wins!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        } else if (turnCount === 9) {
            results.textContent = "Friendship wins!";
        }
    })
}