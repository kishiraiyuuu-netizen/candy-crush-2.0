class CandyCrush {
    constructor() {
        this.boardSize = 8;
        this.candyTypes = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇'];
        this.candyColors = ['red', 'orange', 'yellow', 'green', 'purple', 'blue'];
        this.board = [];
        this.score = 0;
        this.moves = 20;
        this.level = 1;
        this.gameActive = true;
        this.selectedCandy = null;
        this.animating = false;
        this.targetScore = 1000;

        this.init();
    }

    init() {
        this.createBoard();
        this.renderBoard();
        this.attachEventListeners();
    }

    createBoard() {
        this.board = [];
        for (let i = 0; i < this.boardSize; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.boardSize; j++) {
                this.board[i][j] = this.getRandomCandy();
            }
        }
        // Ensure no initial matches
        this.eliminateInitialMatches();
    }

    eliminateInitialMatches() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                while (this.hasMatchAt(i, j)) {
                    this.board[i][j] = this.getRandomCandy();
                }
            }
        }
    }

    getRandomCandy() {
        const type = Math.floor(Math.random() * this.candyTypes.length);
        return {
            type: this.candyTypes[type],
            color: this.candyColors[type],
            id: type
        };
    }

    renderBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                const candy = this.board[i][j];
                const candyElement = document.createElement('div');
                candyElement.className = `candy ${candy.color}`;
                candyElement.textContent = candy.type;
                candyElement.dataset.row = i;
                candyElement.dataset.col = j;
                candyElement.addEventListener('click', () => this.selectCandy(i, j, candyElement));
                gameBoard.appendChild(candyElement);
            }
        }
    }

    selectCandy(row, col, element) {
        if (!this.gameActive || this.animating) return;

        if (this.selectedCandy === null) {
            this.selectedCandy = { row, col, element };
            element.classList.add('selected');
        } else {
            const selectedRow = this.selectedCandy.row;
            const selectedCol = this.selectedCandy.col;

            // Check if adjacent
            const distance = Math.abs(row - selectedRow) + Math.abs(col - selectedCol);
            if (distance === 1) {
                this.swap(selectedRow, selectedCol, row, col);
                this.moves--;
                this.updateStats();

                if (this.moves === 0 && !this.hasMatches()) {
                    this.endGame(false);
                }
            } else {
                this.selectedCandy.element.classList.remove('selected');
                this.selectedCandy = { row, col, element };
                element.classList.add('selected');
            }
        }
    }

    swap(row1, col1, row2, col2) {
        [this.board[row1][col1], this.board[row2][col2]] = [this.board[row2][col2], this.board[row1][col1]];
        this.selectedCandy.element.classList.remove('selected');
        this.selectedCandy = null;

        this.animating = true;
        setTimeout(() => {
            this.renderBoard();
            this.processMatches();
        }, 300);
    }

    processMatches() {
        const matches = this.findMatches();

        if (matches.length > 0) {
            this.removeMatches(matches);
            this.score += matches.length * 10;
            this.updateStats();

            // Check level up
            if (this.score >= this.targetScore) {
                this.levelUp();
            }

            setTimeout(() => {
                this.applyGravity();
                this.fillEmpty();
                this.renderBoard();
                this.processMatches(); // Cascade
            }, 500);
        } else {
            this.animating = false;
        }
    }

    findMatches() {
        const matches = [];
        const matched = new Set();

        // Check horizontal
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize - 2; j++) {
                const current = this.board[i][j];
                const next1 = this.board[i][j + 1];
                const next2 = this.board[i][j + 2];

                if (current && next1 && next2 && 
                    current.id === next1.id && 
                    next1.id === next2.id) {
                    matched.add(`${i},${j}`);
                    matched.add(`${i},${j + 1}`);
                    matched.add(`${i},${j + 2}`);
                }
            }
        }

        // Check vertical
        for (let i = 0; i < this.boardSize - 2; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                const current = this.board[i][j];
                const next1 = this.board[i + 1][j];
                const next2 = this.board[i + 2][j];

                if (current && next1 && next2 && 
                    current.id === next1.id && 
                    next1.id === next2.id) {
                    matched.add(`${i},${j}`);
                    matched.add(`${i + 1},${j}`);
                    matched.add(`${i + 2},${j}`);
                }
            }
        }

        return Array.from(matched);
    }

    hasMatchAt(row, col) {
        const current = this.board[row][col];

        // Check horizontal
        if (col >= 2) {
            const prev1 = this.board[row][col - 1];
            const prev2 = this.board[row][col - 2];
            if (prev1 && prev2 && current.id === prev1.id && prev1.id === prev2.id) {
                return true;
            }
        }

        // Check vertical
        if (row >= 2) {
            const prev1 = this.board[row - 1][col];
            const prev2 = this.board[row - 2][col];
            if (prev1 && prev2 && current.id === prev1.id && prev1.id === prev2.id) {
                return true;
            }
        }

        return false;
    }

    hasMatches() {
        return this.findMatches().length > 0;
    }

    removeMatches(matches) {
        matches.forEach(match => {
            const [row, col] = match.split(',').map(Number);
            this.board[row][col] = null;
        });
    }

    applyGravity() {
        for (let j = 0; j < this.boardSize; j++) {
            for (let i = this.boardSize - 1; i > 0; i--) {
                if (this.board[i][j] === null) {
                    for (let k = i - 1; k >= 0; k--) {
                        if (this.board[k][j] !== null) {
                            this.board[i][j] = this.board[k][j];
                            this.board[k][j] = null;
                            break;
                        }
                    }
                }
            }
        }
    }

    fillEmpty() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (this.board[i][j] === null) {
                    this.board[i][j] = this.getRandomCandy();
                }
            }
        }
    }

    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('moves').textContent = this.moves;
        document.getElementById('level').textContent = this.level;
    }

    levelUp() {
        this.level++;
        this.moves += 10;
        this.targetScore += 1000;
        this.updateStats();
        alert(`Level Up! You are now Level ${this.level}!`);
    }

    endGame(won) {
        this.gameActive = false;
        const modal = document.getElementById('gameOverModal');
        const title = document.getElementById('gameOverTitle');
        const message = document.getElementById('gameOverMessage');
        const finalScore = document.getElementById('finalScore');

        if (won) {
            title.textContent = '🎉 You Won!';
            message.textContent = `Congratulations! You reached the target score!`;
        } else {
            title.textContent = '😢 Game Over!';
            message.textContent = `You ran out of moves. Better luck next time!`;
        }

        finalScore.textContent = this.score;
        modal.classList.remove('hidden');
    }

    attachEventListeners() {
        document.getElementById('newGameBtn').addEventListener('click', () => {
            this.resetGame();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });

        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.gameActive = !this.gameActive;
            const btn = document.getElementById('pauseBtn');
            btn.textContent = this.gameActive ? 'Pause' : 'Resume';
        });

        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.resetGame();
            document.getElementById('gameOverModal').classList.add('hidden');
        });
    }

    resetGame() {
        this.score = 0;
        this.moves = 20;
        this.level = 1;
        this.gameActive = true;
        this.selectedCandy = null;
        this.animating = false;
        this.targetScore = 1000;
        this.createBoard();
        this.renderBoard();
        this.updateStats();
        document.getElementById('gameOverModal').classList.add('hidden');
        document.getElementById('pauseBtn').textContent = 'Pause';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CandyCrush();
});