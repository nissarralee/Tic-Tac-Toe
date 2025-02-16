// Select elements
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning conditions
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click
function handleCellClick(event) {
    const index = event.target.dataset.index;
    
    if (board[index] === "" && isGameActive) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.style.color = currentPlayer === "X" ? "#ff2e63" : "#08d9d6";
        
        checkWinner();
        togglePlayer();
    }
}

// Check for a winner
function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
            highlightWinnerCells(condition);
            return;
        }
    }
    
    if (!board.includes("")) {
        isGameActive = false;
        statusText.textContent = "🤝 It's a Draw!";
    }
}

// Highlight winning cells
function highlightWinnerCells(cellsToHighlight) {
    cellsToHighlight.forEach(index => {
        cells[index].style.backgroundColor = "#08d9d6";
        cells[index].style.color = "#1a1a2e";
    });
}

// Toggle Player
function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (isGameActive) {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Reset Game
function resetGame() {
    board.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        cell.style.color = "#ffffff";
    });
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player X's turn`;
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
