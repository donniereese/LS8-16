const fs = require('fs')
const grammer = require('./grammar.js')

const ar = process.argv.slice(2)

if (ar.length != 1 && !grammer) {
	console.log('usage: program {filename}')
	process.exit(1)
}

const readFrom = (fn) => {
let contents = [];

	if (grammer) contents = grammer
	else contents = fs.readFileSync(fn, 'utf-8')

	return contents;
}

const makeList = (length = 256) => {
	const temp = [];
	for (let i = 0; i < length; i++) {
		temp[i] = i.toString(16).padStart(2, '0');
	}

	return temp;
}

const writeLines = (contents) => {
	const fullList = makeList()
	
	while(contents.length > 0) {
		const line = contents[0]
		const inst = line[0]
		const bytecode = line[1]
		const type = line[2]
		const byteDecimal = parseInt(bytecode, 16)
		const orig = fullList[byteDecimal]
		// Remove from array
		contents.shift();

		fullList[byteDecimal] = `\n${orig} - ${bytecode} - ${inst}    `
	}

	return fullList;
}

const l = writeLines(readFrom(ar[0]))

for (let i = 0; i < l.length; i++) process.stdout.write(l[i])