const keycodes = {
    '[B' : 'down',
    '[A' : 'up',
    '[D' : 'left',
    '[C' : 'right',
};

class KeyEvent {
    constructor(str, key) {
        this.string = str;

        this.ctrl = key.ctrl;
        this.meta = key.meta;
        this.shift = key.shift;
        this.name = key.name;
        this.code = key.code ? keycodes[key.code] : this.string;
    }

    get rule() {
        let str = '';
        if (this.ctrl) str += 'ctrl+';
        if (this.meta) str += 'meta+';
        if (this.shift) str += 'shift+';

        str += this.name;
        
        return str;
    }
}

module.exports = KeyEvent;