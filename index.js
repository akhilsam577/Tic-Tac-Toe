const statusDisplay = document.querySelector(".gameStatus");
let gameActive = true;
let currentPlayer = "X";

let gameStatus = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `KING--> ${currentPlayer} `;

const drawMessage = () => `PLAY WISE GUYS..!ITS DRAW`;

const currentPlayerTurn = () => `its ${currentPlayer}'s TURN`;
statusDisplay.innerHTML = currentPlayerTurn();
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winningCondition = winningConditions[i];
    let a = gameStatus[winningCondition[0]];
    let b = gameStatus[winningCondition[1]];
    let c = gameStatus[winningCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  let gameDraw = !gameStatus.includes("");
  if (gameDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameStatus[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  if (gameStatus[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  // clickedCell.innerHTML=currentPlayer;

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

handleResetGame = () => {
  gameActive = true;
  currentPlayer = "X";
  gameStatus = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
};

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".gameRestart")
  .addEventListener("click", handleResetGame);
