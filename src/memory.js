// Valid memory types list
const validTypes = [
    'memmory',
    'rom'
];

/**
 *
 *
 *
 *
 */
class MEMORY {
    constructor(
            width = 8,
            size = 256,
            buses = [],
            type = "memory",
            perm = {r: true, w: true}
        ) {
        // Correct Bus length?
        if (buses.length < 3)
            throw Error("Memory Error: Not enough bus connections");
        // Set banks size
        this._bank = new Array(size);
        // defaults
        this._bank.fill(0b00000000);
        // Is the memory writable
        this._write = type === 'memory' ? perm.w : false
        // Is the memory readable
        this._read = perm.r;
        // Type of memory [memory, rom, ...]
        this._type = validTypes.includes(type) ? type : 'memory';
    }

    /**
     *
     *
     */
    read(addr) {
        return this._bank[addr];
    }

    /**
     *
     *
     */
    write(addr, data) {
        this._bank[addr] = data;
    }

    /**
     *
     *
     */
    _flash(flashArr = []) {
        if (this._type === rom) {

        }
        return false;
    }
}

module.exports = MEMORY;
