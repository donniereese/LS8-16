const fs = require('fs')
const path = require('path')
const readline = require('readline')
const eol = require('os').EOL;
const Cursor = require('./ext/cursor.js')
const Screen = require('./ext/screen.js')
const KeyEvent = require('./ext/keyEvent.js')

const keybindings = require('./ext/config/keybindings.json')

const isCommentChar = (char) => char.replace(/#/, '').length === 0;
const isNewline = (char) => char.replace(/(\n)|(\n\n)|(\n\r)/, '').length === 0;
const isCommandChar = (char) => char.replace(/\//, '').length === 0;
const isCommandEndChar = (char) => char.replace(/;/, '').length === 0;


const keymap = {};

for (let i = 0; i < keybindings.length; i++) {
    const k = keybindings[i];
    if (keymap[k.key]) {
        keymap[k.key].push(k.cmd);
    } else {
        keymap[k.key] = [k.cmd];
    }
}

class Term {
    constructor(screen, cursor) {
        this.events = {
            key: [],
            line: [],
            window: [],
        }

        this.screen = screen;
        this.cursor = cursor;

        this.targetID = 'term'
        this._target = this.targetID;

        this.key_targets = {}

        this.commandBuffer = [''];

        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', this.onKeyEvent.bind(this));

        this.input = readline.createInterface({
            input: process.stdin,
            prompt: ' > '
        });
        this.out = null;

        this.registerKeyTarget(this);
    }

    registerKeyTarget(obj) {
        this.key_targets[obj.targetID] = obj.keyEventHandler.bind(obj);
    }

    onKeyEvent(str, key) {
        const keyEvent = new KeyEvent(str, key);

        const cmdArr = keymap[keyEvent.rule];

        if (cmdArr) {
            // parse command
            for(let i = 0; i < cmdArr.length; i++) {
                const cpath = cmdArr[i].split('.');

                if (cpath[i] === this._target) {
                    this.key_targets[this._target](cpath);
                } else {
                    this.keyEventHandler(cpath);
                }
            }
        } else if (this._target === 'buffer') {
            // write to buffer   
        } else {
            // ignore and write to command history
            this.charIn(keyEvent);
        }
        this.drawBuffer();
    }

    charIn(keyEvent) {
        if (keyEvent.name === 'return') {
            this.commandBuffer.push(this.commandBuffer[this.commandBuffer.length - 1]);
        }

        this.commandBuffer[this.commandBuffer.length - 1] += keyEvent.code;
    }

    keyEventHandler(cpath) {
        switch(cpath[1]) {
            case 'quit':
                this.quitApp();
        }
    }

    on(event, handler) {
        
    }

    quitApp() {
        process.exit();
    }

    drawBuffer() {
        this.screen.clear();
        this.cursor.pos(0, 0);
        this.screen.cursorAt.line = 0;
        this.screen.cursorAt.char = 0;
        for (let i = 0; i < this.screen.height - 3; i++) {
            this.screen.writeLine(this.screen.buffer[i + this.screen.b_pointer]);
            this.screen.cursorAt.line++;
            this.screen.cursorAt.char = 0;
            cursor.pos(this.screen.cursorAt.char, this.screen.cursorAt.line);       
        }
        if (this.commandBuffer.length >= 2) this.screen.drawStatus(this.commandBuffer[this.commandBuffer.length - 2]);
        this.screen.drawInput();
        this.screen.writeLine(this.commandBuffer[this.commandBuffer.length - 1]);
    }
};

const screen = new Screen();
const cursor = new Cursor(screen);
const term = new Term(screen, cursor);
term.registerKeyTarget(screen);
term.registerKeyTarget(cursor);
screen.cursor = cursor;





const args = process.argv.slice(2);


const fileData = {
    headers: '',
    comments: '',
}

const status = {
    loading: false,
    message: '',
    error: false,
}

const setStatus = (loading, message = '', err= false) => {
    status.loading = loading;
    status.message = message;
    status.error = err;
    console.log(status)
}


const screenSetup = () => {
    console.log('Terminal size: ' + process.stdout.columns + 'x' + process.stdout.rows);
    screen.width = process.stdout.columns;
    screen.height = process.stdout.rows;
    term.drawBuffer();
}


const loadFile = (path) => {
    setStatus(true, 'Loading file...');
    
    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        setStatus(false, 'Error loading file...', true);
        return
      }
    
      try {
          const data = fs.readFileSync(path, 'utf8');
          screen.buffer = data.split('\n');
          setStatus(false, 'Data loaded into buffer!', false);
          screenSetup();
      } catch(e) {
          console.log('Error:', e.stack);
      }
    })
}


let filepath;


setStatus(true, 'Processing File');


if (args.length === 0) {
    console.log('Error, no file path');
    process.quit(1);
} else {
    filepath = path.relative('', args[0]);
    loadFile(filepath);
}