const fs = require('fs');

// Lexer - Break input into tokens
function lexer(input) {
    const tokens = [];
    const lines = input.split('\n');

    const tokenPatterns = [
        { regex: /^def\s+([A-Za-z0-9_]+)::$/, type: 'DEF' },                     // Function definition
        { regex: /^([A-Za-z0-9_]+);$/, type: 'CALL' },                            // Function call
        { regex: /^([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+),\s*([\*@#A-Za-z0-9_]+);$/, type: 'INSTRUCTION' },  // Full instruction
        { regex: /^([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+),\s*([\*@#A-Za-z0-9_]+)$/, type: 'INSTRUCTION_PARTIAL' },  // Partial instruction
        { regex: /^\s*$/, type: 'EMPTY' }, // Skip empty lines
    ];

    lines.forEach((line, index) => {
        let matched = false;
        for (const pattern of tokenPatterns) {
            const match = line.trim().match(pattern.regex);
            if (match) {
                tokens.push({
                    type: pattern.type,
                    value: match.slice(1),
                    line: index + 1,
                });
                matched = true;
                break;
            }
        }
        if (!matched && line.trim()) {
            throw new Error(`Syntax error on line ${index + 1}: ${line}`);
        }
    });

    return tokens;
}

// Helper to determine operand type
function determineOperandType(operand) {
    if (operand.startsWith('R')) {
        return { type: 'REGISTER', value: operand };             // Register addressing
    } else if (operand.startsWith('@')) {
        return { type: 'ABSOLUTE_MEMORY', value: operand.slice(1) }; // Absolute memory addressing
    } else if (operand.startsWith('#')) {
        return { type: 'RELATIVE_MEMORY', value: operand.slice(1) }; // Relative memory addressing
    } else if (operand.startsWith('*')) {
        return { type: 'INDIRECT', value: operand.slice(1) };   // Indirect memory access
    } else {
        return { type: 'IMMEDIATE', value: operand };           // Immediate value
    }
}

// Parser - Convert tokens into an abstract syntax tree (AST)
function parser(tokens) {
    const ast = [];
    let currentFunction = null;

    tokens.forEach((token) => {
        if (token.type === 'DEF') {
            if (currentFunction) {
                ast.push(currentFunction);
            }
            currentFunction = { type: 'FUNCTION', name: token.value[0], body: [] };
        } else if (token.type === 'CALL') {
            if (currentFunction) {
                ast.push(currentFunction);
                currentFunction = null;
            }
            ast.push({ type: 'CALL', name: token.value[0] });
        } else if (token.type === 'INSTRUCTION' || token.type === 'INSTRUCTION_PARTIAL') {
            if (!currentFunction) {
                throw new Error(`Instruction outside of function at line ${token.line}`);
            }
            currentFunction.body.push({
                type: 'INSTRUCTION',
                name: token.value[0],
                register: determineOperandType(token.value[1]),
                operand: determineOperandType(token.value[2]),
            });
        }
    });

    if (currentFunction) {
        ast.push(currentFunction);
    }

    return ast;
}

// Driver function to parse the assembly-like code
function parseAssemblyCode(input) {
    const tokens = lexer(input);
    const ast = parser(tokens);
    return ast;
}

// Sample assembly-like input code
const inputCode = `
def KEYBOARD_INTERRUPT::

KEYBOARD_INTERRUPT;

def MAIN::
  SETR R1,*KEYBOARD_INTERRUPT;
  SETA R2,@1000;
  SETR R3,#REL_ADDR;
  
MAIN;

def INIT::
  PROGV R0,8;
  SETI R1,38;
  SETIB R2,
  JMP *MAIN;
INIT;
`;

// Run parser
try {
    const ast = parseAssemblyCode(inputCode);
    console.log(JSON.stringify(ast, null, 2));
} catch (err) {
    console.error('Error:', err.message);
}
