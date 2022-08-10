const cur = require('./cursor-position');

const cursorPosCommand = (col, line) => "\033[" + line + ';' + col + 'H';
const clearScreenCommand = () => '\033[2J';
const cursorUpCommand = (n) => '\033[' + n + 'A';
const cursorDownCommand = (n) => '\033[' + n + 'B';
const cursorForwardCommand = (n) => '\033[' + n + 'C';
const cursorBackwardCommand = (n) => '\033[' + n + 'D';
const cursorResetCommand = (n) => '\033[2J';
const eraseToEndCommand = () => '\033[K';
//Save cursor position: \033[s
//Restore cursor position: \033[u


class Cursor {
    constructor(screen) {
        if (!screen) throw new Error('must provide screen');
        this._s = screen;

        this.targetID = 'cursor';

        this.col = 0;
        this.row = 0;

        this.curPos = cur;
    }

    keyEventHandler() {
        
    }

    pos(c, l) {
        process.stdout.write(cursorPosCommand(c, l));
    }

    cursorReturn() {
        process.stdout.write(cursorResetCommand());
    }

    down(n) {
        process.stdout.write(cursorDownCommand(n));
    }

    left(n) {
        process.stdout.write(cursorLeftCommand(n));
    }
    
    clearLine() {
    	//this.pos(0, this.curPos.row);
        process.stdout.write(eraseToEndCommand());
    }
    
}

module.exports = Cursor;