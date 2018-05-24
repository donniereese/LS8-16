const jumpers = [0,0,0,0,0,0,0,0];

const instructionSet = {
    index: {
        0b00000000 : 'HALT',
        0b00000001 : 'INIT',
        0b00000010 : 'SETR',
        0b01101111 : 'GETR',
        0b00000100 : 'SAVE',
        0b00000101 : 'MUL',
        0b00000110 : 'PRN',
        0b00000111 : 'LOAD',
        0b01000001 : 'PRA',
        0b11000000 : 'EXTDO',
        0b11000001 : 'EXTRT',
        0b00001000 : 'LD',
        0b00001001 : 'ST',
        0b00010010 : 'LDRI',
        0b00010011 : 'STRI',
        0b11110101 : 'STOR',
        0b11110111 : 'LODM',
        0b00001010 : 'PUSH',
        0b00001011 : 'POP',
        0b00001100 : 'ADD',
        0b00001101 : 'SUB',
        0b00001110 : 'DIV',
        0b00001111 : 'CALL',
        0b00010000 : 'RET',
        0b00010001 : 'JMP',
        0b00011110 : 'JTL',
        0b00010100 : 'JEQ',
        0b00010101 : 'JNE',
        0b00010110 : 'CMP',
        0b01100000 : 'LBL',
        0b00010111 : 'LBJMP',
        0b00011000 : 'LBSET',
        0b11011000 : 'ADR',
        0b11011001 : 'RAD',
        0b11011010 : 'WAD',
        0b11011011 : 'RADR',
        0b11000011 : 'CPYR',
        0b00100000 : 'SETI',
        0b00100001 : 'GETI',
        0b11101110 : 'RETI',
    },
    inst: {
        INIT: {
			name: 'INIT',
			inst: 0b00000001,
			args: []
		},
        SETR: {
			name: 'SETR',
			inst: 0b00000010,
			args: []
		},
        GETR: {
			name: 'GETR',
			inst: 0b01101111,
			args: []
		},
        SAVE: {
			name: 'SAVE',
			inst: 0b00000100,
			args: []
		},
        LOAD: {
			name: 'LOAD',
			inst: 0b00000111,
			args: []
		},
        MUL: {
			name: 'MUL',
			inst: 0b00000101,
			args: []
		},
        PRN: {
			name: 'PRN',
			inst: 0b00000110,
			args: []
		},
        HALT: {
			name: 'HALT',
			inst: 0b00000000,
			args: []
		},
        // Output Extension
        PRA: {
			name: 'PRA',
			inst: 0b01000001,
			args: []
		},
        // Universal Ext. Commands  //
        EXTDO: {
			name: 'EXTDO',
			inst: 0b11000000,
			args: []
		},
        EXTRT: {
			name: 'EXTRT',
			inst: 0b11000001,
			args: []
		},
        // Load and store extensions
        LD: {
			name: 'LD',
			inst: 0b00001000,
			args: []
		},
        ST: {
			name: 'ST',
			inst: 0b00001001,
			args: []
		},
        LDRI: {
			name: 'LDRI',
			inst: 0b00010010,
			args: []
		},
        STRI: {
			name: 'STRI',
			inst: 0b00010011,
			args: []
		},
        STOR: {
			name: 'STOR',
			inst: 0b11110101,
			args: []
		},
        LODM: {
			name: 'LODM',
			inst: 0b11110111,
			args: []
		},
        // Math Extension
        ADD: {
			name: 'ADD',
			inst: 0b00001100,
			args: []
		},
        SUB: {
			name: 'SUB',
			inst: 0b00001101,
			args: []
		},
        DIV: {
			name: 'DIV',
			inst: 0b00001110,
			args: []
		},
        // push / pop
        PUSH: {
			name: 'PUSH',
			inst: 0b00001010,
			args: []
		},
        POP: {
			name: 'POP',
			inst: 0b00001011,
			args: []
		},
        // call and return extensions
        CALL: {
			name: 'CALL',
			inst: 0b00001111,
			args: []
		},
        RET: {
			name: 'RET',
			inst: 0b00010000,
			args: []
		},
        // Logic Extension
        JMP: {
			name: 'JMP',
			inst: 0b00010001,
			args: []
		},
        JTL: {
			name: 'JTL',
			inst: 0b00011110,
			args: []
		},
        JEQ: {
			name: 'JEQ',
			inst: 0b00010100,
			args: []
		},
        JNE: {
			name: 'JNE',
			inst: 0b00010101,
			args: []
		},
        CMP: {
			name: 'CMP',
			inst: 0b00010110,
			args: []
		},
        // Logical Structuring extensions
        LBL: {
			name: 'LBL',
			inst: 0b01100000,
			args: []
		},
        LBJMP: {
			name: 'LBJMP',
			inst: 0b00010111,
			args: []
		},
        LBSET: {
			name: 'LBSET',
			inst: 0b00011000,
			args: []
		},
        // Memory Control
        ADR: {
			name: 'ADR',
			inst: 0b11011000,
			args: []
		},
        RAD: {
			name: 'RAD',
			inst: 0b11011001,
			args: []
		},
        WAD: {
			name: 'WAD',
			inst: 0b11011010,
			args: []
		},
        RADR: {
			name: 'RADR',
			inst: 0b11011011,
			args: []
		},
        // Memory Management
        CPYR: {
			name: 'CPYR',
			inst: 0b11000011,
			args: []
		},
        // Interupts
        SETI: {
			name: 'SETI',
			inst: 0b00100000,
			args: []
		},
        GETI: {
			name: 'GETI',
			inst: 0b00100001,
			args: []
		},
        RETI: {
			name: 'RETI',
			inst: 0b11101110,
			args: []
		},
    }
};

module.exports = { jumpers, instructionSet };
