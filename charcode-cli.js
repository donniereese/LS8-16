#!/usr/bin/env node
const readline = require('node:readline');
const { nanoid } = require('./lib/nanoid');
readline.emitKeypressEvents(process.stdin);

const cur = {
	pos						: (C=0,L=0) => '\u001b[' + L + ';' + C + 'H',
	up						: (n = 1) 	=> '\u001b[' + n + 'A',
	down					: (N = 1) 	=> '\u001b[' + N + 'B',
	forward				: (N = 1) 	=> '\u001b[' + N + 'C',
	backward			: (N = 1) 	=> '\u001b[' + N + 'D',
	clear					: () 				=> '\u001b[2J',
	clearForward	: () 				=> '\u001b[K',
	savePos				: () 				=> '\u001b[s',
	restorePos		: () 				=> '\u001b[u',
}

const term = {
	write		: (...strs) => strs.forEach((str) => process.stdout.write(str)),
	width		: process.stdout.columns || 36,
	height	: process.stdout.rows || 24,
	pos			:	(C=0,L=0) => process.stdout.write(cur.pos(C,L)),
	clearAll: () => process.stdout.write(cur.clear()),
}

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

const EDITMODE = {
	edit: 'edit_mode',
	entry: 'entry_mode',
	command: 'command_mode',
}


const state = {};
let   currentMode = EDITMODE.command;
let   _notice = '';
let 	_buffer = '';
let   _message;
let		history = [];
const nodebooks = {};
const currentNodebook = -1;
let 	editMode = EDITMODE.entry;


const createNodebook = (name) => {
	
}

const selectNodebook = (name) => {
	if (!name) return;
}

const trackState = function() {
	if
}

const notice = (text) => {
	if (!text) return _text;

	_notice = text.toString();
}

const buffer = (text) => {
	if (!text) return _buffer;

	_buffer = text.toString();
}


const input = (chunk, key) => {
	//term.write(chunk)

  if (key.ctrl) {
  	if (key && key.name == 'q')
  			process.exit();
  }

  if (key.name === 'return') {
  	buffer('');
  }

  console.log(key)
	
	buffer(buffer() + chunk);
	
}

const modeIcon = (m) => {
	let mode = ' ';
	switch (m) {
		case EDITMODE.edit:
			mode = '_';
			break;
		case EDITMODE.entry:
			mode = '|';
			break;
		case EDITMODE.command:
			mode = '>';
			break;
		default:
			mode = ' ';
	}

	return mode;
}

const initApp = () => {
	process.stdin.on('keypress', (chunk, key) => {
		input(chunk, key)
	});
}

const drawDivider = (direction = 'h') => {
	if (direction === 'h') {
		const h = ''.padStart(term.width, '–');
		term.write(h);
		return;	
	}
}

const drawEntry = () => {
	term.pos(0, term.height)
	term.write(`[${modeIcon(currentMode)}]: ${buffer()}`)
}

const drawApp = () => {
	term.pos()
	term.clearAll()
	term.pos(0, term.height - 1)
	drawDivider()
	drawEntry()
}

initApp();
drawApp();

// rl.prompt();

/*
rl.on('line', (line) => {
	const bits = line.trim().split(' ');
	const cmd = bits[0];
	const args = bits.slice(1, bits.length - 1);

	switch(cmd) {
		case ':':
			console.log('where')
		case 'exit':
		case 'quit':
			process.exit(0)
	}
})
*/