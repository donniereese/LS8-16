const fs = require('fs');
// CPU Device Module "chip"
const CPU = require('./cpu');
// Keyboard IO "peripheral"
const KEYBOARD = require('./keyboard');
// Display Devices
const DISPLAY = require('./devices/screen');
// Memory Controller Module "chip"
const MEMBUS = require('./membusController');
// Memory Module chip "board"
const MEMORY = require('./memory');
// Data Bus Module
const BUS = require('./bus');
// Clock Timer Module
const CLOCK = require('./clock');

// Get the startup arguments
const ar = process.argv.slice(2);


const pc = null;

if (ar.length != 1) {
    console.log('usage: ls8 infile');
    process.exit(1);
}

// Read file
const readFrom = (fn) => {
    const contents = fs.readFileSync(fn, 'utf-8');
    // TODO: Error check!
    return contents;
}

// load file into CPU memory
const loadMemory = (contents) => {
    const isBinary = (char) => char.replace(/[0-1]/, '').length === 0;
    const isHex = (char) => char.replace(/0-9a-fA-F/, '').length === 0;
    const isCommentChar = (char) => char.replace(/#/, '').length === 0;
    const isNewline = (char) => char.replace(/(\n)|(\n\n)|(\n\r)/, '').length === 0;
    const isRelativeChar = (char) => char.replace(/%/, '').length === 0;
    const isReferanceChar = (char) => char.replace(/@/, '').length === 0;
    const isRegisterChar = (char) => char.replace(/r/, '').length === 0;
    const isRefRefChar = (char) => char.replace(/\*/, '').length === 0;
    const isCommandChar = (char) => char.replace(/\//, '').length === 0;
    const isCommandEndChar = (char) => char.replace(/;/, '').length === 0;
    const isWhitespace = (char) => char.replace(/\n|\s/, '').length === 0;

    const dataFormats = {
        h2: { name: 'Hexadecimal8', length: 2, base: 16, bytes: 256 },
        h4: { name: 'Hexadecimal16', length: 4, base: 16, bytes: 65536 },
        b8: { name: 'Binary8', length: 8, base: 2, bytes: 256 },
        b16: { name: 'Binary16', length: 16, base: 2, bytes: 65536 }
    };
    let dataType = 'b8';
    let dataLength = dataFormats[dataType].length;
    let dataBase = dataFormats[dataType].base;

    const instructions = [''];
    const registers = [0, 0, 0, 0, 0, 0, 0, 0];
    const relativeAddr = []
    const referenceAddr = []
    const curRelAddr = -1;

    let instPointer = 0;
    let instLen = 0;
    let lastChar = null;
    let curChar = null;
    let isComment = false;
    let isRelAddress = false;
    let isRefAddress = false;
    let isRelRef = false;
    let isRefRef = false;
    let isCommand = true;
    let commandFlags = {
        setDataType: false,
        setDataWidth: false
    };
    let commandBuffer = '';
    let valueBuffer = '';
    let commandOp = false;

    const resetCommands = () => {
        isCommand = false;
        isComment = false;
        isRefRef = false;
        isRelRef = false;
        isRelAddress = false;
        isRefAddress = false;
        commandBuffer = '';
        valueBuffer = '';
        commandFlags.setDataType = false;
        commandFlags.setDataWidth = false;
    }

    const isFirstChar = () => (!isComment && !isCommand && !isRelAddress && instLen === 0);

    while (contents.length > 0) {
        // Get the next char
        const next = contents[0];
        // shift it off;
        contents = contents.slice(1);
        lastChar = curChar;
        curChar = next;
        // If we're in a comment block
        if (isComment) {
            if (isCommandChar(curChar) && isCommentChar(lastChar)) {
                isCommand = true;
                continue;
            }
            if (isNewline(curChar)) {
                resetCommands();
                continue;
            }
            if (isCommand) {
                if (!commandOp) {
                    // No operator has been found yet
                    if (curChar === ':') {
                        commandOp = true;
                        continue;
                    } else {
                        // it's a character
                        commandBuffer = commandBuffer + curChar;
                    }
                } else {
                    // commandOp flag is true and it's the value Buffer
                    if (isCommandEndChar(curChar)) {
                        // run the command stuff
                        switch (commandBuffer) {
                            case 'dT':
                                dataType = valueBuffer;
                                dataLength = dataFormats[dataType].length;
                                dataBase = dataFormats[dataType].base;
                                break;
                            case 'dB':
                                dataBase = parseInt(valueBuffer);
                                break;
                            case 'dW':
                                dataLength = parseInt(valueBuffer);
                                break;
                            default:
                                console.log(`PARSE ERROR: COMMAND "#/${commandBuffer}:${valueBuffer};" does not parser correctly.  You may have a syntax error`);
                        }
                        isCommand = false;
                        resetCommands();
                    } else {
                        // it's just another char
                        valueBuffer = valueBuffer + curChar;
                    }

                }
            }
            continue;
        }

        // Alright, at this point we are to processing actual input?
        // check if the pointer needs to be moved up
        if (instLen >= dataLength) {
        		const parsedHex = parseInt(instructions[instPointer], dataBase)
						let tempInst = parsedHex;
            instructions[instPointer] = tempInst;
            instPointer++;
            instLen = 0;
        }
        // 1. is this a comment character?
        if (isCommentChar(curChar)) {
            isComment = true;
            continue;
        }

        // 2. is it a space or newline?
        if (isWhitespace(curChar)) continue;

        // 3. If we are looking at a register address
        if (isFirstChar() && isRelativeChar(curChar)) {
            isRelAddress = true;

            return true;
        }

        // append char to the current instruction
        instLen++;
        if (instructions.length < instPointer + 1) {
        	instructions[instPointer] = '';
        	instructions[instPointer] = `${instructions[instPointer]}${curChar}`;
        }
    }
    // console.log(instructions);
    return instructions;
}

const linkReferences = (inst = [], relativeAddr = [], referanceAddr = []) => {
	return inst;
}


// Data Write Bus
const wBus = new BUS(8);
// Date Read Bus
const rBus = new BUS(8);
// Instruction Bus
const insBus = new BUS(16);

// Rom, essentially the BIOS in terms
const rom = new MEMORY(8, 256, [wBus, rBus, insBus]);
// mem, the system's program memory
const mem = new MEMORY(8, 256, [wBus, rBus, insBus]);
// The memory bus controller
const memoryBus = new MEMBUS([rom, mem], [wBus, rBus, insBus]);


/*
 * Main Initialization
 */
const keyboard = new KEYBOARD();
const display = new DISPLAY();
const cpu = new CPU([
    (a, b) => { keyboard.hook(a, b) },
    (a, b) => { display.hook(a, b) },
], memoryBus);
const contents = readFrom(ar[0]);
const instructionsArray = linkReferences(loadMemory(contents));

instructionsArray.forEach((v, i) => { rom._bank[i] = v });

cpu.startClock();
