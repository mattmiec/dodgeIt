define([], function() {
    let Keyboard = {
        arrowRight : false,
        arrowDown : false,
        arrowLeft : false,
        arrowUp : false,
        keyDownListener : function (e) {
            if (e.key == "ArrowRight") {
                Keyboard.arrowRight = true;
            } else if (e.key == "ArrowDown") {
                Keyboard.arrowDown = true;
            } else if (e.key == "ArrowLeft") {
                Keyboard.arrowLeft = true;
            } else if (e.key == "ArrowUp") {
                Keyboard.arrowUp = true;
            }
        },
        keyUpListener : function (e) {
            if (e.key == "ArrowRight") {
                Keyboard.arrowRight = false;
            } else if (e.key == "ArrowDown") {
                Keyboard.arrowDown = false;
            } else if (e.key == "ArrowLeft") {
                Keyboard.arrowLeft = false;
            } else if (e.key == "ArrowUp") {
                Keyboard.arrowUp = false;
            }
        }
    };
    return Keyboard;
});