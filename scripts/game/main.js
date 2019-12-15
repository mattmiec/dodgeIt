define(['game/piece',
    'game/gameArea',
    'game/scoreBox',
    'game/obstacles',
    'game/keyboard'],
    function (piece,
              gameArea,
              scoreBox,
              ObstacleCollection,
              Keyboard)
    {

    let userPiece = new piece.ControlledPiece(20, 20, "blue", gameArea.width()/2, gameArea.height()/2, 2);
    let obstacles = new ObstacleCollection;
    let myScoreBox = new scoreBox.ScoreBox("20px", "Consolas", "black", 15, 30);
    let intervalID;
    let score = 0;
    let frame = 0;

    function startGame() {
        gameArea.start();
        obstacles.addBasic();
        intervalID = setInterval(nextFrame, 20);
        window.addEventListener('keydown', Keyboard.keyDownListener);
        window.addEventListener('keyup', Keyboard.keyUpListener);
    }

    function advancePieces() {
        if (Keyboard.arrowRight) {
            userPiece.moveRight();
        }
        if (Keyboard.arrowDown) {
            userPiece.moveDown();
        }
        if (Keyboard.arrowLeft) {
            userPiece.moveLeft();
        }
        if (Keyboard.arrowUp) {
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
        frame += 1;
        if (frame % 1000 == 0) {
            obstacles.addBasic();
        }
        advancePieces();
        drawGame();
        if (obstacles.detectCollision(userPiece)) {
            clearInterval(intervalID);
            gameOver();
            return;
        }
        score += obstacles.obstacles.length;
    }

    function gameOver() {
        var ctx = gameArea.context;
        ctx.font = "40px Consolas";
        ctx.fillStyle = "black";
        ctx.fillText("GAME OVER!", 110, gameArea.height()/2);
    }

    return {
        start: startGame
    };
});

