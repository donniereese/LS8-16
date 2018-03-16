const fs = require('fs');
const CPU = require('./cpu');
const KEYBOARD = require('./keyboard');
const MEMBUS = require('./membusController');
const MEMORY = require('./memory');
const BUS = require('./bus');
const CLOCK = require('./clock');
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
function loadMemory(contents) {
    const lines = contents.split('\n');
    let address = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // find comment
        const commentIndex = line.indexOf('#');
        if (commentIndex != -1) {
            line = line.substr(0, commentIndex);
        }

        line = line.trim();

        if (line === '') {
            continue;
        }
        const val = parseInt(line, 2); // convert from binary string to decimal

        cpu.poke(address++, val);
    }
}


// Data Write Bus
const wBus = new BUS(8);
// Date Read Bus
const rBus = new BUS(8);
// Instruction Bus
const insBus = new BUS(16);

// Rom, essentially the BIOS in terms
const rom = new MEMORY();
// mem, the system's program memory
const mem = new MEMORY();

const memoryBus = new MEMBUS([rom, mem], [wBus, rBus, insBus]);


// Main
const keyboard = new KEYBOARD();
const cpu = new CPU([(a,b) => {keyboard.hook(a,b)}], memoryBus);
const contents = readFrom(ar[0]);
loadMemory(contents);

cpu.startClock();
