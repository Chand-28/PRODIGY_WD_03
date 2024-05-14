const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const toggleBtn = document.querySelector('button:nth-of-type(2)');

let currentPlayer = 'X';
let gameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];
let opponent = 'human'; 

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function cellClicked(index) {
    if (!gameOver && board[index] === '' ) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkWin();
        checkDraw();
        if (!gameOver) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
            if (opponent === 'ai' && currentPlayer === 'O') {
                makeAiMove();
            }
        }
    }
}



function checkWin() {
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            message.textContent = `${currentPlayer} wins!`;
            gameOver = true;
            return;
        }
    }
}

function checkDraw() {
    if (board.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        gameOver = true;
    }
}

function reset() {
    currentPlayer = 'X';
    gameOver = false;
    board = ['', '', '', '', '', '', '', '', ''];
    message.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

function toggleOpponent() {
    opponent = opponent === 'human' ? 'ai' : 'human';
    toggleBtn.textContent = opponent === 'human' ? 'Play Against AI' : 'Play Against Human';
    reset();
}



function makeAiMove() {
    
    let availableMoves = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            availableMoves.push(i);
        }
    }
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const aiMove = availableMoves[randomIndex];
    board[aiMove] = 'O';
    cells[aiMove].textContent = 'O';
    checkWin();
    checkDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

