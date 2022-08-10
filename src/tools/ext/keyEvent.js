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

        this.letterNumber = /^[0-9a-zA-Z]+$/;
        this.lineControlArr = ['enter', 'return', 'backspace', 'tab'];
    }

    get rule() {
        let str = '';
        if (this.ctrl) str += 'ctrl+';
        if (this.meta) str += 'meta+';
        if (this.shift) str += 'shift+';

        str += this.name;
        
        return str;
    }

	modifierPressed() {
		return this.ctrl || this.meta;
	}

    isAlphaNumber() {
    	if(this.modifierPressed()) return false;
		if(this.code.length !== 1) return false;
    	if(!!this.code.match(this.letterNumber)) return true;
    	return false;
    }

    isLineControl() {
    	if (this.modifierPressed()) return false;
    	if (this.lineControlArr.includes(this.rule)) return true;
    	return false;
    }
}

module.exports = KeyEvent;