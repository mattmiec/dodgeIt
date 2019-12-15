define(['game/gameArea'], function(gameArea) {

    /*
    Base game piece
     */
    function Piece(width, height, color, x, y, xvel, yvel)
    {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.xvel = xvel;
        this.yvel = yvel;
    }

    Piece.prototype.xmax = function () {
        return this.x + this.width;
    };

    Piece.prototype.ymax = function () {
        return this.y + this.width;
    };

    Piece.prototype.draw = function () {
        ctx = gameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    Piece.prototype.boundRight = function () {
        return this.xmax() >= gameArea.width();
    };

    Piece.prototype.boundDown = function () {
        return this.ymax() >= gameArea.height();
    };

    Piece.prototype.boundLeft = function () {
        return this.x <= 0;
    };

    Piece.prototype.boundUp = function () {
        return this.y <= 0;
    };

    Piece.prototype.collision = function(otherPiece) {
        return (this.x < otherPiece.xmax() &&
                this.xmax() > otherPiece.x &&
                this.y < otherPiece.ymax() &&
                this.ymax() > otherPiece.y);
    };

    /*
    A game piece that moves with specified velocity
     */
    function MovingPiece(width, height, color, x, y, xvel, yvel) {
        Piece.call(this, width, height, color, x, y);
        this.xvel = xvel;
        this.yvel = yvel;
    }

    MovingPiece.prototype = Object.create(Piece.prototype);

    MovingPiece.prototype.advance = function () {
        if (this.boundRight() || this.boundLeft()) {
            this.xvel = -this.xvel;
        }
        if (this.boundDown() || this.boundUp()) {
            this.yvel = -this.yvel;
        }
        this.x += this.xvel;
        this.y += this.yvel;
    };

    /*
    A game piece that moves on command
     */
    function ControlledPiece(width, height, color, x, y, speed) {
        Piece.call(this, width, height, color, x, y);
        this.speed = speed;
    }

    ControlledPiece.prototype = Object.create(Piece.prototype);

    ControlledPiece.prototype.moveRight = function() {
        if (!this.boundRight()) {
            this.x += this.speed;
        }
    };

    ControlledPiece.prototype.moveDown = function() {
        if (!this.boundDown()) {
            this.y += this.speed;
        }
    };

    ControlledPiece.prototype.moveLeft = function() {
        if (!this.boundLeft()) {
            this.x -= this.speed;
        }
    };

    ControlledPiece.prototype.moveUp = function() {
        if (!this.boundUp()) {
            this.y -= this.speed;
        }
    };


    return {
        MovingPiece: MovingPiece,
        ControlledPiece: ControlledPiece
    };
});