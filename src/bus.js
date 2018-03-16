/** CLASS BUS
 *  @argument busWidth = {default 8}
 *  *
 *  A communcation bus to pass data on. Resets every clock cycle.
 *
 */

 class BUS {
    construction(busWidth = 8) {
        // TBD if this is needed
        this.clock = null;
        // Bus width
        this._width = busWidth;
        // Current data on the line
        this.data  = null;
        // TBD does this bus need a state?  it's just wires, afterall.
        this._state = null;
    }

    READ() {
        return this.data;
    }

    WRITE(word) {
        if (this.data === null)
            return false;

        this.data = word;

        return true;
    }

    CLEAR() {

    }

    set STATE(state) {
        this._state = state;
    }

    get STATE() {
        return this._state;
    }
}

 module.exports = BUS;
