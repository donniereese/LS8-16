const inst = {};

inst.INIT = { binary: 0b00000001, description: 'Initialize the system', action: null, scope: null };       // Initialize                   0x01
inst.INITALK = { binary: 0b11111110, description: 'Initialize the system in full debug', action: null, scope: null };    // Initialize with Debug mode
inst.SETR = { binary: 0b00000010, description: 'Set Register', action: null, scope: null };       // Set Register                 0x02
inst.GETR = { binary: 0b01101111, description: 'Get Register', action: null, scope: null };       // Get Register Value
inst.SAVE = { binary: 0b00000100, description: '', action: null, scope: null };       //
inst.LOAD = { binary: 0b00000111, description: '', action: null, scope: null };       //
inst.MUL = { binary: 0b00000101, description: '', action: null, scope: null };        //
inst.PRN = { binary: 0b00000110, description: 'Print to the buffer', action: null, scope: null };        //
inst.HALT = { binary: 0b00000000, description: 'Halt the system', action: null, scope: null };       //

// Output Extension
inst.PRAR = { binary: 0b01000001, description: '', action: null, scope: null };       //
inst.PRAM = { binary: 0b01000010, description: '', action: null, scope: null };       //

// Universal Ext. Commands    //
// inst.EXTDO = { binary: 0b11000000, description: '', action: null, scope: null };   // Issue {extension#} a {extension Command}
// inst.EXTRT = { binary: 0b11000001, description: '', action: null, scope: null };   // Get {extension#} to return

// Load and store extensions
inst.LD = { binary: 0b00001000, description: '', action: null, scope: null };         //
inst.ST = { binary: 0b00001001, description: '', action: null, scope: null };         //
inst.LDRI = { binary: 0b00010010, description: '', action: null, scope: null };       // LoaD Register Indirect
inst.STRI = { binary: 0b00010011, description: '', action: null, scope: null };       // STore Register Indirect
inst.STOR = { binary: 0b11110101, description: '', action: null, scope: null };       //
inst.LODM = { binary: 0b11110111, description: '', action: null, scope: null };       //

// Math Extension
inst.ADD = { binary: 0b00001100, description: '', action: null, scope: null };        // add two registers
inst.SUB = { binary: 0b00001101, description: '', action: null, scope: null };        // subtract two registers
inst.DIV = { binary: 0b00001110, description: '', action: null, scope: null };        // Divide two registers

// push / pop
inst.PUSH = { binary: 0b00001010, description: '', action: null, scope: null };       // Push onto stack
inst.POP = { binary: 0b00001011, description: '', action: null, scope: null };        // pop off stack

// call and return extensions
inst.CALL = { binary: 0b00001111, description: '', action: null, scope: null };       // Call subroutine
inst.RET = { binary: 0b00010000, description: '', action: null, scope: null };        // Return from Call
inst.PASS = { binary: 0b01011110, description: '', action: null, scope: null };       // Pass to a memory address without stack moving

// Logic Extension
inst.JMP = { binary: 0b00010001, description: '', action: null, scope: null };        // Jump to memory
inst.JTL = { binary: 0b00011110, description: '', action: null, scope: null };        // Jump to previous label
inst.JEQ = { binary: 0b00010100, description: '', action: null, scope: null };        // Jump if equal
inst.JNE = { binary: 0b00010101, description: '', action: null, scope: null };        // Jump if not equal
inst.JRNE = { binary: 0b10010101, description: '', action: null, scope: null };       // Jump to register if not equal
inst.JREQ = { binary: 0b10010111, description: '', action: null, scope: null };       // Jump to register if equal
inst.CMP = { binary: 0b00010110, description: '', action: null, scope: null };        // Compare

// Logical Structuring extensions
inst.LBL = { binary: 0b01100000, description: '', action: null, scope: null };        // Set a Label
inst.LBJMP = { binary: 0b00010111, description: '', action: null, scope: null };      // Jump to label
inst.LBSET = { binary: 0b00011000, description: '', action: null, scope: null };      // set jump label

// Memory Control
inst.ADR = { binary: 0b10111000, description: '', action: null, scope: null };   // (ADR)ess a memory block for read and write.
inst.RAD = { binary: 0b11011001, description: '', action: null, scope: null };   // Set (R)ead (AD)dress block
inst.WAD = { binary: 0b11011010, description: '', action: null, scope: null };   // Set (W)rite (AD)dress block
inst.RADR = { binary: 0b11011011, description: '', action: null, scope: null };   // (R)ead (ADR)ess for block

// Memory Management
inst.CPYR = { binary: 0b11000011, description: '', action: null, scope: null };   // Copy Recursive from range to another range

// Interupts
inst.SETI = { binary: 0b00100000, description: '', action: null, scope: null };   // Set Interrupt Address
inst.GETI = { binary: 0b00100001, description: '', action: null, scope: null };   // Get Interrupt Address
inst.RETI = { binary: 0b11101110, description: '', action: null, scope: null };   // (RET)urn from {I}nterupt
inst.INPT = { binary: 0b01111110, description: '', action: null, scope: null };   // Read extension Buffer
inst.OTPT = { binary: 0b01111111, description: '', action: null, scope: null };   // Place on extension buffer

// Display Extension
inst.SCORC = { binary: 0b11010000, description: '', action: null, scope: null };   // Set Character column and row (next two args) then character (3rd arg)
inst.SCORX = { binary: 0b11010001, description: '', action: null, scope: null };   // Set X coord for the character buffer writing
inst.SCORY = { binary: 0b11010010, description: '', action: null, scope: null };   // set the y coord for the character buffer writing
inst.SCHAR = { binary: 0b11010011, description: '', action: null, scope: null };   // Set the char to write at the coords targeted
inst.GECHR = { binary: 0b11010100, description: '', action: null, scope: null };   // Get character from set x and y
inst.GECX = { binary: 0b11010101, description: '', action: null, scope: null };   // Get Character cursor x
inst.GECY = { binary: 0b11010111, description: '', action: null, scope: null };   // Get character cursor y
inst.GECXY = { binary: 0b11011000, description: '', action: null, scope: null };   // Get Chatacter at x, y

module.exports = inst;
