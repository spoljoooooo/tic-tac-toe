const Player = (sign) => {
    const getSign = () => {
        return sign;
    }

    return {getSign};
};

const board = (() => {
    let boardArray = ["", "", "", "", "", "", "", "", ""];

    const checkCellIsEmpty = (indexInArray) => {
        if (boardArray[indexInArray] == "") {
            return true;
        } else {
            return false;
        }
    }

    const fillCell  = (playerSign, indexInArray) => {
        boardArray[indexInArray] = playerSign;
    }

    const isWin = () => {
        if (boardArray[0] == "⚔️" && boardArray[1] == "⚔️" && boardArray[2] == "⚔️") {
            return true;
        } else if (boardArray[3] == "⚔️" && boardArray[4] == "⚔️" && boardArray[5] == "⚔️") {
            return true;
        } else if (boardArray[6] == "⚔️" && boardArray[7] == "⚔️" && boardArray[8] == "⚔️") {
            return true;
        } else if (boardArray[0] == "⚔️" && boardArray[3] == "⚔️" && boardArray[6] == "⚔️") {
            return true;
        } else if (boardArray[1] == "⚔️" && boardArray[4] == "⚔️" && boardArray[7] == "⚔️") {
            return true;
        } else if (boardArray[2] == "⚔️" && boardArray[5] == "⚔️" && boardArray[8] == "⚔️") {
            return true;
        } else if (boardArray[0] == "⚔️" && boardArray[4] == "⚔️" && boardArray[8] == "⚔️") {
            return true;
        } else if (boardArray[2] == "⚔️" && boardArray[4] == "⚔️" && boardArray[6] == "⚔️") {
            return true;
        } else if (boardArray[0] == "🛡" && boardArray[1] == "🛡" && boardArray[2] == "🛡") {
            return true;
        } else if (boardArray[3] == "🛡" && boardArray[4] == "🛡" && boardArray[5] == "🛡") {
            return true;
        } else if (boardArray[6] == "🛡" && boardArray[7] == "🛡" && boardArray[8] == "🛡") {
            return true;
        } else if (boardArray[0] == "🛡" && boardArray[3] == "🛡" && boardArray[6] == "🛡") {
            return true;
        } else if (boardArray[1] == "🛡" && boardArray[4] == "🛡" && boardArray[7] == "🛡") {
            return true;
        } else if (boardArray[2] == "🛡" && boardArray[5] == "🛡" && boardArray[8] == "🛡") {
            return true;
        } else if (boardArray[0] == "🛡" && boardArray[4] == "🛡" && boardArray[8] == "🛡") {
            return true;
        } else if (boardArray[2] == "🛡" && boardArray[4] == "🛡" && boardArray[6] == "🛡") {
            return true;
        } else {
            return false;
        }
    }

    const restartArray = () => {
        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i] = "";
        }
    }

    return {checkCellIsEmpty, fillCell, isWin, restartArray};
})();

const displayController = (() => {
    const startButton = document.getElementById("startButton");
    const startGameMessage = document.querySelector(".startGameMessage");

    const gameButtons = document.querySelector(".gameButtons");
    const restartButton = document.createElement("button");

    const backButton = document.querySelector(".goBack");

    restartButton.textContent = "Restart";

    restartButton.addEventListener("click", e => {
        gameController.restartGame();
    });

    startButton.addEventListener("click", e => {
        startGameMessage.style.display = "none";
    });

    backButton.addEventListener("click", e => {
        gameController.restartGame();
        startGameMessage.style.display = "flex";
    })

    const displaySign = (event, sign) => {
        event.target.innerText = sign;
    }

    const addRestartButton = () => {
        gameButtons.appendChild(restartButton);
    }

    const removeRestartButton = () => {
        restartButton.remove();
    }

    return {displaySign, addRestartButton, removeRestartButton};
})();

const gameController = (() => {
    const winMessageDiv = document.querySelector(".endMessage");
    const winMessage = document.createElement("p");

    let playerOne = Player("⚔️");
    let playerTwo = Player("🛡");

    let moveNumber = 0;

    const playerTurnSign = () => {
        if (moveNumber%2 == 0) {
            return playerOne.getSign();
        } else {
            return playerTwo.getSign();
        }
    }

    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        cell.addEventListener("click", e => {
            if (!board.isWin()) {
                if (board.checkCellIsEmpty(e.target.dataset.cell)) {
                    board.fillCell(playerTurnSign(), e.target.dataset.cell);
                    displayController.displaySign(e, playerTurnSign());
                    if (board.isWin()) {
                        winMessage.innerHTML = `<p>Winner is ${playerTurnSign()}!</p>`
                        winMessageDiv.appendChild(winMessage);
                        displayController.addRestartButton();
                }
                if (moveNumber == 8) {
                    winMessage.innerHTML = `<p>It's draw!</p>`
                    winMessageDiv.appendChild(winMessage);
                    displayController.addRestartButton();
                }
                moveNumber++;
            }}; 
        });
    });

    const restartGame = () => {
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        board.restartArray();
        winMessage.innerHTML = `<p></p>`
        displayController.removeRestartButton();
        moveNumber = 0;
    }

    return {restartGame}
})();