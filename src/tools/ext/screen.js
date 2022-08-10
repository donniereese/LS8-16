const clearScreenCommand = () => '\033[2J';

class Screen {
    constructor() {
        this.targetID = 'screen';
        this.buffer = [];
        this.b_pointer = 0;
        this.cursor = null;
        this.cursorAt = {
            line: 0,
            char: 0,
            prevLine: 0,
            prevChar: 0,
        };
        this.input = '';
        this.width = 0;
        this.height = 0;

        this.getCurrentPosition.bind(this);
    }

    clear() { process.stdout.write(clearScreenCommand()) };

    writeLine(line) {
        const maxChar = this.width - this.cursorAt.char;
        process.stdout.write(line.toString().substr(this.cursorAt.char, maxChar - 1));
    }
    
    moveToInput() {
        this.cursor.pos(1, this.height);
    }

    moveToStatus() {
        this.cursor.pos(1, this.height - 1);
    }

    getCurrentPosition(err, pos) {
    	return pos;
    }

    drawInput() {
        this.moveToInput();

        const currentPos = this.cursor.curPos();

		process.stdout.write(JSON.parse(JSON.stringify(currentPos)));

		//this.cursor.pos(0, currentPos.row);
        this.cursor.clearLine();
    }

    drawStatus(str) {
        this.storeCursor();
        this.moveToStatus();
        this.cursor.clearLine();
        this.writeLine(str);
        this.restoreCursor();
    }

    storeCursor() {
        this.cursorAt.prevLine = this.cursorAt.line;
        this.cursorAt.prevChar = this.cursorAt.char;
    }

    restoreCursor() {
        this.cursorAt.line = this.cursorAt.prevLine;
        this.cursorAt.char = this.cursorAt.prevChar;
    }

    keyEventHandler(cpath) {
        
    }
}

module.exports = Screen;