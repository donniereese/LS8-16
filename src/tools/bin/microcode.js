// Node readline for cli
const readline = require('readline');
// Cursory Position Detetction library
const getCursorPosition = require('get-cursor-position');
// instruction set definitions
const { instructionSet } = require('../../conf.js');

// Formatter
class Formatter {
    constructor() {
        this.char = {
            box: {
                bold: {
                    tl: '┏',
                    tr: '┓',
                    br: '┛',
                    bl: '┗',
                    bar: '━',
                    vert: '┃',
                    barsplitup: '┻',
                    barsplitdown: '┳',
                    vertsplitright: '┣',
                    vertsplitleft: '┫'
                }
            },
            shadow: {
                dark: '▓',
                medium: '▒',
                light: '░',
            }
        };
    }
}

// cli class
class MicrocodeCLI {
    constructor() {
        this.events = {};
        this.flags = {
            in: {
                super: false,
                cmd: true,
                nav: false,
            },
            out: {
                text: true,
                block: false,
            }
        }
        this.modes = [ 'menu', 'dict', 'editor', 'buffers' ];
        this.mode = 0;

        this.commands = {}

        this.draw = new Formatter();

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stout,
            terminal: true
        });
        this._prompt = " λ  ";
        this.rl.on('line', this.runCommand.bind(this));

        process.stdin.on('keypress', this.readKey.bind(this));


        process.stdout.write('');

        const c = getCursorPosition.sync();

        this.cursor = { x: parseInt(c.row), y:parseInt(c.col) };
        this.term = {
            columns: process.stdout.columns,
            rows: process.stdout.rows,
        }

        const args = process.argv.slice(2);
        if (args.length >= 2) {
            for (let i = 0; i < args.length; i++) {
                console.log(args[i]);
            }
        }

        this.log = [];

        this.ui = {
            title: this._setCursorPosition([2,0], [[-1,-2], 0], 0),
            command: this._setUIDefBlock([0,[-1,0]], [this.term.rows, this.term.columns], 0),
            message: this._setUIDefBlock([0,[-1,-1]], [this.term.rows - 5, this.term.columns - 3], 0),
            buffer: this._setUIDefBlock([3,3], [this.term.rows - 5, this.term.columns - 4], 0),
            vScroll: this._setUIDefBlock([[-1,-3],3], [this.term.rows - 5, this.term.columns - 3], 0),
        }

        // this.ui.title.vis.z = 100;

        this.fill('▒')
            .fill(' ', [1,1], [this.term.columns - 1, this.term.rows - 3])
            .box([1,1], [this.term.columns - 1, this.term.rows - 4])
            .sc([1, this.term.rows - 3])
            .output(this.draw.char.shadow.light.repeat(this.term.columns - 2))
            // .output(this.draw.char.box.bold.bar.repeat(this.term.columns))
            .sc([0, this.term.rows - 1])
            .output(' '.repeat(this.term.columns))
            .sc([0, this.term.rows - 1]);

        this.setTitle('Welcome')
            .setMessage('Menu')
            .setBuffer( 'MODES:\n' +
                        '‾‾‾‾‾‾\n' +
                        '(•) menu    -  This menu, the main menu\n' +
                        '( ) dict    -  Interactive dictionary of microcode in different formats and it assembly.\n' +
                        '( ) editor  -  Open the editor in a new buffer.\n' +
                        '( ) buffers -  Manage created and tracked buffers.');

        // this.log.forEach(log => console.log(log));
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
    }

    getFlag() {

    }

    setFlag() {

    }

    extend(name, file) {

    }

    setMessage(text) {
        this.sc([2, this.term.rows - 3])
            .output(this.draw.char.shadow.light.repeat(this.term.columns - 3))
            .sc([2, this.term.rows - 3])
            .output(` ${text} `);
        return this;
    }

    setTitle(text = '') {
        this.sc([2, 0])
        .output(this.draw.char.shadow.medium.repeat(this.term.columns - 3))
        .sc([2, 0])
        .output(`| LS8-16 Toolbox  •  ${text}  |`);
        return this;
    }

    setBuffer(strOrArr) {
        const lineWidth = this.ui.buffer.width;
        const lines = typeof strOrArr === 'array' ? strOrArr : strOrArr.split('\n');

        lines.map((line, i) => {
            if (line.length > lineWidth) {
                const lines = this._chunkString(strOrArr, lineWidth);
                lines.splice(i, 1, ...lines);
                return line;
            }
            return line;
        });

        // lines.push(`${this.term.columns - 4}`);

        for (let i = 0; i < this.ui.buffer.height && i < lines.length; i++) {
            this.sc([2, i + 2])
                .output(lines[i].substring(0, this.term.columns - 4));
        }

        return this;
    }

    prompt(noNewLine = false) {
        this.sc([1, this.term.rows]);
        process.stdout.write(`${noNewLine ? '\n' : ''}${this._prompt}`);
    }

    exitProgram() {
        process.exit(0);
    }

    clearBuffer() {
        this.rl.clearScreenDown();
    }

    _chunkString(str, length) {
        return str.match(new RegExp('.{1,' + length + '}|\n', 'g'));
    }

    _setUIDefBlock(tl, br, borderWidth, borderType = 'line') {
        const uiBlockDef = {
            tl          : [
                typeof tl[0] === 'array' ? Math.sign(tl[0][0]) <= 0 ? this.term.rows + tl[0][1] : this.term.rows - tl[0][1] : tl[0],
                typeof tl[1] === 'array' ? Math.sign(tl[1][0]) <= 0 ? this.term.rows + tl[1][1] : this.term.rows - tl[1][1] : tl[1]
            ],
            br          : [
                typeof br[0] === 'array' ? Math.sign(br[0][0]) <= 0 ? this.term.rows + br[0][1] : this.term.rows - br[0][1] : br[0],
                typeof br[1] === 'array' ? Math.sign(br[1][0]) <= 0 ? this.term.rows + br[1][1] : this.term.rows - br[1][1] : br[1]
            ],
            width       : typeof br[0] === 'array'  ? Math.sign(br[0][0]) <= 0 ? this.term.columns + br[0][1] : this.terms.columns - br[0][1] : br[0] - tl[0],
            height      : typeof br[1] === 'array'  ? Math.sign(br[0][0]) <= 0 ? this.term.rows + br[1][1] : this.term.rows - br[1][1] : br[1] - tl[1],
            contentPos  : {
                top     : 0,
                current : 0,
            },
            border: {
                width: borderWidth,
                type: borderType,
            },
            fill: {
                char: ' '
            },
            vis: {
                shown: false,
                z: 0,
            },
            act: {
                // custom actions...
            }
        };

        return uiBlockDef;
    }

    _inputCompleter(line) {
      const completions = '.help .error .exit .quit .q'.split(' ');
      const hits = completions.filter((c) => c.startsWith(line));
      // show all completions if none found
      return [hits.length ? hits : completions, line];
    }

    box(tl = [0, 0], br = [this.term.columns, this.term.rows]) {
        const fillWidth = br[0] - tl[0];
        const fillHeight = br[1] - tl[1];
        const hor = this.draw.char.box.bold.bar;
        const vert = this.draw.char.box.bold.vert;
        this.sc(tl)
        .output(this.draw.char.box.bold.tl + hor.repeat(fillWidth - 2) + this.draw.char.box.bold.tr);
        for (let i = tl[1] + 1; i < br[1]; i++) {
            this.sc([tl[0], i])
            .output(vert + ' '.repeat(fillWidth - 2) + vert);
        }
        this.sc([tl[0], br[1]]).output(this.draw.char.box.bold.bl + hor.repeat(fillWidth - 2) + this.draw.char.box.bold.br);
        return this;
    }

    fill(char, tl = [0, 0], br = [this.term.columns, this.term.rows]) {
        const fillWidth = br[0] - tl[0];
        const fillHeight = br[1] - tl[1];
        this.sc(tl);
        for (let i = tl[1]; i < br[1]; i++) {
            this.sc([tl[0], i]);
            process.stdout.write(char.repeat(fillWidth));
        }
        return this;
    }

    setUIText (uiEl, text) {

    }

    clearDisplay() {

    }

    set posX(x) {
        this.cursor.x = parseInt(x);
        // readline.cursorTo(this.rl, this.cursor.x, this.cursor.y);
    }

    set posY(y) {
        this.cursor.y = parseInt(y);
    }

    get pos() {
        return `${this.cursor.x}, ${this.cursor.y} in ${this.term.columns}, ${this.term.rows}`;
    }

    posOut() {
        this.output(`${this.pos}`);
    }

    setCursorPos(xyArr, next) {
        // this.cursor.x = parseInt(xyArr[0]);
        // this.cursor.y = parseInt(xyArr[1]);
        // readline.cursorTo(process.stdout, this.cursor.x, this.cursor.y);
        xyArr[0] = parseInt(xyArr[0]);
        xyArr[1] = parseInt(xyArr[1]);
        const c = getCursorPosition.sync();
        const y = parseInt(c.row);
        const x = parseInt(c.col);
        const xDir = xyArr[0] - x;
        const yDir = xyArr[1] - y;
        const vX = xDir < 0 ? Math.abs(xDir) : -Math.abs(xDir); //0 or less means ABS to positive, else flip to negative
        const vY = xDir < 0 ? Math.abs(yDir) : -Math.abs(yDir);
        this.log.push(`${xyArr[0]}, ${xyArr[1]} :: ${x}, ${y} :: ${xDir}, ${yDir} :: ${vX}, ${vY}`);
        readline.moveCursor(process.stdout, vX, vY);
    }

    sc(xyArr) {
        xyArr[0] = parseInt(xyArr[0]);
        xyArr[1] = parseInt(xyArr[1]);
        readline.cursorTo(process.stdout, xyArr[0], xyArr[1]);
        this.cursor.x = xyArr[0];
        this.cursor.y = xyArr[1];
        return this;
    }

    _setCursorPosition() {
        const c = getCursorPosition.sync();
        this.cursor.x = parseInt(c.row);
        this.cursor.y = parseInt(c.col);
    }

    clearDown(next) {
        readline.clearScreenDown(process.stdout);
        return this;
    }

    output(str, next) {
        process.stdout.write(`${str}`);
        // next action
        // this._setCursorPosition();
        return this;
    }

    listInstructions(argArr) {
        this.output(`┏━━━━━━┳━━━━┳━━━━━━━━━━┓`);
        this.output(`┃          ┃       ┃                ┃`);
        this.output(`┗━━━━━━┻━━━━━━━━━━━━━━┛`)
        this.output(``);
        Object.entries(instructionSet.index)
        .forEach((ins, index) => {
            this.output(`${ins[0]} : ${ins[1]}`);
        });
    }

    readKey(s, key) {
        switch(key.keye) {
            case 'escape':
                console.log(s, key);
            default:
                return;
        }
    }

    runCommand(cmdArr) {

        if (this.mode === 0) {
            cmdArr = cmdArr.split(' ');
            const cmd = cmdArr.length >= 1 ? cmdArr.splice(0, 1)[0] : null;

            switch(cmd) {
                case 'quit':
                case 'exit':
                    this.exitProgram(0, this.prompt);
                    break;
                case 'list':
                    this.listInstructions(cmdArr, this.prompt);
                    break;
                case 'cursor':
                    this.posOut(this.prompt);
                    break;
                case 'screen.moveTo':
                    this.setCursorPos(cmdArr, this.prompt);
                    break;
                case 'screen.cleardown':
                    this.clearDown(this.prompt);
                    break;
                default:
                    this.output(`"${cmd}" is not a valid command`);
            }
        } else if (this.mode === 1) {

        }

        this.prompt();
        const curPos = getCursorPosition.sync();
        this.cursor.x = curPos.row;
        this.cursor.y = curPos.col;
    }
}

const micro = new MicrocodeCLI();

micro.prompt();
