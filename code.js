// Store gameboard array inside the object

const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    }
    return {
        renderMessage,
    }
})()
const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        });
        document.querySelector("#gameboard").innerHTML = boardHTML;

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.addEventListener("click", Game.handleClick);
    })
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    };

    const getgameBoard = () => gameboard;

    return {
        render,
        update,
        getgameBoard
    };
})();

// Create a function that controls the logic of the game, including the players

        function createPlayer(name, mark) {
            return {
                name,
                mark
            };
        }

const Game = (() => {
        let players = [];
        let currentPlayerIndex = 0;
        let gameOver = false;

        const start = () => {
            players = [
                createPlayer(document.querySelector("#player1").value, "X"),
                createPlayer(document.querySelector("#player2").value, "O")
            ]

            currentPlayerIndex = 0;
            gameOver = false;
            gameBoard.render();
                const squares = document.querySelectorAll(".square");
                squares.forEach((square) => {
                    square.addEventListener("click", handleClick);
                });
            }
        
        const handleClick = (event) => {
            let index = parseInt(event.target.id.split("-")[1]);
            if (gameBoard.getgameBoard()[index] !== "")
                return;
            gameBoard.update(index, players[currentPlayerIndex].mark)

            if (checkForWin(gameBoard.getgameBoard(), players[currentPlayerIndex].mark)) {
                gameOver = true;
                displayController.renderMessage(`${players[currentPlayerIndex].name} wins`)
            } else if (checkForTie(gameBoard.getgameBoard())) {
                gameOver = true;
                displayController.renderMessage("It's a tie")
            }
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        }

        const restart = () => {
            for (let i =0; i < 9; i++) {
                gameBoard.update(i, "");
            }
            gameBoard.render()
            gameOver = false;
            document.querySelector("#message").innerHTML=""
        }
    
        return {
            start,
            handleClick,
            restart,
        }
})()

function checkForWin(board) {
    const winningComb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winningComb.length; i++) {
        const [a, b, c] = winningComb[i]
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true
        }
    }
    return false
}

function checkForTie (board) {
    return board.every(cell => cell !== "")

}

const Startbutton = document.querySelector("#startbutton");
Startbutton.addEventListener("click", () => { 
    Game.start()
})

const Restart = document.querySelector("#restartbutton");
Restart.addEventListener("click", () => {
    Game.restart()
})

