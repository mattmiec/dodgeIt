define(['game/piece', 'game/gameArea', 'game/scoreBox', 'game/obstacles'], function (piece,
                                                                                     gameArea,
                                                                                     scoreBox,
                                                                                     ObstacleCollection){

    let userPiece = new piece.ControlledPiece(20, 20, "blue", gameArea.width()/2, gameArea.height()/2);;
    let obstacles = new ObstacleCollection;
    let myScoreBox = new scoreBox.ScoreBox("20px", "Consolas", "blacK", 320, 40)
    let key = false;
    let intervalID;
    let score = 0;
    let frame = 0;

    function startGame() {
        gameArea.start();
        obstacles.addBasic();
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
        obstacles.advance()
    }

    function drawGame() {
        gameArea.clear();
        userPiece.draw();
        obstacles.draw();
        myScoreBox.draw(score)
    }

    function nextFrame() {
        if (obstacles.detectCollision(userPiece)) {
            clearInterval(intervalID);
            gameOver();
            return;
        }
        score += obstacles.obstacles.length;
        frame += 1;
        if (frame % 1000 == 0) {
            obstacles.addBasic();
        }
        advancePieces();
        drawGame();
    }

    function gameOver() {
        var ctx = gameArea.context;
        ctx.font = "40px Consolas";
        ctx.fillStyle = "black"
        ctx.fillText("GAME OVER!", 110, gameArea.height()/2);
    }

    return {
        start: startGame
    }
})

