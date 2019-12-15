define(['game/gameArea'], function(gameArea) {
    function ScoreBox(size, font, color, x, y) {
        this.size = size;
        this.font = font;
        this.color = color;
        this.x = x;
        this.y = y;
        this.draw = function(score) {
            var ctx = gameArea.context;
            ctx.font = this.size + " " + this.font;
            ctx.fillStyle = this.color;
            ctx.fillText("SCORE: " + score, this.x, this.y);
        }
    }

    return {
        ScoreBox : ScoreBox
    }
})

