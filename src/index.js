// Project Requirements
const fs = require('fs');
// Basic Components
const CPU = require('./cpu');
const MEM = require('./memory');
const ROM = require('./memory');
// Component connections
const BUS = require('./bus');
const CONTROLLER = require('./controller');


//This is, essentially, the motherboard.

// The bus connects the different things so, create the bus.
// The bus is just a set of lines to either be written to or read from
// Every other compontent connected to it just needs to know the bus is there.
// Computers have at least 3 bus types, each which can have multiple copies:
// There is the Data Bus, which is what data is read from and written to, the 
// Address Bus, which is what is used to convey the address being written to 
// or the address of the action or location and the Control Bus, which is used 
// to tell what component should be listening and what instructions should be 
// accepted.
// const main_bus = new BUS();
// Data Bus
const data_bus = new BUS();
// Address bus
const address_bus = new BUS();
// Control Bus
const control_bus = new BUS();

// The Bios contains the basic input/output system that determins what to do and how to do it.
// It sits inbetween most system and processes except those which are privilaged.
const bios = new MEM(8, 256, {d: data_bus, a: address_bus, c: control_bus}, type: 'rom', {r: true, w: false});
// The System Memory is the main memory for the system.  It has the max size 
// alloted for an 8-bit machine.
const memory = new MEM(8, 256, {d: data_bus, a: address_bus, c: control_bus}, type: 'memory', {r: true, w: false})



