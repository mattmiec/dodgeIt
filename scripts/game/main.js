define(['game/pieces', 'game/gameArea', 'game/scoreBox'], function (pieces,
                                                                    gameArea,
                                                                    scoreBox){
    let userPiece;
    let gamePiece;
    let myScoreBox
    let key;
    let intervalID

    function startGame() {
        score = 0;
        gameArea.start();
        myScoreBox = new scoreBox.ScoreBox("20px", "Consolas", "blacK", 320, 40)
        userPiece = new pieces.ControlledPiece(20, 20, "blue", gameArea.width()/2, gameArea.height()/2);
        gamePiece = new pieces.MovingPiece(20, 20, "red", 20, 20, 2, 2);
        intervalID = setInterval(nextFrame, 10);
        window.addEventListener('keydown', function (e) {
            key = e.key;
        })
        window.addEventListener('keyup', function (e) {
            key = false;
        })
    }

    function advancePieces() {
        if (key == "ArrowRight") {
            userPiece.moveRight();
        } else if (key == "ArrowDown") {
            userPiece.moveDown();
        } else if (key == "ArrowLeft") {
            userPiece.moveLeft();
        } else if (key == "ArrowUp") {
            userPiece.moveUp();
        }
        gamePiece.advance()
    }

    function drawGame() {
        gameArea.clear();
        myScoreBox.incrementScore();
        myScoreBox.draw()
        userPiece.draw();
        gamePiece.draw();
    }

    function nextFrame() {
        if (userPiece.collision(gamePiece)) {
            clearInterval(intervalID);
            gameOver();
            return;
        }
        score +=1;
        advancePieces();
        drawGame();
    }

    function gameOver() {
        var ctx = gameArea.context;
        ctx.font = "40px Consolas";
        ctx.fillStyle = "blacK"
        ctx.fillText("GAME OVER!", 120, gameArea.height()/2);
    }

    return {
        start: startGame
    }
})

