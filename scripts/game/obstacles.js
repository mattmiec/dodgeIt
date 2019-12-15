define(['game/piece','game/gameArea'], function(piece,
                                                gameArea) {
    function ObstacleCollection() {
        this.obstacles = [];
    }

    ObstacleCollection.prototype.addBasic = function() {
        let newPieceWidth = Math.random()*30;
        let newPieceHeight = Math.random()*30;
        let newPieceX = Math.random()*(gameArea.width() - newPieceWidth);
        let newPieceY = Math.random()*(gameArea.height() - newPieceHeight);
        let newPieceVelX = Math.random()*6 - 3;
        let newPieceVelY = Math.random()*6 - 3;
        this.obstacles.push(new piece.MovingPiece(newPieceWidth,
            newPieceHeight,
            "red",
            newPieceX,
            newPieceY,
            newPieceVelX,
            newPieceVelY))
    };

    ObstacleCollection.prototype.draw = function() {
        for (obstacle of this.obstacles) {
            obstacle.draw();
        }
    };

    ObstacleCollection.prototype.advance = function() {
        for (obstacle of this.obstacles) {
            obstacle.advance();
        }
    };

    ObstacleCollection.prototype.detectCollision = function(piece) {
        for (obstacle of this.obstacles) {
            if (piece.collision(obstacle)) {
                return true;
            }
        }
        return false;
    };

    return ObstacleCollection;
});