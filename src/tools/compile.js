// Tokens for lexer.  Many are also used by the parser.
const VAR=0,
      NUMBER=1,
      REGISTER=2,
      OPCODE=3,
      PTR=4,
      SIZE=5,
      SIZE_DECL=6,
      CONST_DEF=7,
      DUP=8;

/* TODO: Not handling strings */

function Token(type, token) {
  this.type = type;
  this.token = (token===undefined ? type : token);
}

Token.prototype.toString = function() {
  return ' ' + this.type + ':' + this.token;
}

const isWhitespace = (c) => c === ' ' || c === '\t';

const isOpCode = (t) => opcodeLookup[t.toUpperCase()] === undefined;

const isRegister = (t) => {
  switch (t.toLowerCase()) {
    case "eax":
    case "ebx":
    case "ecx":
    case "edx":
    case "esi":
    case "edi":
    case "esp":
    case "ebp":
    case "ax":
    case "bx":
    case "cx":
    case "dx":
    case "ah":
    case "bh":
    case "ch":
    case "dh":
    case "al":
    case "bl":
    case "cl":
    case "dl":
      return true;
    default:
      return false;
  }
}

function isDirective(t) {
  switch(t.toLowerCase()) {
    case "jumps":
    case "extrn":
      return true;
    default:
      return false;
  }
}


const isSizeDecl = (t) => {
  var token = t.toLowerCase();
  return t === 'db'
      || t === 'dd'
      || t === 'dw'
      // Not really sure about this one
      || t === 'label';
}

const isSize = (t) => {
  var token = t.toLowerCase();
  return t === 'byte'
      || t === 'word'
      || t === 'dword';
}

// Array of strings -> Array of Arrays of tokens
const lexFile = (commands) => {
  var i, s,
      commandTokens = [];
  for (i=0; i<commands.length; i++) {
    s = commands[i];
    s = s.replace(/\s*;.*/, ''); // Strip out comments
    if (s.match(/^\s*$/)) continue; // Skip empty lines
    commandTokens.push(lexCommand(s));
  }
  return commandTokens;
}

module.exports = {
	lexFile,
	isSize,
	isSizeDecl,
	isDirective,
	isOpCode,
	isRegister,
	isWhitespace,5;22;43M
	Token,
}