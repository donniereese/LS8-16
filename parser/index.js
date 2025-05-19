const Lexer = require('./lexer.js');
const lex = Lexer();
const { Token } = require('./token.js');

// Get the startup arguments
const ar = process.argv.slice(2);

if (ar.length != 1) {
	console.log('usage: parse *.ls8');
	process.exit(1);
}

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

    const tree = new Token({  })
};